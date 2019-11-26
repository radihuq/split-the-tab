import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './NewTab.css';

import {Segment, Form, Input, Button} from 'semantic-ui-react';

const NewTab = () => {

    const [tabDetails, setTabDetails] = useState({name: '', description: '', budget: ''});

    const history = useHistory();

    if (sessionStorage.getItem('occasion')) {
        setTabDetails({...tabDetails, name: sessionStorage.getItem('occasion')});
        sessionStorage.removeItem('occasion');
    }

    const handleNewTabInputChange = (e) => {
        let input = e.target.value;
        let type = e.target.id;

        switch (type) {
            case 'tabNameInput':
                setTabDetails({...tabDetails, name: input});
                break;
            case 'tabDescriptionInput':
                setTabDetails({...tabDetails, description: input});
                break;
            case 'tabBudgetInput':
                setTabDetails({...tabDetails, budget: input});
                break;
            default:
                break;
        }
    }

    const handleNewTabFormSubmit = (e) => {
        tabDetails.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
        tabDetails.users = [
            {name: 'Radi', picture: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg', id: 1000},
            {name: 'John', picture: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg', id: 1001},
            {name: 'Alex', picture: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg', id: 1002},
            {name: 'Chris', picture: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg', id: 1003}
        ]
        localStorage.setItem('tabDetails', JSON.stringify(tabDetails));
        history.push(`/tab?id=${tabDetails.id}`);
        e.preventDefault();
    }

    return (
        <div className="newTabParentDiv">
            <Segment style={{minWidth: '60%'}}>

                <p className="dNewTabFormTitle">Set the details for your tab</p>

                <Form onSubmit={handleNewTabFormSubmit}>

                    <div className="dNewTabFormField">
                        <label>Tab Name <span style={{color: 'red'}}>*</span></label>
                        <Input
                        fluid 
                        placeholder='New York Vacation' 
                        value={tabDetails.name}
                        onChange={handleNewTabInputChange}
                        id='tabNameInput'
                        required
                        />
                    </div>

                    <div className="dNewTabFormField">
                        <label>Tab Description</label>
                        <Input
                        fluid
                        placeholder='This tab is to keep track of our New York trip - December 20 to January 3rd'
                        value={tabDetails.description}
                        onChange={handleNewTabInputChange}
                        id='tabDescriptionInput'
                        />
                    </div>

                    <div className="dNewTabFormField">
                        <label>Total Group Budget</label>
                        <Input 
                        type='number'
                        style={{maxWidth: '50%'}}
                        label='$' 
                        placeholder='200.00'
                        value={tabDetails.budget}
                        onChange={handleNewTabInputChange}
                        id='tabBudgetInput'
                        />
                    </div>

                    <Button compact>Create</Button>
                </Form>
            </Segment>
        </div>
    );
}

export default NewTab;