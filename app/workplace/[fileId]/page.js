"use client"
import React, { useEffect } from 'react'
import { api } from "@/convex/_generated/api";
import { useParams } from 'next/navigation';
import WorkplaceHeader from '../component/workplaceHeader';
import PdfViewer from '../component/pdfViewer';
import { useQuery } from 'convex/react';
import TextEditor from '../component/textEditor';
import { LoaderCircle } from 'lucide-react';
function Page() {
    const { fileId } = useParams();
    
    const fileData = useQuery(api.pdfStorage.getFile ,{ pdfId: fileId });
    useEffect(() => {

    console.log(fileData);
    }, [fileData])

    if (!fileData) return (
        <div className="flex items-center justify-center h-screen">
         <LoaderCircle className="animate-spin w-10 h-10 text-purple-500" />
        </div>
    )
  return (
    <div className='h-screen overflow-hidden'>
        <WorkplaceHeader fileName={fileData?.fileName} />
        <div className='flex gap-6'>
            <div className='basis-1/2 '>
                {/* PDF viewer */}
                <PdfViewer fileUrl={fileData?.fileUrl}/>
            </div>
            <div className='basis-1/2 '>
                {/* text editor */}
                <TextEditor />
            </div>
        </div>
    </div>
  )
}

export default Page