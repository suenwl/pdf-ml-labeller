import React from "react";
import "./App.css";
import "@material/typography/dist/mdc.typography.css";
import { withState, compose, withHandlers } from "recompose";
import { Typography } from "rmwc";
import Sidebar from "./Sidebar";
import PDF from "./PDF";
import Toolbar from "./Toolbar";
import randomColor from "randomcolor";

const CATEGORIES = [
  "Provider name",
  "Account number",
  "Date of invoice",
  "Total charge",
  "Location of consumption",
  "Currency of invoice"
];

const colors = randomColor({
  count: CATEGORIES.length,
  luminosity: "dark"
});

function App({
  file,
  handlePDFchange,
  page,
  setPage,
  scale,
  setScale,
  categories,
  drawingForCategory,
  setDrawingForCategory,
  addToCategory
}) {
  return (
    <body className="mdc-typography">
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      ></link>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        rel="stylesheet"
      />
      <div className="App">
        <Sidebar
          categories={categories}
          handlePDFchange={handlePDFchange}
          setDrawingForCategory={setDrawingForCategory}
          fileName={file ? file.name.slice(0, -4) : null}
        />
        <div className="Content">
          <div className="Header">
            <Typography use="headline2">{file ? file.name : null}</Typography>
            <Toolbar scale={scale} setScale={setScale} />
          </div>
          <PDF
            file={file}
            scale={scale}
            page={page}
            setPage={setPage}
            categories={categories}
            drawingForCategory={drawingForCategory}
            addToCategory={addToCategory}
          />
        </div>
      </div>
    </body>
  );
}

const enhance = compose(
  withState("file", "setFile", null),
  withState("page", "setPage", 1),
  withState("scale", "setScale", 1),
  withState("drawingForCategory", "setDrawingForCategory", null),
  withState(
    "categories",
    "setCategories",
    CATEGORIES.map((category, index) => ({
      category: category,
      color: colors[index],
      items: []
    }))
  ),
  withHandlers({
    handlePDFchange: ({ setFile }) => event => {
      setFile(event.target.files[0]);
    },
    addToCategory: ({ setCategories, categories }) => (
      categoryName,
      rectangle
    ) => {
      const categoryBeingAddedTo = categories.filter(
        category => category.category === categoryName
      )[0];
      setCategories([
        {
          ...categoryBeingAddedTo,
          items: categoryBeingAddedTo.items.concat([rectangle])
        },
        ...categories.filter(category => category.category !== categoryName)
      ]);
    }
  })
);

export default enhance(App);
