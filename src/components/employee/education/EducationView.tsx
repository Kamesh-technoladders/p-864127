
import React from "react";
import { Button } from "@/components/ui/button";
import { DocumentList } from "./DocumentList";

interface Document {
  name: string;
  url: string;
  type: string;
}

interface EducationViewProps {
  documents: Document[];
  onEdit: () => void;
  onViewDocument: (document: Document) => void;
  onDownloadDocument: (document: Document) => void;
}

export const EducationView: React.FC<EducationViewProps> = ({
  documents,
  onEdit,
  onViewDocument,
  onDownloadDocument,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Documents</h3>
        <Button variant="outline" size="sm" onClick={onEdit}>Edit</Button>
      </div>
      <DocumentList
        documents={documents}
        onView={onViewDocument}
        onDownload={onDownloadDocument}
      />
    </div>
  );
};
