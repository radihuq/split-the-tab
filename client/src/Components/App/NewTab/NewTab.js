import React from 'react';
import './NewTab.css';

import NewTabForm from './NewTabForm';

import {Segment, Form, Input, Button} from 'semantic-ui-react';

const NewTab = () => {
    return (
        <div className="newTabParentDiv">
            <Segment style={{minWidth: '60%'}}>
                <p className="dNewTabFormTitle">Set the details for your tab</p>
                <NewTabForm />
            </Segment>
        </div>
    );
}

export default NewTab;