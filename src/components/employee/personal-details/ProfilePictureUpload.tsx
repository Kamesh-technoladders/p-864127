
import React, { useState } from "react";
import { UploadField } from "../UploadField";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { uploadDocument } from "@/utils/uploadDocument";
import { toast } from "sonner";
import { Camera, Pencil } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface ProfilePictureUploadProps {
  value?: string;
  onChange: (url: string) => void;
}

export const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  value,
  onChange,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const handleUpload = async (file: File) => {
    if (value) {
      setPendingFile(file);
      setShowReplaceDialog(true);
      return;
    }
    await processUpload(file);
  };

  const processUpload = async (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPG, JPEG, or PNG)');
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error('File size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadDocument(file, 'profile-pictures', 'profile');
      onChange(url);
      toast.success('Profile picture uploaded successfully');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      toast.error('Failed to upload profile picture');
    } finally {
      setIsUploading(false);
      setPendingFile(null);
      setShowReplaceDialog(false);
    }
  };

  const handleReplace = async () => {
    if (pendingFile) {
      await processUpload(pendingFile);
    }
  };

  return (
    <>
      <div className="flex items-center gap-6 w-full max-w-2xl">
        <div className="relative flex-shrink-0 group">
          <Avatar className="h-24 w-24">
            {value ? (
              <AvatarImage src={value} alt="Profile" />
            ) : (
              <AvatarFallback>
                <Camera className="h-8 w-8 text-gray-400" />
              </AvatarFallback>
            )}
          </Avatar>
          {value && (
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <label className="cursor-pointer p-2 rounded-full hover:bg-white/20 transition-colors">
                <Pencil className="h-6 w-6 text-white" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(file);
                  }}
                />
              </label>
            </div>
          )}
        </div>
        <div className="flex-grow space-y-2">
          <UploadField
            label="Profile Picture"
            onUpload={handleUpload}
            showProgress={true}
            currentFile={value ? { name: 'Profile Picture', type: 'image', url: value } : undefined}
            error={undefined}
          />
          <p className="text-xs text-gray-500">
            Accepted formats: JPG, JPEG, PNG (max 5MB)
          </p>
        </div>
      </div>

      <AlertDialog open={showReplaceDialog} onOpenChange={setShowReplaceDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Replace Profile Picture</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to replace your current profile picture? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingFile(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReplace}>Replace</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
