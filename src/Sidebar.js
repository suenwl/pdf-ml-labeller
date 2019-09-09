import React, { Component } from 'react';
import '@material/list/dist/mdc.list.css';
import '@material/button/dist/mdc.button.css';
import { Button } from "rmwc"
import { List, ListItem, ListItemText, ListItemPrimaryText, ListItemSecondaryText } from "rmwc"
import { compose, withHandlers } from 'recompose';

class Sidebar extends Component {



    onUploadButtonClick = (event) => {
        this.refs.fileUploader.click();
    }

    render() {
        return (
            <div className="Sidebar">
                <div>
                    <input type="file" ref="fileUploader" name="file" onChange={this.props.handlePDFchange} style={{ display: "none" }} />
                    <Button label="Import PDF" icon="cloud_upload" onClick={this.onUploadButtonClick} />
                    <Button label="Download labels" icon="cloud_download" />

                </div>
                <List twoLine>
                    {this.props.categories.map(category => <ListItem>
                        <ListItemText>
                            <ListItemPrimaryText>{category}</ListItemPrimaryText>
                            <ListItemSecondaryText></ListItemSecondaryText>
                        </ListItemText>
                    </ListItem>)

                    }

                </List>
            </div>)
    }

}

const enhance = compose(withHandlers({

}))

export default enhance(Sidebar)