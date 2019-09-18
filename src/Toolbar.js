import React from "react";
import "@material/icon-button/dist/mdc.icon-button.css";
import { IconButton } from "rmwc";
import { withState, compose, withHandlers } from "recompose";

const Toolbar = ({
  file,
  scale,
  zoomIn,
  zoomOut,
  prevPage,
  nextPage,
  pageText,
  maxPage,
  handlePageChange
}) =>
  file ? (
    <div className="Toolbar">
      <div className="Tool" style={{ borderRight: "1px dotted grey" }}>
        <IconButton icon="remove" onClick={zoomOut} />
        {scale * 100 + "%"}
        <IconButton icon="add" onClick={zoomIn} />
      </div>

      <div className="Tool">
        <IconButton icon="keyboard_arrow_left" onClick={prevPage} />
        <input
          onInput={handlePageChange}
          value={pageText}
          type="number"
          className="PageInput"
        />
        /{"  "}
        {maxPage}
        <IconButton icon="keyboard_arrow_right" onClick={nextPage} />
      </div>
    </div>
  ) : null;

const enhance = compose(
  withState("pageText", "setPageText", 1),
  withHandlers({
    zoomIn: ({ setScale, scale }) => () => {
      setScale(scale + 0.25);
    },
    zoomOut: ({ setScale, scale }) => () => {
      setScale(scale - 0.25);
    },
    prevPage: ({ page, setPage, setPageText }) => () => {
      if (page > 1) {
        setPageText(page - 1);
        setPage(page - 1);
      }
    },
    nextPage: ({ page, setPage, maxPage, setPageText }) => () => {
      if (page < maxPage) {
        setPageText(page + 1);
        setPage(page + 1);
      }
    },
    handlePageChange: ({ setPage, maxPage, setPageText }) => event => {
      const newPage = parseInt(event.target.value);
      setPageText(newPage);
      if (newPage >= 1 && newPage <= maxPage) {
        setPage(newPage);
      }
    }
  })
);

export default enhance(Toolbar);
