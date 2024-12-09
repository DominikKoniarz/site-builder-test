import type { TemplateEditSchema } from "@/schema/templates/template-edit-schema";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
    index: number;
};

export default function TemplateTextVariable({ index }: Props) {
    const { control } = useFormContext<TemplateEditSchema>();

    return (
        <div className="flex flex-row items-center gap-4 rounded-xl border p-4 pt-3">
            <FormField
                control={control}
                name={`variables.${index}.name`}
                render={({ field }) => (
                    <FormItem className="space-y-1">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name={`variables.${index}.tag`}
                render={({ field }) => (
                    <FormItem className="space-y-1">
                        <FormLabel>Tag</FormLabel>
                        <FormControl>
                            <Input placeholder="Tag" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
