/* eslint-disable @typescript-eslint/no-unsafe-call */
// In /app/api/surveys/[surveyId]/responses/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: { surveyid: string } }
) {
  const { surveyid } = params;
  const { respondent, encryptedAnswers, completionTime } = await req.json();

  try {
    const responseData: Prisma.ResponseUncheckedCreateInput = {
      surveyId: surveyid,
      respondent,
      encryptedAnswers,
      completionTime: completionTime ? parseInt(completionTime, 10) : null,
    };

    await prisma.response.create({
      data: responseData,
    });
    return NextResponse.json({ message: 'Response submitted successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error submitting survey response:', error);
    return NextResponse.json({ error: 'Failed to submit survey response' }, { status: 500 });
  }
}