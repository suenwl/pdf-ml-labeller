import React from "react";
import "./Categories.css";
import Category from "./Category";

const Categories = ({
  categories,
  drawingForCategory,
  setDrawingForCategory,
  removeSelection
}) => (
  <div className="Categories">
    {categories
      .sort((a, b) => (a.category > b.category ? 1 : -1))
      .map(category => (
        <Category
          data={category}
          key={category.category}
          drawingForCategory={drawingForCategory}
          setDrawingForCategory={setDrawingForCategory}
          removeSelection={removeSelection}
        />
      ))}
  </div>
);

export default Categories;
