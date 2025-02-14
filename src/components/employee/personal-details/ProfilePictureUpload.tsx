
import React, { useState } from "react";
import { UploadField } from "../UploadField";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { uploadDocument } from "@/utils/uploadDocument";
import { toast } from "sonner";
import { Camera } from "lucide-react";

interface ProfilePictureUploadProps {
  value?: string;
  onChange: (url: string) => void;
}

export const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  value,
  onChange,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (file: File) => {
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
    }
  };

  return (
    <div className="flex items-center gap-6 w-full max-w-2xl">
      <div className="flex-shrink-0">
        <Avatar className="h-24 w-24">
          {value ? (
            <AvatarImage src={value} alt="Profile" />
          ) : (
            <AvatarFallback>
              <Camera className="h-8 w-8 text-gray-400" />
            </AvatarFallback>
          )}
        </Avatar>
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
  );
};
