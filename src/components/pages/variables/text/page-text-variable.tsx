import type { PageVariableDTO } from "@/dto/variables.dto";
import usePageForm from "@/hooks/use-page-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function PageTextVariable({
    index,
    dbVariable,
}: {
    index: number;
    dbVariable: PageVariableDTO;
}) {
    const { control } = usePageForm();

    return (
        <div className="flex flex-row gap-4 rounded-xl border bg-slate-800 p-4 pt-3">
            <FormField
                control={control}
                name={`variables.${index}.value`}
                render={({ field }) => (
                    <FormItem className="w-56 space-y-1">
                        <FormLabel>{dbVariable.name}</FormLabel>
                        <FormControl>
                            <Input
                                placeholder={dbVariable.name}
                                {...field}
                                value={field.value ?? ""}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
