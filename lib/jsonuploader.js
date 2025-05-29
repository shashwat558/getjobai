const { GoogleGenAI } = require("@google/genai");
const {createClient} = require("@supabase/supabase-js")
const fs = require("fs")
const readline = require("readline");


console.log(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY)
const supabase = createClient( "https://cthkbabjadxiizomyiyj.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0aGtiYWJqYWR4aWl6b215aXlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzAzODg2NSwiZXhwIjoyMDYyNjE0ODY1fQ.7ZY9gB46-hRuCR1FHLTviwOeNO4VlvMWTL_TNJIvP5k");

const genAi = new GoogleGenAI('AIzaSyDrcoIEAot68qbWmaK5g6IWx8FAd7YoAQc');


const fileStream = fs.createReadStream('../public/jobs.jsonl');

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

const BATCH_SIZE = 500;
let batch = [];

async function insertBatch(data) {
  if (data.length === 0) return;

  const titles = data.map(job => job.job_title ?? "");
  const embeddingResponse = await Promise.all(
    titles.map(async title => {
      const embedding = await genAi.models.embedContent({
        model: 'text-embedding-004',
        contents: title,
        
      })
      return embedding.embeddings;
    })
  )

  const jobsWithEmbeddings = data.map((job, i) => ({
    ...job,
    title_embedding: embeddingResponse[i]
  }))

  const { error } = await supabase.from('jobs').insert(jobsWithEmbeddings);
  if (error) {
    console.error("Insert error:", error);
  } else {
    console.log(`Inserted ${data.length} jobs`);
  }
}

rl.on('line', async (line) => {
  if (line.trim() === "") return;
  try {
    const job = JSON.parse(line);
    batch.push(job);
    if (batch.length >= BATCH_SIZE) {
      await insertBatch(batch);
      batch = [];
    }
  } catch (err) {
    console.error("JSON parse error:", err.message, "\nLine:", line);
  }
});

rl.on('close', async () => {
  await insertBatch(batch);
  console.log("Upload complete.");
});