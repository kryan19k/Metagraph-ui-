import { NextResponse } from 'next/server';
import { mockDataStore } from '@/app/mockDataStore';

export function GET() {
  console.log('GET /api/surveys hit');
  const surveys = mockDataStore.getAllSurveys();
  console.log('Surveys fetched from mockDataStore:', JSON.stringify(surveys, null, 2));
  return NextResponse.json(surveys);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newSurvey = mockDataStore.createSurvey(body);
  return NextResponse.json(newSurvey, { status: 201 });
}