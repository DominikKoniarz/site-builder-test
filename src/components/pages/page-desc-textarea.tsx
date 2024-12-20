import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import usePageForm from "@/hooks/use-page-form";

export default function PageDescTextarea() {
    const { control } = usePageForm();

    return (
        <FormField
            control={control}
            name="description"
            render={({ field }) => (
                <FormItem className="space-y-1">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder="Describe page"
                            className="resize-y"
                            {...field}
                            value={field.value ?? ""}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
