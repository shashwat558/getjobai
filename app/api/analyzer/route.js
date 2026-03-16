import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";

const genAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const parseJsonBlock = (rawText, fallback = {}) => {
  const match = rawText?.match(/```json\s*([\s\S]*?)```/);
  const jsonText = match ? match[1].trim() : rawText?.trim();
  const sanitized = jsonText?.replace(/[\x00-\x1F\x7F]/g, "");

  try {
    return JSON.parse(sanitized ?? JSON.stringify(fallback));
  } catch {
    return fallback;
  }
};

const getResumeFeedback = async (text) => {
  const prompt = `
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
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return parseJsonBlock(response.text, { score: 0, tips: [] });
};

const getJobRoles = async (text) => {
  const prompt = `
You will analyze the following resume and extract structured job information.

Return a JSON response with:
1. "roles": Array of 1-3 most fitting job titles/roles (e.g., ["Frontend Engineer", "UI Developer"])
2. "skills": Array of 5-10 key technical and soft skills extracted from resume
3. "seniority": One of ["Junior", "Mid", "Senior", "Lead"] based on experience level

Respond in the following JSON format:
\`\`\`json
{
 "roles": ["Frontend Engineer", "UI Developer"],
 "skills": ["React", "TypeScript", "CSS", "Next.js", "Problem Solving"],
 "seniority": "Mid"
}
\`\`\`

Resume text:
${text}
`;

  const response = await genAi.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const parsedResponse = parseJsonBlock(response.text, { 
    roles: ["Software Engineer"], 
    skills: [], 
    seniority: "Mid" 
  });

  const embeddingContent = `
Roles: ${(parsedResponse.roles || []).join(", ")}
Skills: ${(parsedResponse.skills || []).join(", ")}
Seniority Level: ${parsedResponse.seniority || "Mid"}
`;

  const embeddingResponse = await genAi.models.embedContent({
    model: "gemini-embedding-001",
    contents: embeddingContent,
    config: { outputDimensionality: 768 },
  });

  return {
    embedding: embeddingResponse.embeddings[0].values,
    roles: parsedResponse.roles,
    skills: parsedResponse.skills,
    seniority: parsedResponse.seniority,
  };
};

export async function POST(req) {
  try {
    const reqData = await req.formData();
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY,
    );

    const file = reqData.get("resume");
    if (!file) {
      return NextResponse.json({ message: "Resume is required" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const pdfData = await pdfParse(buffer);
    const resumeText = pdfData.text ?? "";

    const { embedding, role, roles, skills, seniority } = await getJobRoles(resumeText);
    const feedback = await getResumeFeedback(resumeText);

    const { data, error } = await supabase.rpc("match_jobs", {
      query_embedding: embedding,
      match_threshold: 0.85,
      match_count: 10,
    });

    if (error) {
      console.error("match_jobs RPC failed:", error);
      return NextResponse.json({ message: "Failed to fetch job matches" }, { status: 500 });
    }

    return NextResponse.json({
      jobs: data,
      roles,
      skills,
      seniority,
      resumeScore: feedback.score,
      tips: feedback.tips,
    });
  } catch (error) {
    console.error("Analyzer route failed:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
