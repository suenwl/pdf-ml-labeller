import React, { Component } from "react";
import "@material/button/dist/mdc.button.css";
import { Button } from "rmwc";
import { compose, withHandlers } from "recompose";
import Categories from "./Categories";

class Sidebar extends Component {
  onUploadPdfButtonClick = event => {
    this.refs.pdfFileUploader.click();
  };

  onUploadJsonButtonClick = event => {
    this.refs.jsonFileUploader.click();
  };

  render() {
    return (
      <div className="Sidebar">
        <div className="ImportExportButtons">
          <input
            type="file"
            ref="pdfFileUploader"
            name="pdfFile"
            onChange={this.props.handlePDFchange}
            style={{ display: "none" }}
          />

          <input
            type="file"
            ref="jsonFileUploader"
            name="jsonFile"
            onChange={this.props.handleJsonUpload}
            style={{ display: "none" }}
          />

          <Button
            label="Import PDF"
            icon="cloud_upload"
            onClick={this.onUploadPdfButtonClick}
          />
          <Button
            label="Download labels"
            icon="save_alt"
            onClick={this.props.handleDownload}
            disabled={!this.props.fileName}
          />
          <Button
            label="Import json tags"
            icon="subject"
            onClick={this.onUploadJsonButtonClick}
            disabled={!this.props.fileName}
          />
        </div>
        <Categories
          categories={this.props.categories}
          drawingForCategory={this.props.drawingForCategory}
          setDrawingForCategory={this.props.setDrawingForCategory}
          removeSelection={this.props.removeSelection}
        />
      </div>
    );
  }
}

const enhance = compose(
  withHandlers({
    handleDownload: ({ categories, fileName }) => () => {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
          encodeURIComponent(JSON.stringify(categories))
      );
      element.setAttribute("download", fileName + ".json");

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    handleJsonUpload: ({ setCategories, categories }) => async event => {
      const fileReader = new FileReader();
      fileReader.readAsText(event.target.files[0]);
      fileReader.onload = () => {
        const save_data = JSON.parse(fileReader.result);
        const save_data_categories = save_data.map(
          category => category.category
        );
        const missing_fields = categories.filter(
          category => !save_data_categories.includes(category.category)
        );
        setCategories(save_data.concat(missing_fields));
      };
    }
  })
);

export default enhance(Sidebar);
