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
import useTemplateForm from "@/hooks/use-template-form";
import { VariableType } from "@prisma/client";

export default function CommonInputs({ index }: { index: number }) {
    const { control } = useTemplateForm();

    return (
        <>
            <FormField
                control={control}
                name={`variables.${index}.name`}
                render={({ field }) => (
                    <FormItem className="w-56 space-y-1">
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
                    <FormItem className="w-56 space-y-1">
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
                    <FormItem className="w-56 space-y-1">
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
                                <SelectItem value={VariableType.TEXT}>
                                    Zmienna tekstowa
                                </SelectItem>
                                <SelectItem value={VariableType.BANNER}>
                                    Banner
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
}
