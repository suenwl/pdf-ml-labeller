import React from "react"
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDF = ({ file }) => (
    <div className="PDF">
        <Document
            className="Document"
            file={file}
        >
            <Page pageNumber={1} className="Page" />
        </Document>
    </div>
)

export default PDF