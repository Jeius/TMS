"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "../ui/button"

const chartData = [
    { year: 2014, theses: 60 },
    { year: 2015, theses: 430 },
    { year: 2016, theses: 500 },
    { year: 2017, theses: 214 },
    { year: 2018, theses: 89 },
    { year: 2019, theses: 186 },
    { year: 2020, theses: 305 },
    { year: 2021, theses: 237 },
    { year: 2022, theses: 73 },
    { year: 2023, theses: 209 },
    { year: 2024, theses: 214 },
]

const chartConfig = {
    theses: {
        label: "Theses",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export function BarCard() {
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="flex flex-row justify-between items-center font-semibold text-xl">Theses</CardTitle>
                <div className="flex flex-row justify-between items-center">
                    <CardDescription>Year Approved: 2014 - 2024</CardDescription>

                </div>
            </CardHeader>
            <CardContent className="pb-0">
                <ChartContainer className="flex place-self-center" config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                        }}
                        className="overflow-auto overscroll-auto"
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="year"
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={true}
                            content={<ChartTooltipContent hideLabel className="bg-muted" />}
                        />
                        <Bar dataKey="theses" fill="var(--color-theses)" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-card-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <div className="flex gap-2 place-self-center p-2">
                <Button variant="ghost">Prev.</Button>
                <Button variant="ghost">Next</Button>
            </div>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Displayed in a 10 year timeframe
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing the total number of theses approved for each year
                </div>
            </CardFooter>
        </Card>
    )
}
