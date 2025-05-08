import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useSession } from "@clerk/nextjs";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type AlertDialogDemoProps = {
  postId: string;
  onDelete: (postId: string) => Promise<void>;
};

export function AlertDialogDemo({ postId, onDelete }: AlertDialogDemoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(postId);
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setIsDeleting(false);
      setIsOpen(false); // Close only after deletion completes
    }
  };

  return (
    <div className="flex items-center justify-center">
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button className="cursor-pointer" variant="ghost">
            <Trash2 size={18} />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="bg-neutral-950">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you damn sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your post and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer hover:bg-neutral-900" disabled={isDeleting}>Cancel</AlertDialogCancel>

            {/* Custom controlled button instead of AlertDialogAction */}
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              variant="destructive"
              className="cursor-pointer hover:bg-neutral-900"
            >
              {isDeleting ? "Deleting..." : "Continue"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
