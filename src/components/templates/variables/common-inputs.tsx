import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useTemplateForm from "@/hooks/useTemplateForm";

export default function CommonInputs({ index }: { index: number }) {
    const { control } = useTemplateForm();

    return (
        <>
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
            <FormField
                control={control}
                name={`variables.${index}.type`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Typ</FormLabel>
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <FormControl>
                                <SelectTrigger className="w-56">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="TEXT">
                                    Zmienna tekstowa
                                </SelectItem>
                                <SelectItem value="BANNER">Banner</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
}
