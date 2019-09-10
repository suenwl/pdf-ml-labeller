import React from "react";
import "@material/card/dist/mdc.card.css";
import "@material/typography/dist/mdc.typography.css";
import "@material/list/dist/mdc.list.css";
import "@material/icon-button/dist/mdc.icon-button.css";
import "@material/chips/dist/mdc.chips.css";
import { IconButton } from "rmwc";
import { Card } from "rmwc";
import { Typography, ListDivider } from "rmwc";
import { ChipSet, Chip } from "rmwc";

const Category = ({
  data,
  drawingForCategory,
  setDrawingForCategory,
  removeSelection
}) => (
  <Card className="Category">
    <div className="Header">
      <div
        className="Circle"
        style={{
          backgroundColor: data.color,
          border: data.category === drawingForCategory ? "1px solid black" : ""
        }}
      />
      <Typography
        use="subtitle1"
        style={{ padding: "0.5rem 1rem" }}
        theme="textSecondaryOnBackground"
      >
        {data.category}
      </Typography>

      <IconButton
        icon="add"
        onClick={() => setDrawingForCategory(data.category)}
      />
    </div>
    <ListDivider />
    <ChipSet>
      {data.items.map((item, index) => {
        return (
          <Chip
            key={item.key}
            trailingIcon="close"
            label={index + 1}
            onRemove={() => removeSelection(data.category, item.key)}
          />
        );
      })}
    </ChipSet>
  </Card>
);

export default Category;
