import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx"; // Close icon
import "./PdfViewer.css"; // Import CSS file

const PdfViewer = ({ doc_id, pageNumbers, closePdfViewer }) => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setPdfUrl(
      `https://hcsc-test-ebf5gebgeae9gfcz.eastus2-01.azurewebsites.net/blob/data/billing_guide_v7/pdf_splits/${doc_id}.pdf#toolbar=1`
    );
  }, [doc_id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pdfUrl]);

  return (
    <div className="pdf-viewer-container">
      <div className="pdf-header">
        <span className="page-number">{pageNumbers}</span>
        <div className="close-button-container">
          <button className="close-button" onClick={closePdfViewer}>
            <RxCross2 />
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="pdf-loading-shimmer">
          <div className="pdf-shimmer-effect"></div>
        </div>
      ) : (
        <div className="pdf-wrapper">
          <iframe className="pdf-iframe" src={pdfUrl} title="PDF Viewer" />
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
