import React from 'react'

function PdfViewer({ fileUrl }) {
  return (
    <div>
      <iframe
      
        src={fileUrl+"#toolbar=0"} title="PDF Viewer" style={{   width: "100%",   height: "90vh",   border: "none" }}
      />
    </div>
  );
}

export default PdfViewer