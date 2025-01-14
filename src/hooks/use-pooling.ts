import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const usePooling = (interval: number) => {
    const router = useRouter();

    useEffect(() => {
        const intervalId = setInterval(() => {
            router.refresh();
        }, interval);

        return () => clearInterval(intervalId);
    }, [router, interval]);
};
