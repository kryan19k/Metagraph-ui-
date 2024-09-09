import { NextRequest, NextResponse } from 'next/server';
import { mockDataStore } from '@/app/mockDataStore';

export function GET(
  _request: NextRequest,
  { params }: { params: { surveyid: string } }
) {
  console.log('GET /api/surveys/[surveyid] hit', params);
  
  const { surveyid } = params;

  if (!surveyid) {
    console.error('Invalid surveyid:', surveyid);
    return NextResponse.json({ error: 'Invalid survey ID' }, { status: 400 });
  }

  console.log('Attempting to fetch survey with ID:', surveyid);

  try {
    const survey = mockDataStore.getSurveyById(surveyid);
    console.log('Found survey:', survey);

    if (survey) {
      return NextResponse.json(survey);
    } else {
      console.log('Survey not found for ID:', surveyid);
      return NextResponse.json({ error: 'Survey not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching survey:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
  } catch (error) {
    console.error('Error creating survey:', error);
    return NextResponse.json({ error: 'Failed to create survey' }, { status: 500 });
  }
}