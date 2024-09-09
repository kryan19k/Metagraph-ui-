//surveys/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { mockDataStore } from '@/app/mockDataStore';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const surveyData = await request.json();
    const newSurvey = mockDataStore.createSurvey(surveyData);
    console.log('Created new survey:', newSurvey);
    
    // Generate a dummy private key (in a real app, this would be more secure)
    const privateKey = uuidv4();

    return NextResponse.json({
      surveyId: newSurvey.id,
      privateKey: privateKey
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating survey:', error);
    return NextResponse.json({ error: 'Failed to create survey' }, { status: 500 });
  }
}