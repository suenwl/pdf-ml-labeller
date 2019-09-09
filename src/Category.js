import React from "react"
import '@material/card/dist/mdc.card.css';
import '@material/typography/dist/mdc.typography.css';
import '@material/list/dist/mdc.list.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import { IconButton } from "rmwc"
import { Card } from "rmwc"
import { Typography, ListDivider } from "rmwc"

const Category = ({ data }) => (
    <Card className="Category">
        <div className="Header">
            <Typography
                use="subtitle1"
                style={{ padding: '0.5rem 1rem' }}
                theme="textSecondaryOnBackground"
            >
                {data.category}
            </Typography>

            <IconButton icon="add" onClick={null} />
        </div>
        <ListDivider />
        {data.items.map(item => <div>

        </div>)}

    </Card>
)

export default Category