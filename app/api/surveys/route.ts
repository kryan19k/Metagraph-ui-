/* eslint-disable @typescript-eslint/no-unsafe-call */
//surveys/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const creator = searchParams.get('creator');

  try {
    if (creator) {
      const surveys = await prisma.survey.findMany({
        where: { creator: creator },
        include: { questions: true }
      });
      return NextResponse.json(surveys);
    } else {
      const surveys = await prisma.survey.findMany({
        include: { questions: true }
      });
      return NextResponse.json(surveys);
    }
  } catch (error) {
    console.error('Error fetching surveys:', error);
    return NextResponse.json({ error: 'Failed to fetch surveys' }, { status: 500 });
  }
}