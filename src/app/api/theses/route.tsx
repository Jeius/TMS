import { fetchMockTheses } from "@/mock/actions/fetch-thesis-data";
import { NextResponse } from 'next/server';

export async function GET() {
    const theses = await fetchMockTheses();
    return NextResponse.json(theses);
}
