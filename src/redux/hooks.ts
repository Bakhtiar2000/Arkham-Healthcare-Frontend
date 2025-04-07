import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useEffect, useState } from "react";
type debouncedProps = {
    searchQuery: string;
    delay: number
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// custom hook used to call api after sometime of the request. works fine inside a onChange function
export const useDebounced = ({ searchQuery, delay }: debouncedProps) => {
    const [debouncedValue, setDebouncedValue] = useState<string>(searchQuery)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchQuery)
        }, delay);
        return () => {
            clearTimeout(handler)
        }
    }, [searchQuery, delay])
    return debouncedValue
}