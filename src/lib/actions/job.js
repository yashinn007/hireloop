"use server";

export const createJob = async (newJobData) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const res = await fetch(`${baseUrl}/api/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJobData),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || "Job could not be saved." };
    }

    return data;
  } catch {
    return { error: "Could not connect to the job API." };
  }
};
