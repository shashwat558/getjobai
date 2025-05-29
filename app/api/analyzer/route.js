import { NextRequest, NextResponse } from "next/server";
import {PDFLoader} from "@langchain/community/document_loaders/fs/pdf";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";

const genAi = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});



const getJobRoles = async (text) => {
    const Prompt = `
You will be given a text content of a resume and your job is to return the job role that best fits the user.

Respond in the following JSON format:
{
 "jobRoles": ""
}
 
text:
${text}

`
    const response = await genAi.models.generateContent({
        model: "gemini-1.5-flash",
        contents: Prompt
    })
    const result = response.text;
    const match = result?.match(/```json\s*([\s\S]*?)```/);
    const jsonString = match ? match[1].trim() : result?.trim();
    const sanitizedJsonString = jsonString?.replace(/[\x00-\x1F\x7F]/g, ''); // 
    const mainString = JSON.parse(sanitizedJsonString ?? "");
    console.log(mainString)
    
    const embeddings = await genAi.models.embedContent({
        model: "text-embedding-004",
        contents: mainString.jobRoles
    })
    const queryEmbedding = embeddings.embeddings[0].values;
    
    
    return queryEmbedding;


}

export async function POST(req){
    const reqData = await req.formData();
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY);

    const file = reqData.get("resume");
    if(!file){
        return NextResponse.json({message: "Resume is required"})
    }

    const loader = new PDFLoader(file);
    const docs = await loader.load();
   
    const mainContent = docs[0].pageContent;
    console.log(mainContent);

    const queryEmbedding = await getJobRoles(mainContent);
    console.log(aiResponse)

    const {data, error} = await supabase.rpc('match_jobs', {
        query_embedding: queryEmbedding,
        match_threshold: 0.75,
        match_count: 10
    })
    if(error){
        console.log(error)
    }

    console.log(data);







}