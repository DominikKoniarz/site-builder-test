import Header from "./_components/header";

export default function CommonHeaderLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-full flex-col bg-slate-800 text-white">
            <Header />
            {children}
        </div>
    );
}
