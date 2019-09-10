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

      setDimensions(newDimensions);
    }
  }),
  lifecycle({
    componentDidUpdate({
      canvas,
      categories,
      dimensions,
      updateCanvasDimensions
    }) {
      if (canvas) {
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Loop through all categories for our machine learning classifier
        for (var category in categories) {
          const categorySelections = categories[category].items;
          // Loop through all selected areas thus far
          for (var categorySelection in categorySelections) {
            context.strokeRect(
              categorySelections[categorySelection].x * canvas.width,
              categorySelections[categorySelection].y * canvas.height,
              categorySelections[categorySelection].width * canvas.width,
              categorySelections[categorySelection].height * canvas.height
            );
          }
        }
      }

      if (dimensions.width !== this.props.dimensions.width)
        updateCanvasDimensions();
    }
  })
);

export default enhance(PDF);
