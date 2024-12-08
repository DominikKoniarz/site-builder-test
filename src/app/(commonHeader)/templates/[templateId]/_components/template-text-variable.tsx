import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { TemplateEditSchema } from "@/schema/template-edit-schema";
import { useFormContext } from "react-hook-form";

type Props = {
    index: number;
};

export default function TemplateTextVariable({ index }: Props) {
    const { control } = useFormContext<TemplateEditSchema>();

    return (
        <div className="flex flex-row items-center gap-4">
            <FormField
                control={control}
                name={`variables.${index}.name`}
                render={({ field }) => (
                    <FormItem>
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
                    <FormItem>
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
