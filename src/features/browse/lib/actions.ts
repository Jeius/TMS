'use server'

export async function fetchColumnIds() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/theses/columns`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
}

export async function fetchTheses() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/theses`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
}

export async function fetchFilters() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/theses/filters`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
}