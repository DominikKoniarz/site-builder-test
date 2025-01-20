type AppPageRoute = {
    href: string;
    text: string;
};

export const appRoutes: AppPageRoute[] = [
    {
        href: "/",
        text: "Home",
    },
    {
        href: "/pages",
        text: "Pages",
    },
    {
        href: "/pages/new",
        text: "New Page",
    },
    {
        href: "/templates",
        text: "Templates",
    },
    {
        href: "/templates/new",
        text: "New Template",
    },
];
