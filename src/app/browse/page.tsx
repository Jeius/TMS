import Table from '@/components/browse/table'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import React from 'react'

export default function Browse() {
    return (
        <main className="grid grid-rows-6 grid-cols-1 lg:grid-cols-5 lg:grid-rows-4 p-5 gap-3">
            <Card className="lg:row-span-4 lg:col-span-1">s</Card>
            <Table className="row-span-4 lg:row-span-4 lg:col-span-4" />
        </main>
    )
}
