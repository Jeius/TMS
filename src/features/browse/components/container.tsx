'use client'

import { useQuery } from '@tanstack/react-query';

export default function Container(props: React.HTMLAttributes<HTMLDivElement>) {
    const { data: width = 'auto' } = useQuery<string>({ queryKey: ['tableWidth'], queryFn: () => 'auto' });

    return (<div style={{ maxWidth: width }} {...props} />)
}
