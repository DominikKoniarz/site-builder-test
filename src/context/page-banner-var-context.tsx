"use client";

import type { BannerVariableDTO } from "@/dto/variables.dto";
import { createContext, useContext } from "react";

type PageBannerVarContextType = {
    index: number;
    dbVariable: BannerVariableDTO;
};

const pageBannerVarContextInitialValue: PageBannerVarContextType = {
    index: -1,
    dbVariable: {
        id: "",
        bannerVariableId: "",
        type: "BANNER",
        name: "",
        tag: "",
        order: 0,
        images: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        config: null,
    },
};

const PageVarContext = createContext<PageBannerVarContextType>(
    pageBannerVarContextInitialValue,
);

export function PageBannerVarContextProvider({
    children,
    index,
    dbVariable,
}: {
    children: React.ReactNode;
    index: number;
    dbVariable: BannerVariableDTO;
}) {
    return (
        <PageVarContext value={{ index, dbVariable }}>
            {children}
        </PageVarContext>
    );
}

export function usePageBannerVarContext() {
    return useContext(PageVarContext);
}
