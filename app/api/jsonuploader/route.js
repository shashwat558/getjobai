import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import { NextResponse } from "next/server";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY,
);

export async function POST() {
  try {
    const fileBuffer = await fs.readFile("public/jobs.jsonl", "utf-8");
    const lines = fileBuffer.trim().split("\n");
    const batchSize = 500;
    let batch = [];

    for (let i = 0; i < lines.length; i++) {
      const job = JSON.parse(lines[i]);
      batch.push(job);

      if (batch.length === batchSize || i === lines.length - 1) {
        const text = batch.map((item) => `Job_title: ${item.title}, Job_description: ${item.description}` ?? "");
        const embeddings = await Promise.all(
          text.map(async (text) => {
            const response = await genAI.models.embedContent({
              model: "gemini-embedding-001",
              contents: text,
              config: { outputDimensionality: 768 },
            });
            return response.embeddings[0].values;
          }),
        );

        const jobsWithEmbeddings = batch.map((item, index) => ({
          ...item,
          job_embedding: embeddings[index],
        }));

        const { error } = await supabase.from("better_jobs").insert(jobsWithEmbeddings);
        if (error) {
          console.error("Insert error:", error);
        }

        batch = [];
      }
    }

    return NextResponse.json({ message: "Upload complete" });
  } catch (err) {
    console.error("JSON uploader route failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
