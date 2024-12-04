import { fetchSpecializations } from '@/server/actions';

export async function getSpecializations(pageNumber = 0, search?: string) {
  const res = await fetchSpecializations(pageNumber, search);
  return {
    ...res,
    items: res.data
      .filter((res) => res.deleted_at === null)
      .map(({ id, name }) => ({ id: Number(id), value: name })),
  };
}
