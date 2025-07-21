"use client"
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
import { Loader2Icon } from 'lucide-react';
import { v4 as uuid4 } from 'uuid';
import {useUser } from "@clerk/nextjs";
import axios from 'axios';


function UploadPdf({ children }) {
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
        //convex docs
        //step 1
        const postUrl = await generateUploadUrl();
        //step 2
        const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file?.type },
        body: file,
        });
        const { storageId } = await result.json();
        console.log(storageId);
        //step 3
        const fileUrl = await getFileUrl({ storageId });
        const fileId = uuid4();
        
        await addFile({ storageId:storageId, createdBy: user.primaryEmailAddress?.emailAddress , pdfId : fileId , fileName: fileName ,fileUrl :fileUrl });
        setFile(null);  

        //API calls 
        const response = await axios.get('/api/pdf-loader?pdfUrl=' + fileUrl);
        await embeddDocument({textSplit : response.data.result  , fileId: fileId});
        
        setLoading(false);
        setOpen(false);
    }
  return (
    <Dialog open={open} >
      <DialogTrigger asChild>
        <Button className="w-full" onClick={() => setOpen(true)}>Importer un/des PDF</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white rounded-xl shadow-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-stone-800">
            Importer des PDFs
          </DialogTitle>
          <DialogDescription asChild>
            <div>
            <div className="mt-2 text-sm text-gray-500 space-y-4">
              <p>Sélectionnez un ou plusieurs fichiers PDF à importer :</p>
              <input
                type="file"
                accept="application/pdf"
                multiple
                className="w-full px-4 py-2 text-sm border border-stone-300 rounded-md shadow-sm file:bg-stone-100 file:border-none file:px-3 file:py-1 file:rounded-md file:text-stone-700 hover:file:bg-stone-200"
                onChange={(e) => handleFileChange(e)}             
             />
            </div>
            <div className="mt-2 text-sm text-gray-500 space-y-4">
              <p>Nom du fichier PDF:</p>
              <input
                type="text"
                className="w-full px-4 py-2 text-sm border border-stone-300 rounded-md shadow-sm file:bg-stone-100 file:border-none file:px-3 file:py-1 file:rounded-md file:text-stone-700 hover:file:bg-stone-200"
                onChange={(e) => setFileName(e.target.value)}             
             />
            </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DialogClose>
          <Button onClick={OnUpload} disabled={loading}>
            {loading ? (<Loader2Icon className='animate-spin'/>) : "Confirm"}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UploadPdf
