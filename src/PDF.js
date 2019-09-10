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
  updateCanvasDimensions,
  handleMouseDown,
  handleMouseUp,
  categories
}) => (
  <div className="PDF">
    <Document className="Document" file={file}>
      <Page
        pageNumber={1}
        scale={scale}
        className="Page"
        onRenderSuccess={updateCanvasDimensions}
      />
      <canvas
        id="Canvas"
        className="Canvas"
        width={dimensions.width}
        height={dimensions.height}
        ref={setCanvas}
        onMouseMove={null}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </Document>
  </div>
);

const enhance = compose(
  withState("canvas", "setCanvas", null),
  withState("dimensions", "setDimensions", { width: null, height: null }),
  withState("drawing", "setDrawing", false),
  withState("currentSelection", "setCurrentSelection", {
    x: null,
    y: null,
    width: null,
    height: null
  }),
  withHandlers({
    handleMouseMove: ({
      drawing,
      currentSelection,
      setCurrentSelection
    }) => event => {
      if (drawing) {
      }
    },
    handleMouseDown: ({
      setDrawing,
      drawingForCategory,
      setCurrentSelection,
      canvas
    }) => event => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (drawingForCategory) {
        setDrawing(true);
        setCurrentSelection({
          x: x / canvas.width,
          y: y / canvas.height
        });
      }
    },
    handleMouseUp: ({
      setDrawing,
      drawingForCategory,
      canvas,
      currentSelection,
      addToCategory
    }) => event => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (drawingForCategory) {
        setDrawing(false);
        addToCategory(drawingForCategory, {
          ...currentSelection,
          width: Math.abs(x / canvas.width - currentSelection.x),
          height: Math.abs(y / canvas.height - currentSelection.y)
        });
      }
    },
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
