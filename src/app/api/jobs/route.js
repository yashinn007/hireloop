import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const mongoUri = process.env.MONGO_DB_URI;
let mongoClient;

async function getJobsCollection() {
  if (!mongoUri) {
    throw new Error("MONGO_DB_URI is not configured.");
  }

  if (!mongoClient) {
    mongoClient = new MongoClient(mongoUri);
  }

  await mongoClient.connect();
  return mongoClient.db("hireloop").collection("jobs");
}

export async function POST(request) {
  try {
    const job = await request.json();
    const jobs = await getJobsCollection();
    const result = await jobs.insertOne({
      ...job,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      { insertedId: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create job:", error);
    return NextResponse.json(
      { error: "Failed to save the job to the database." },
      { status: 500 }
    );
  }
}
