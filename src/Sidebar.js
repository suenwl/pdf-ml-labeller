import React from 'react';
import '@material/list/dist/mdc.list.css';
import '@material/button/dist/mdc.button.css';
import { Button } from "rmwc"
import { List, ListItem, ListItemText, ListItemPrimaryText, ListItemSecondaryText } from "rmwc"

const Sidebar = ({ categories }) => (
    <div className="Sidebar">
        <div>
            <Button label="Upload PDF" icon="cloud_upload" />
            <Button label="Download labels" icon="cloud_download" />

        </div>
        <List twoLine>
            {categories.map(category => <ListItem>
                <ListItemText>
                    <ListItemPrimaryText>{category}</ListItemPrimaryText>
                    <ListItemSecondaryText></ListItemSecondaryText>
                </ListItemText>
            </ListItem>)

            }

        </List>
    </div>


)

export default Sidebar