import React from "react";
import "@material/icon-button/dist/mdc.icon-button.css";
import { IconButton } from "rmwc";
import { withHandlers } from "recompose";

const Toolbar = ({ scale, zoomIn, zoomOut, prevPage, nextPage, page }) => (
  <div className="Toolbar">
    <div className="Tool" style={{ borderRight: "1px dotted grey" }}>
      <IconButton icon="remove" onClick={zoomOut} />
      {scale * 100 + "%"}
      <IconButton icon="add" onClick={zoomIn} />
    </div>

    <div className="Tool">
      <IconButton icon="keyboard_arrow_left" onClick={prevPage} />
      {page}
      <IconButton icon="keyboard_arrow_right" onClick={nextPage} />
    </div>
  </div>
);

const enhance = withHandlers({
  zoomIn: ({ setScale, scale }) => () => {
    setScale(scale + 0.25);
  },
  zoomOut: ({ setScale, scale }) => () => {
    setScale(scale - 0.25);
  },
  prevPage: ({ page, setPage }) => () => {
    if (page > 1) setPage(page - 1);
  },
  nextPage: ({ page, setPage }) => () => {
    if (page) setPage(page + 1);
  }
});

export default enhance(Toolbar);
