'use server'

export async function getFilters() {
    return [
        'college',
        'department',
        'year',
        'specialization',
        'author',
        'adviser',
        'panelist',
    ];
};