const {createClient} = require("@supabase/supabase-js")
const fs = require("fs")


const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY);



const BATCH_SIZE=500;

async function uploadJsonFile (data) {
    for(let i=0; i < data.length; i += BATCH_SIZE){
        const batch = data.slice(i, i+ BATCH_SIZE);
        const {error} = await supabase.from("jobs").insert(batch);
        if (error) {
      console.error(`Error inserting batch ${i / BATCH_SIZE + 1}:`, error);
    } else {
      console.log(`Successfully inserted batch ${i / BATCH_SIZE + 1}`);
    }
    }


    

}

uploadJsonFile(jobs)