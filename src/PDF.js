import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./PDF.css";
import { compose, withState, withHandlers, lifecycle } from "recompose";
import $ from "jquery";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDF = ({
  file,
  page,
  scale,
  setCanvas,
  dimensions,
  updateCanvasDimensions,
  handleMouseMove,
  handleMouseDown,
  handleMouseUp,
  drawingForCategory
}) => (
  <div className="PDF">
    <Document className="Document" file={file}>
      <Page
        pageNumber={page}
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
        style={{ cursor: drawingForCategory ? "crosshair" : "default" }}
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
      setStartingPoint,
      addToCategory,
      page
    }) => event => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (drawingForCategory) {
        setDrawing(false);
        const width = x / canvas.width - startingPoint.x;
        const height = y / canvas.height - startingPoint.y;
        if (width > 0 && height > 0) {
          addToCategory(drawingForCategory, {
            ...startingPoint,
            width: width,
            height: height,
            page: page,
            key:
              Math.random()
                .toString(36)
                .substring(2, 15) +
              Math.random()
                .toString(36)
                .substring(2, 15)
          });
        }
        setStartingPoint({ x: null, y: null });
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
      dimensions,
      updateCanvasDimensions,
      lastKnownPoint,
      startingPoint
    }) {
      if (canvas) {
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (this.props.drawing) {
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
            if (
              categorySelections[categorySelection].page === this.props.page
            ) {
              context.strokeRect(
                categorySelections[categorySelection].x * canvas.width,
                categorySelections[categorySelection].y * canvas.height,
                categorySelections[categorySelection].width * canvas.width,
                categorySelections[categorySelection].height * canvas.height
              );
            }
          }
        }
      }

      if (dimensions.width !== this.props.dimensions.width)
        updateCanvasDimensions();
    }
  })
);

export default enhance(PDF);
