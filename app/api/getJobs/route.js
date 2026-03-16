import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY,
  );

  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("job_title, company_name, apply_link")
      .ilike("job_title", `%${query}%`);

    if (error) {
      console.error("Failed to fetch jobs:", error);
      return NextResponse.json({ message: "Failed to fetch jobs" }, { status: 500 });
    }

    return NextResponse.json({ jobs: data ?? [] });
  } catch (error) {
    console.error("Unexpected getJobs route error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}