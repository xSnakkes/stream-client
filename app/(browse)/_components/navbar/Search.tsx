"use client";
import qs from "query-string";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SearchIcon, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Search = () => {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!search) return;
        const query = qs.stringifyUrl(
            {
                url: "/search",
                query: { term: search },
            },
            { skipEmptyString: true }
        );

        router.push(query);
    };

    const handleClear = () => {
        setSearch("");
    }

    return (
        <form
            className="relative w-full lg:w-[400px] flex 
        items-center ml-4 lg:ml-0"
            onSubmit={handleSubmit}
        >
            <Input
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-r-none focus-visible:ring-0
                focus-visible:ring-transparent 
                focus-visible:ring-offset-0"
            />
            {search && (
                <X
                    className="absolute right-14 top-2.5 cursor-pointer
                    h-5 w-5
                    text-muted-foreground hover:text-white transition"
                    onClick={handleClear} 
                />
            )}
            <Button
                type="submit"
                size="sm"
                variant="secondary"
                className="absolute right-0"
            >
                <SearchIcon className="h-5 w-5 text-muted-foreground" />
            </Button>
        </form>
    );
};
