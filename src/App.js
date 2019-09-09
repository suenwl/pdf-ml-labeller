import React from 'react';
import './App.css';
import '@material/typography/dist/mdc.typography.css';
import { withState, compose, withHandlers } from 'recompose';
import { Typography } from "rmwc"
import Sidebar from "./Sidebar"
import PDF from "./PDF"
import Toolbar from "./Toolbar"


const CATEGORIES = ["Provider name",
  "Date of invoice",
  "Total charge",
  "Location of consumption"]

function App({ file, handlePDFchange, page, setPage, scale, setScale }) {
  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>

      <Sidebar categories={CATEGORIES} handlePDFchange={handlePDFchange} />
      <div className="Content">
        <div className="Header">
          <Typography use="headline2">{file ? file.name : null}</Typography>
          <Toolbar scale={scale} setScale={setScale} />
        </div>
        <PDF file={file} scale={scale} page={page} setPage={setPage} />
      </div>
    </div>
  );
}

const enhance = compose(
  withState("file", "setFile", null),
  withState("page", "setPage", 1),
  withState("scale", "setScale", 1),
  withHandlers({
    handlePDFchange: ({ setFile }) => (event) => {

      setFile(event.target.files[0])
    }
  })
)

export default enhance(App);
