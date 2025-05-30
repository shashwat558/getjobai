import { NextRequest, NextResponse } from "next/server";
import {PDFLoader} from "@langchain/community/document_loaders/fs/pdf";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";

const genAi = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

const getResumeFeedback = async (text) => {
    const Prompt = `
You are a professional resume reviewer. Analyze the following resume text and return a JSON response containing:
1. A resume score between 0 to 100 based on clarity, formatting, relevant experience, and impact.
2. Three actionable tips to improve the resume.

Respond in the following JSON format:
\`\`\`json
{
  "score": 85,
  "tips": [
    "Use more action verbs to describe accomplishments.",
    "Quantify your impact with metrics like revenue or growth.",
    "Tailor the resume to specific job roles."
  ]
}
\`\`\`

text:
${text}
`;

    const response = await genAi.models.generateContent({
        model: "gemini-1.5-flash",
        contents: Prompt
    });

    const result = response.text;
    const match = result?.match(/```json\s*([\s\S]*?)```/);
    const jsonString = match ? match[1].trim() : result?.trim();
    const sanitizedJsonString = jsonString?.replace(/[\x00-\x1F\x7F]/g, '');
    const feedback = JSON.parse(sanitizedJsonString ?? "{}");

    return feedback;
};


const getJobRoles = async (text) => {
    const Prompt = `
You will be given a text content of a resume and your job is to return the job role that best fits the user and only give one role.

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
    
    
    return {embedding:queryEmbedding, role:mainString.jobRoles};


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

    const {embedding, role} = await getJobRoles(mainContent);
    console.log(embedding, role)
    const feedback = await getResumeFeedback(mainContent);
    console.log(feedback)

    const {data, error} = await supabase.rpc('match_jobs', {
        query_embedding: embedding,
        match_threshold: 0.75,
        match_count: 10
    })
    if(error){
        console.log(error)
    }

    return NextResponse.json({jobs: data, roles:role,resumeScore: feedback.score,
    tips: feedback.tips })



   







}