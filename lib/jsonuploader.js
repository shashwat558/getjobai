const { GoogleGenAI } = require("@google/genai");
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const readline = require("readline");
const dotenv = require("dotenv");

dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY
);

const genAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const fileStream = fs.createReadStream("public/jobs.jsonl");

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

const BATCH_SIZE = 10;
let batch = [];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function embedWithRetry(texts, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await genAi.models.embedContent({
        model: "gemini-embedding-001",
        contents: texts
      });
      return response.embeddings.map(e => e.values);
    } catch (error) {
      const isRateLimit = error.message?.includes("429") || error.message?.includes("RESOURCE_EXHAUSTED");
      const isBatchError = error.message?.includes("at most 100");
      
      if (isBatchError) {
        throw new Error("Batch size too large (> 100 items)");
      }
      
      if (isRateLimit && attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt + 1) * 10000;
        console.log(`Rate limited. Retrying in ${delay / 1000}s...`);
        await sleep(delay);
        continue;
      }
      throw error;
    }
  }
}

async function insertBatch(data) {
  if (data.length === 0) return;

  const validJobs = data.filter(
    job => job.job_title && job.job_title.trim() !== ""
  );

  if (validJobs.length === 0) return;

  const texts = validJobs.map(job => `
Job Title: ${job.job_title}
Description: ${job.description ?? ""}
`);

  try {
    const embeddings = await embedWithRetry(texts);
    const jobsWithEmbeddings = validJobs.map((job, i) => ({
      ...job,
      title_embedding: embeddings[i]
    }));

    const { error } = await supabase.from("jobs").insert(jobsWithEmbeddings);

    if (error) {
      console.error("Insert error:", error);
    } else {
      console.log(`Inserted ${jobsWithEmbeddings.length} jobs`);
    }
  } catch (err) {
    console.error("Batch embedding failed:", err.message);
  }
  
  await sleep(1000);
}

rl.on("line", async (line) => {
  if (line.trim() === "") return;

  try {
    const job = JSON.parse(line);
    batch.push(job);

    if (batch.length >= BATCH_SIZE) {
      await insertBatch(batch);
      batch = [];
    }
  } catch (err) {
    console.error("JSON parse error:", err.message);
  }
});

rl.on("close", async () => {
  await insertBatch(batch);
  console.log("Upload complete.");
});