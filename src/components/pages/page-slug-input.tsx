import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import usePageForm from "@/hooks/use-page-form";

export default function PageSlugInput() {
    const { control } = usePageForm();

    return (
        <FormField
            control={control}
            name="slug"
            render={({ field }) => (
                <FormItem className="space-y-1">
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                        <Input placeholder="Slug" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
