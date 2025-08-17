"use client";
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2Icon, BanIcon } from 'lucide-react';
import { v4 as uuid4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import axios from 'axios';

function UploadPdf({ count }) {
  const generateUploadUrl = useMutation(api.pdfStorage.generateUploadUrl);
  const addFile = useMutation(api.pdfStorage.addFile);
  const getFileUrl = useMutation(api.pdfStorage.getFileUrl);
  const embeddDocument = useAction(api.myAction.ingest);
  const { user } = useUser();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [open, setOpen] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length > 0) {
      setFile(selectedFiles[0]);
    }
  };

  const OnUpload = async () => {
    setLoading(true);
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file?.type },
      body: file,
    });
    const { storageId } = await result.json();
    const fileUrl = await getFileUrl({ storageId });
    const fileId = uuid4();

    await addFile({
      storageId,
      createdBy: user.primaryEmailAddress?.emailAddress,
      pdfId: fileId,
      fileName,
      fileUrl
    });

    setFile(null);
    const response = await axios.get('/api/pdf-loader?pdfUrl=' + fileUrl);
    await embeddDocument({ textSplit: response.data.result, fileId });

    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full"
          onClick={() => setOpen(true)}
          disabled={count >= 10}
        >
          Upload PDF
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-white rounded-xl shadow-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-stone-800">
            {count >= 10 ? "Limit reached" : "Import PDFs"}
          </DialogTitle>
          <DialogDescription asChild>
            {count >= 10 ? (
              <div className="flex flex-col items-center text-center p-6">
                <BanIcon className="w-12 h-12 text-red-500 mb-3 animate-bounce" />
                <p className="text-lg font-semibold text-red-600">
                  You have reached the limit of 10 files.
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Delete an existing PDF to upload a new one.
                </p>
              </div>
            ) : (
              <div>
                <div className="mt-2 text-sm text-gray-500 space-y-4">
                  <p>Select a PDF file to upload:</p>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="w-full px-4 py-2 text-sm border border-stone-300 rounded-md shadow-sm 
                               file:bg-stone-100 file:border-none file:px-3 file:py-1 file:rounded-md 
                               file:text-stone-700 hover:file:bg-stone-200"
                    onChange={(e) => handleFileChange(e)}
                  />
                </div>
                <div className="mt-2 text-sm text-gray-500 space-y-4">
                  <p>PDF file name:</p>
                  <input
                    type="text"
                    className="w-full px-4 py-2 text-sm border border-stone-300 rounded-md shadow-sm"
                    onChange={(e) => setFileName(e.target.value)}
                  />
                </div>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          {count < 10 && (
            <Button onClick={OnUpload} disabled={loading}>
              {loading ? <Loader2Icon className='animate-spin' /> : "Confirm"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPdf;
