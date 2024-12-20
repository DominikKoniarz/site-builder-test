import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import usePageForm from "@/hooks/use-page-form";

export default function PageNameInput() {
    const { control } = usePageForm();

    return (
        <FormField
            control={control}
            name="name"
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
    );
}
