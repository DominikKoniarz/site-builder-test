import type { PageVariableDTO } from "@/dto/variables.dto";

export default function PageBannerVariable({
    index,
    dbVariable,
}: {
    index: number;
    dbVariable: PageVariableDTO;
}) {
    return (
        <div className="flex flex-col gap-2 rounded-xl border bg-slate-800 p-4 pt-3">
            <label className="text-sm font-medium">{dbVariable.name}</label>
            <div className="flex h-10 cursor-pointer items-center justify-center rounded-lg border border-dashed p-2 text-xs font-medium">
                Drop your images here
            </div>
        </div>
    );
}
