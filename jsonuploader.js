const {createClient} = require("@supabase/supabase-js")
const fs = require("fs")
const readline = require("readline");
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY)
const supabase = createClient( );

const fileStream = fs.createReadStream('public/jobs.jsonl');

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

const BATCH_SIZE = 500;
let batch = [];

async function insertBatch(data) {
  if (data.length === 0) return;

  const { error } = await supabase.from('jobs').insert(data);
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