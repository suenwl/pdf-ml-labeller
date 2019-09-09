import React from "react"
import '@material/icon-button/dist/mdc.icon-button.css';
import { IconButton } from "rmwc"
import { withHandlers } from "recompose";

const Toolbar = ({ scale, zoomIn, zoomOut }) => (
    <div className="Toolbar">
        <IconButton icon="remove" onClick={zoomOut} />
        {scale * 100 + "%"}
        <IconButton icon="add" onClick={zoomIn} />

    </div>
)

const enhance = withHandlers({
    zoomIn: ({ setScale, scale }) => () => {
        setScale(scale + 0.25)
    },
    zoomOut: ({ setScale, scale }) => () => {
        setScale(scale - 0.25)
    }
})

export default enhance(Toolbar)