import { NextResponse } from 'next/server';
import { mockDataStore } from '@/app/mockDataStore';

export function GET(
  _request: Request,
  { params }: { params: { address: string } }
) {
  const { address } = params;
  const rewardBalance = mockDataStore.getUserRewards(address);
  return NextResponse.json({ rewardBalance });
}