import { levenshtein } from "@/lib/utils";
import Fuse, { type IFuseOptions } from "fuse.js";
import { useMemo } from "react";

function useFuse<T>(list: T[], searchTerm: string, fuseOptions?: IFuseOptions<T>) {
    const fuse = useMemo(() => {
        return new Fuse(list, fuseOptions);
    }, [list, fuseOptions])

    const results = useMemo(() => {
        if (!searchTerm) return list.slice(0, 5).map((item) => ({ item }));
        const result = fuse.search(searchTerm)
        if (result.length > 0) return result

        const scored = list.map((item) => ({
            item,
            distance: levenshtein(searchTerm, String(item))
        }))

        scored.sort((a, b) => a.distance - b.distance)

        return scored.slice(0, 3).map(({ item }) => ({ item }))
    }, [fuse, list, searchTerm])

    return { results: results.map(result => result.item), fuse: fuse };
}

export default useFuse;