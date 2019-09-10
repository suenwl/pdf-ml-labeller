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

const Category = ({ data, setDrawingForCategory }) => (
  <Card className="Category">
    <div className="Header">
      <div className="Circle" style={{ backgroundColor: data.color }} />
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
      {data.items.map(item => (
        <Chip
          key={item.x.toString() + item.y.toString()}
          trailingIcon="close"
          label="Selection"
        />
      ))}
    </ChipSet>
  </Card>
);

export default Category;
