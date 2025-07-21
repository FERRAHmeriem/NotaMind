import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";


//const PdfUrl = 'https://fine-bobcat-483.convex.cloud/api/storage/86eead9f-47a4-416d-8929-27ced5f7b149';


export async function GET(req) {
    const reqUrl = req.url;
    const url = new URL(reqUrl);
    const pdfUrl = url.searchParams.get('pdfUrl');
    //1.Load the PDF file
    const response = await fetch(pdfUrl);
    const PDFblob = await response.blob();
    const loader = new WebPDFLoader(PDFblob);
    const pdf = await loader.load();
    let  PDFcontent = "";
    pdf.forEach(page => {
        PDFcontent = PDFcontent + page.pageContent+" "; 
    });
    //2.split it into 100 chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
    });
    const output = await textSplitter.createDocuments([PDFcontent]);
    let splitterList = [];
    output.forEach((doc) => {
        splitterList.push(doc.pageContent);
    }); 



    return NextResponse.json({result : splitterList})
}