/* eslint-disable @typescript-eslint/no-unsafe-call */
//surveyid/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { surveyid: string } }
) {
  const { surveyid } = params;

  if (!surveyid) {
    return NextResponse.json({ error: 'Invalid survey ID' }, { status: 400 });
  }

  try {
    const survey = await prisma.survey.findUnique({
      where: { id: surveyid },
      include: {
        questions: true,
        responses: true,
      },
    });

    if (survey) {
      return NextResponse.json(survey);
    } else {
      return NextResponse.json({ error: 'Survey not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching survey:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}