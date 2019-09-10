import React, { Component } from "react";
import "@material/button/dist/mdc.button.css";
import { Button } from "rmwc";
import { compose, withHandlers } from "recompose";
import Categories from "./Categories";

class Sidebar extends Component {
  onUploadButtonClick = event => {
    this.refs.fileUploader.click();
  };

  render() {
    return (
      <div className="Sidebar">
        <div className="ImportExportButtons">
          <input
            type="file"
            ref="fileUploader"
            name="file"
            onChange={this.props.handlePDFchange}
            style={{ display: "none" }}
          />
          <Button
            label="Import PDF"
            icon="cloud_upload"
            onClick={this.onUploadButtonClick}
          />
          <Button label="Download labels" icon="save_alt" />
        </div>
        <Categories
          categories={this.props.categories}
          setDrawingForCategory={this.props.setDrawingForCategory}
        />
      </div>
    );
  }
}

const enhance = compose(withHandlers({}));

export default enhance(Sidebar);
