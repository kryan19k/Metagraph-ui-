//surveys/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { mockDataStore } from '@/app/mockDataStore';

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const creator = searchParams.get('creator');

  if (creator) {
    const surveys = mockDataStore.getSurveysByCreator(creator);
    console.log(`Fetched surveys for creator ${creator}:`, surveys);
    return NextResponse.json(surveys);
  } else {
    const surveys = mockDataStore.getAllSurveys();
    console.log('Fetched all surveys:', surveys);
    return NextResponse.json(surveys);
  }
}

export async function POST(request: NextRequest) {
  try {
    const surveyData = await request.json();
    const newSurvey = mockDataStore.createSurvey(surveyData);
    console.log('Created new survey:', newSurvey);
    return NextResponse.json({
      surveyId: newSurvey.id,
      privateKey: 'dummy-private-key' // In a real app, generate this securely
    }, { status: 201 });
  }
  catch (error) {
    console.error('Error creating survey:', error);
    return NextResponse.json({ error: 'Failed to create survey' }, { status: 500 });
  }
}