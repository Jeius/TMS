"use client"

import { booleanToString, stringToBoolean } from "@/lib/utils";
import { fetchFilterValues } from "@/mock/actions/fetch-filters";
import { getFilters } from "@/server/actions/filters";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Combobox } from "./combobox";
import { Button } from "./ui/button";

type FiltersProps = {
    showInitial?: number
    hideShowMore?: boolean
    filters?: string[]
}

export default function Filters({
    filters,
    showInitial = 3,
    hideShowMore = false,
}: FiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showMoreFilters, setShowMoreFilters] = useState(stringToBoolean(searchParams.get("moreFilters")));
    const queryClient = useQueryClient()

    const { data: fetchedFilters = [] } = useQuery({
        queryKey: ["filters"],
        queryFn: (!filters && (() => getFilters())) || (() => filters),
        refetchOnMount: true
    });

    const filtersWithDefaults = (filters ?? fetchedFilters).map(filter => ({
        key: filter,
        value: searchParams.get(filter) ?? "",
    }));

    const initialFilters = filtersWithDefaults.slice(0, showInitial);
    const moreFilters = filtersWithDefaults.slice(showInitial);

    const updateSearchParams = (key: string, value: string) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        if (value) {
            currentParams.set(key, value);
        } else {
            currentParams.delete(key);
        }
        router.push(`?${currentParams.toString()}`);
    };

    const toggleMoreFilters = () => {
        setShowMoreFilters(prev => {
            updateSearchParams("moreFilters", booleanToString(!prev));
            return !prev;
        });
    };

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ["filters"] });
    }, []);

    return (
        <div className="flex gap-2 flex-wrap">
            {initialFilters.map(filter => (
                <motion.div layout key={filter.key} transition={{ type: "tween" }}>
                    <Combobox
                        className="flex"
                        placeholder={filter.key}
                        defaultValue={filter.value}
                        onValueChanged={(value) => updateSearchParams(filter.key, value)}
                        itemsFn={() => fetchFilterValues(filter.key)}
                    />
                </motion.div>
            ))}
            <AnimatePresence mode="popLayout">
                {showMoreFilters && moreFilters.map(filter => (
                    <motion.div key={filter.key}
                        layout
                        initial={{ x: -60, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -60, opacity: 0 }}
                        transition={{ type: "tween" }}
                    >
                        <Combobox
                            className="flex"
                            placeholder={filter.key}
                            defaultValue={filter.value}
                            onValueChanged={(value) => updateSearchParams(filter.key, value)}
                            itemsFn={() => fetchFilterValues(filter.key)}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
            {!hideShowMore && (
                <motion.div layout
                    initial={{ x: -60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "tween" }}
                >
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-secondary/85 hover:text-secondary hover:bg-transparent font-bold"
                        onClick={toggleMoreFilters}
                    >
                        {showMoreFilters ? "Less filters" : "More filters"}
                    </Button>
                </motion.div>
            )}
        </div>
    );
}