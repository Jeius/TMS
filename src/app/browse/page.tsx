import Table from './table'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ResizablePanel, ResizableHandle, AdaptiveResizablePanelGroup, ResizablePanelGroup } from '@/components/ui/resizable'
import Departments from './departments'
import MyLibrary from './library'

export default function Browse() {
    return (
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-3 p-5 m-auto max-w-none">
            <Card className="w-full lg:max-w-52 overflow-hidden">
                <CardContent className="p-0">
                    <AdaptiveResizablePanelGroup
                        direction="vertical"
                        changeDirectionAt='lg'
                        className="min-h-[200px] lg:min-h-[840px] w-full"
                    >
                        <ResizablePanel
                            defaultSize={200}
                            className="flex-grow min-w-56 lg:min-w-0 min-h-32"
                        >
                            <div className="px-4"><Departments /></div>
                        </ResizablePanel>

                        <ResizableHandle withHandle className="border-2" />

                        <ResizablePanel
                            defaultSize={200}
                            className="flex-grow min-w-56 lg:min-w-0 min-h-32"
                        >
                            <div className="px-4"><MyLibrary /></div>
                        </ResizablePanel>
                    </AdaptiveResizablePanelGroup>
                </CardContent>
            </Card >
            <Table className="w-full" />
        </div>
    )
}
