"use client"

import { Button } from "../../components/ui/button"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    XAxis,
    YAxis
} from "recharts"
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

export function ThesesChartCard() {
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="flex flex-row justify-between items-center font-semibold text-xl">
                    Theses
                </CardTitle>
                <div className="flex flex-row justify-between items-center">
                    <CardDescription>Year Approved: 2014 - 2024</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="pb-0">
                <MyLineChart />
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

function MyLineChart() {
    return (
        <ChartContainer className="flex place-self-center" config={chartConfig}>
            <AreaChart
                accessibilityLayer
                data={chartData}
            >
                <CartesianGrid vertical={false} />
                <YAxis
                    dataKey="theses"
                    axisLine={false}
                    orientation="right"
                    width={40} />
                <XAxis
                    dataKey="year"
                    axisLine={false}
                    tickMargin={8}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent className="bg-muted" indicator="dot" hideLabel />}
                />
                <Area
                    dataKey="theses"
                    type="linear"
                    fill="var(--color-theses)"
                    fillOpacity={0.4}
                    stroke="var(--color-theses)"
                />
            </AreaChart>
        </ChartContainer>

    )
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
function MyBarChart() {
    return (
        <ChartContainer className="flex place-self-center" config={chartConfig}>
            <BarChart
                accessibilityLayer
                data={chartData}
                margin={{ top: 20 }}
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
                    content={<ChartTooltipContent
                        hideLabel
                        className="bg-muted" />}
                />
                <Bar
                    dataKey="theses"
                    fill="var(--color-theses)"
                    radius={8}>
                    <LabelList
                        className="fill-card-foreground"
                        position="top"
                        offset={12}
                        fontSize={12}
                    />
                </Bar>
            </BarChart>
        </ChartContainer>

    )
}
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */

