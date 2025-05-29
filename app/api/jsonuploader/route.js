import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";
import fs from 'fs/promises';

const genAI = new GoogleGenAI(
  process.env.GEMINI_API_KEY
);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY
);

export async function POST(req, res) {
  

  try {
    const fileBuffer = await fs.readFile("public/jobs.jsonl", "utf-8");
    const lines = fileBuffer.trim().split("\n");
    const BATCH_SIZE = 500;
    let batch = [];

    for (let i = 0; i < lines.length; i++) {
      const job = JSON.parse(lines[i]);
      batch.push(job);

      if (batch.length === BATCH_SIZE || i === lines.length - 1) {
        const titles = batch.map(j => j.job_title ?? "");
        const embeddings = await Promise.all(
          titles.map(async (title) => {
            const res = await genAI.models.embedContent({
              model: "text-embedding-004",
              contents: title,
            });
            return res.embeddings;
          })
        );

        const jobsWithEmbeddings = batch.map((job, idx) => ({
          ...job,
          title_embedding: embeddings[idx],
        }));

        const { error } = await supabase.from("jobs").insert(jobsWithEmbeddings);
        if (error) console.error("Insert error:", error);

        batch = []; // reset for next batch
      }
    }

    return res.status(200).json({ message: "Upload complete" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
