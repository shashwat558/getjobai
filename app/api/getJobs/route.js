import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(req) {
   const {searchParams} = new URL(req.url);
   const query = searchParams.get("query");
   if(!query || query.length < 2){

    return NextResponse.json([]);
   } 

   const supabase = await createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY);

   try {
    const {data, error} = await supabase.from("jobs").select("job_title, company_name, apply_link").ilike("job_title", `%${query}%`);
    if(error){
        throw new Error(error)
    }
    return NextResponse.json({jobs: data})
   } catch (error) {
     console.log(error)
    
   }
}