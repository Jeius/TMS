import { fetchMockColumnIds } from "@/mock/actions/fetch-thesis-data";
import { NextResponse } from 'next/server';

export async function GET() {
    const filters = await fetchMockColumnIds();
    return NextResponse.json(filters);
}
