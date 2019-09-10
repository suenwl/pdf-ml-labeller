import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./PDF.css";
import { compose, withState, withHandlers, lifecycle } from "recompose";
import $ from "jquery";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDF = ({
  file,
  scale,
  setCanvas,
  dimensions,
  updateCanvasDimensions
}) => (
  <div className="PDF">
    <Document className="Document" file={file}>
      <Page
        pageNumber={1}
        scale={scale}
        className="Page"
        onRenderSuccess={updateCanvasDimensions}
      />
      {file ? (
        <canvas
          id="Canvas"
          className="Canvas"
          width={dimensions.width}
          height={dimensions.height}
          ref={setCanvas}
        />
      ) : null}
    </Document>
  </div>
);

const enhance = compose(
  withState("canvas", "setCanvas", null),
  withState("dimensions", "setDimensions", { width: null, height: null }),
  withHandlers({
    updateCanvasDimensions: ({ setDimensions }) => () => {
      const newDimensions = {
        width: $("#Canvas")
          .parent()
          .width(),
        height: $("#Canvas")
          .parent()
          .height()
      };
      console.log(newDimensions);

      setDimensions(newDimensions);
    }
  }),
  lifecycle({
    componentDidUpdate({ dimensions, updateCanvasDimensions }) {
      if (this.props.canvas) {
        const context = this.props.canvas.getContext("2d");
        context.strokeRect(30, 30, 100, 100);
      }

      if (dimensions.width !== this.props.dimensions.width)
        updateCanvasDimensions();
    }
  })
);

export default enhance(PDF);
