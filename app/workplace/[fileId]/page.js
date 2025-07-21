"use client"
import React, { useEffect } from 'react'
import { api } from "@/convex/_generated/api";
import { useParams } from 'next/navigation';
import WorkplaceHeader from '../component/workplaceHeader';
import PdfViewer from '../component/pdfViewer';
import { useQuery } from 'convex/react';
import TextEditor from '../component/textEditor';
function Page() {
    const { fileId } = useParams();
    
    const fileData = useQuery(api.pdfStorage.getFile ,{ pdfId: fileId });
    useEffect(() => {

    console.log(fileData);
    }, [fileData])
  return (
    <div className='h-screen overflow-hidden'>
        <WorkplaceHeader />
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