import React from "react";
import "./Categories.css";
import Category from "./Category";

const Categories = ({
  categories,
  drawingForCategory,
  setDrawingForCategory
}) => (
  <div className="Categories">
    {categories.map(category => (
      <Category
        data={category}
        key={category.category}
        drawingForCategory={drawingForCategory}
        setDrawingForCategory={setDrawingForCategory}
      />
    ))}
  </div>
);

export default Categories;
