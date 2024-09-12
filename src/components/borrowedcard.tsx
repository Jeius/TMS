"use client"

import { BookUp2Icon } from "lucide-react"
import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

export const description = "A radial chart with a custom shape"

const chartData = [
    { total: 562, borrowed: 320, fill: "var(--color-borrowed)" },
]

const chartConfig = {
    borrowed: {
        label: "Borrowed",
        color: "hsl(var(--chart-5))",
    },
    total: {
        label: "Total Theses",
    },
} satisfies ChartConfig

export function BorrowedCard() {
    const endAngle = chartData[0].borrowed / chartData[0].total * 360
    return (
        <Card className="flex flex-col min-w-[200px]">
            <CardHeader className="pb-0">
                <CardTitle className="flex flex-row justify-between items-center font-semibold text-xl">
                    Borrowed  <BookUp2Icon />
                </CardTitle>

            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadialBarChart
                        data={chartData}
                        endAngle={endAngle}
                        innerRadius={80}
                        outerRadius={140}
                    >
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="none"
                            className="first:fill-muted last:fill-card"
                            polarRadius={[86, 74]}
                        />
                        <RadialBar dataKey="borrowed" background />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-black dark:fill-white text-4xl font-bold"
                                                >
                                                    {chartData[0].borrowed.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Borrowed
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex justify-center items-center text-sm font-medium text-muted-foreground">
                Total number of theses borrowed
            </CardFooter>
        </Card>
    )
}
