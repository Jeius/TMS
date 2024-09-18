import Table from '@/components/browse/table'
import { Card } from '@/components/ui/card'
import React from 'react'

export default function Browse() {
    return (
        <main className="grid grid-cols-5 grid-rows-4 p-5 gap-3">
            <Card className="row-span-1 col-span-5">d</Card>
            <Card className="row-span-4 col-span-1">s</Card>
            <Table className="row-span-4 col-span-4" />
        </main>
    )
}
