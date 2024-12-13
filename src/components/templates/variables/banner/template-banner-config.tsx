import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useTemplateForm from "@/hooks/useTemplateForm";
import { textToNumVal } from "@/lib/utils";

export default function TemplateBannerConfig({ index }: { index: number }) {
    const { control } = useTemplateForm();

    return (
        <>
            <FormField
                control={control}
                name={`variables.${index}.imageWidth`}
                render={({ field }) => (
                    <FormItem className="w-56 space-y-1">
                        <FormLabel>Image width</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Image width"
                                {...field}
                                value={field.value ?? 0}
                                onChange={(e) =>
                                    field.onChange(textToNumVal(e))
                                }
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name={`variables.${index}.imageHeight`}
                render={({ field }) => (
                    <FormItem className="w-56 space-y-1">
                        <FormLabel>Image height</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Image height"
                                {...field}
                                value={field.value ?? 0}
                                onChange={(e) =>
                                    field.onChange(textToNumVal(e))
                                }
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
}
