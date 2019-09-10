import React from "react";
import "./Categories.css";
import Category from "./Category";

const Categories = ({ categories, setDrawingForCategory }) => (
  <div className="Categories">
    {categories.map(category => (
      <Category
        data={category}
        key={category.category}
        setDrawingForCategory={setDrawingForCategory}
      />
    ))}
  </div>
);

export default Categories;
