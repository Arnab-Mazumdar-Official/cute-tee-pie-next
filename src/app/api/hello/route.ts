import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: "Dashboard API works!", data: [1, 2, 3] });
}
