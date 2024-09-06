import { NextResponse } from 'next/server';
import { mockDataStore } from '@/app/mockDataStore';

export function GET(
  _request: Request,
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