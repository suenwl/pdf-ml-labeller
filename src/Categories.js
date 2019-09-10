import React from "react"
import "./Categories.css"
import Category from "./Category"

const Categories = ({ categories }) => (
    <div className="Categories">
        {categories.map(category => (
            <Category data={category} key={category.category} />
        )
        )}
    </div>
)

export default Categories