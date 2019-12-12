import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import {Form, Input, Button} from 'semantic-ui-react';

const NewTabForm = () => {

    const [tabDetails, setTabDetails] = useState({title: '', description: '', budget: ''});
    const [buttonLoading, setButtonLoading] = useState(false);

    const history = useHistory();

    if (sessionStorage.getItem('occasion')) {
        setTabDetails({...tabDetails, title: sessionStorage.getItem('occasion')});
        sessionStorage.removeItem('occasion');
    }

    const handleNewTabInputChange = (e) => {
        let input = e.target.value;
        let type = e.target.id;

        switch (type) {
            case 'tabTitleInput':
                setTabDetails({...tabDetails, title: input});
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
        setButtonLoading(true);

        tabDetails.users = [
            {name: 'Radi', picture: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg', id: 1000},
            {name: 'John', picture: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg', id: 1001},
            {name: 'Alex', picture: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg', id: 1002},
            {name: 'Chris', picture: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg', id: 1003}
        ];

        const data = {
            creator: '123abc456',
            title: tabDetails.title,
            description: tabDetails.description,
            budget: tabDetails.budget
        }

        axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/tab/new`, data)
        .then((res) => {
            console.log(res);
            localStorage.setItem('tabDetails', JSON.stringify(tabDetails));
            setButtonLoading(false);
            history.push(`/tab?id=${res.data.response.id}`);    
        })
        .catch((err) => {
            console.log(err);
            alert(`There was a problem! Please try again.`);
            setButtonLoading(false);
        });

        e.preventDefault();
    }

    return (
        <Form onSubmit={handleNewTabFormSubmit}>
            <div className="dNewTabFormField">
                <label>Tab Name <span style={{color: 'red'}}>*</span></label>
                <Input
                fluid 
                placeholder='New York Vacation' 
                value={tabDetails.title}
                onChange={handleNewTabInputChange}
                id='tabTitleInput'
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

            <Button loading={buttonLoading} disabled={buttonLoading} compact>Create</Button>
        </Form>
    );
}

export default NewTabForm;