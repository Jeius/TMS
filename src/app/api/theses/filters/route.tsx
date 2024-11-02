import { fetchMockFilters } from "@/mock/actions/fetch-filters";
import { NextResponse } from 'next/server';

export async function GET() {
    const filters = await fetchMockFilters();
    return NextResponse.json(filters);
}
