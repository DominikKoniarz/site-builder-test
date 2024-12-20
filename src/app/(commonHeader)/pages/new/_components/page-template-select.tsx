import type { TemplateDTO } from "@/dto/templates.dto";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import usePageForm from "@/hooks/use-page-form";

type Props = {
    templates: TemplateDTO[];
};

export default function PageTemplateSelect({ templates }: Props) {
    const { control } = usePageForm();

    return (
        <FormField
            control={control}
            name="templateId"
            render={({ field }) => (
                <FormItem className="space-y-1">
                    <FormLabel>Template</FormLabel>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select template" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {templates.map((template) => (
                                <SelectItem
                                    key={template.id}
                                    value={template.id}
                                >
                                    {template.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
