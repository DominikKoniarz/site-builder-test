import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import useDeleteImageDialog from "@/hooks/use-delete-image-dialog";
import { Trash } from "lucide-react";

type Props = {
    imageIndex: number;
};
//
// here if new image that do not do dialog, delete imeadietly
//

export default function DeleteImageDialog({ imageIndex }: Props) {
    const { isOpen, setIsOpen, removeImage } = useDeleteImageDialog(imageIndex);

    return (
        <Dialog open={isOpen} onOpenChange={(state) => setIsOpen(state)}>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    className="h-8 w-8 bg-white p-1 text-black hover:bg-white/90 [&_svg]:size-5"
                >
                    <Trash />
                </Button>
            </DialogTrigger>
            <DialogContent className="gap-0 border-0 bg-slate-800 text-white sm:max-w-fit">
                <DialogHeader>
                    <DialogTitle className="text-white">
                        Delete image
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="mb-2 mt-2 text-white/80">
                    Are you sure you want to delete this image?
                </DialogDescription>
                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button type="button">Close</Button>
                    </DialogClose>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={removeImage}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
