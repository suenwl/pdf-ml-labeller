import React from "react";
import "./App.css";
import "@material/typography/dist/mdc.typography.css";
import { withState, compose, withHandlers, lifecycle } from "recompose";
import { Typography } from "rmwc";
import Sidebar from "./Sidebar";
import PDF from "./PDF";
import Toolbar from "./Toolbar";
import randomColor from "random-color";

const CATEGORIES = [
  "Name of provider",
  "Account number",
  "Date of invoice",
  "Amount (excluding GST)",
  "Amount (including GST)",
  "Country of consumption",
  "Currency of invoice",
  "PO Number",
  "Consumption period"
];

const colors = CATEGORIES.map(() => randomColor(0.6, 0.99).hexString());

function App({
  file,
  handlePDFchange,
  page,
  setPage,
  scale,
  setScale,
  categories,
  setCategories,
  drawingForCategory,
  setDrawingForCategory,
  addToCategory,
  removeSelection
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
          drawingForCategory={drawingForCategory}
          setDrawingForCategory={setDrawingForCategory}
          fileName={file ? file.name.slice(0, -4) : null}
          removeSelection={removeSelection}
          setCategories={setCategories}
        />
        <div className="Content">
          <div className="Header">
            <Typography use="headline2">{file ? file.name : null}</Typography>
            <Toolbar
              page={page}
              setPage={setPage}
              scale={scale}
              setScale={setScale}
            />
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

const defaultCategories = CATEGORIES.map((category, index) => ({
  category: category,
  color: colors[index],
  items: []
}));

const enhance = compose(
  withState("file", "setFile", null),
  withState("page", "setPage", 1),
  withState("scale", "setScale", 1),
  withState("drawingForCategory", "setDrawingForCategory", null),
  withState("categories", "setCategories", defaultCategories),
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
    },
    removeSelection: ({ setCategories, categories }) => (categoryName, key) => {
      const relevantCategory = categories.filter(
        category => category.category === categoryName
      )[0];
      setCategories([
        {
          ...relevantCategory,
          items: relevantCategory.items.filter(item => item.key !== key)
        },
        ...categories.filter(category => category.category !== categoryName)
      ]);
    }
  }),
  lifecycle({
    componentDidUpdate({ file }) {
      if (file !== this.props.file) {
        this.props.setPage(1);
        this.props.setCategories(defaultCategories);
      }
    }
  })
);

export default enhance(App);
