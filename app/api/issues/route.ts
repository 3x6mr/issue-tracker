import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { insertIssueSchema } from "../../FormSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = insertIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const NewIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(NewIssue, { status: 201 });
}
