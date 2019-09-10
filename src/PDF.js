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
  handleMouseMove,
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
        onMouseMove={handleMouseMove}
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
  withState("startingPoint", "setStartingPoint", {
    x: null,
    y: null
  }),
  withState("lastKnownPoint", "setLastKnownPoint", {
    x: null,
    y: null
  }),
  withHandlers({
    handleMouseMove: ({ drawing, setLastKnownPoint, canvas }) => event => {
      if (drawing) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setLastKnownPoint({
          x: x / canvas.width,
          y: y / canvas.height
        });
      }
    },
    handleMouseDown: ({
      setDrawing,
      drawingForCategory,
      setStartingPoint,
      canvas
    }) => event => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (drawingForCategory) {
        setDrawing(true);
        setStartingPoint({
          x: x / canvas.width,
          y: y / canvas.height
        });
      }
    },
    handleMouseUp: ({
      setDrawing,
      drawingForCategory,
      canvas,
      startingPoint,
      addToCategory
    }) => event => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (drawingForCategory) {
        setDrawing(false);
        addToCategory(drawingForCategory, {
          ...startingPoint,
          width: Math.abs(x / canvas.width - startingPoint.x),
          height: Math.abs(y / canvas.height - startingPoint.y)
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
      drawing,
      canvas,
      dimensions,
      updateCanvasDimensions,
      lastKnownPoint,
      startingPoint
    }) {
      if (canvas) {
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (drawing) {
          context.strokeStyle = this.props.categories.filter(
            cat => cat.category === this.props.drawingForCategory
          )[0].color;
          context.strokeRect(
            startingPoint.x * canvas.width,
            startingPoint.y * canvas.height,
            (lastKnownPoint.x - startingPoint.x) * canvas.width,
            (lastKnownPoint.y - startingPoint.y) * canvas.height
          );
        }

        // Loop through all categories for our machine learning classifier
        for (var category in this.props.categories) {
          const categorySelections = this.props.categories[category].items;
          // Loop through all selected areas thus far
          context.strokeStyle = this.props.categories[category].color; // Change color to the category color before drawing
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
