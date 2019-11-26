import React, {useState, useContext} from 'react';

import {CTX} from '../../../Context/TabData';
import TabDetails from './TabDetails';
import TabFeed from './TabFeed';

import {Segment, Button, Modal, Form, Input} from 'semantic-ui-react';

const TabBody = () => {

    const {tabData} = useContext(CTX);
    const [tabDetails, setTabDetails] = useState(JSON.parse(localStorage.getItem('tabDetails')));
    const [newPurchaseInput, setNewPurchaseInput] = useState({item: '', amount: '', details: ''});
    const [modalOpen, setModalOpen] = useState(false);


    const handleAddNewPurchaseClick = (e) => {
        setModalOpen(true);
    }

    const handleModalClose = () => {
        setModalOpen(false);
    }

    const handleNewPurchaseInputInputChange = (e) => {
        let input = e.target.value;
        let type = e.target.id;

        switch (type) {
            case 'itemInput':
                setNewPurchaseInput({...newPurchaseInput, item: input});
                break;
            case 'amountInput':
                setNewPurchaseInput({...newPurchaseInput, amount: input});
                break;
            case 'detailsInput':
                setNewPurchaseInput({...newPurchaseInput, details: input});
                break;
            default:
                break;
        }
    }

    const handleNewPurchaseSubmit = (e) => {
        console.log(newPurchaseInput);

        let newPurchase = newPurchaseInput;
        newPurchase.amount = Math.round(newPurchase.amount * 100) / 100; 
        newPurchase.user = '531992';
        newPurchase.name = 'John Smith';
        newPurchase.action = 'purchase';
        newPurchase.time = '8:01PM - 11/30/2019';

        // let newFeed = feed;
        // newFeed.unshift(newPurchase);
        // setFeed(newFeed);
        setModalOpen(false);
        // setNewPurchaseInput({item: '', amount: '', details: ''});

        e.preventDefault();
    }

    console.log(tabData);

    return (
        <div>
            <Modal size='small' open={modalOpen} onClose={handleModalClose} closeIcon>
                <Modal.Header>Add New Purchase</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={handleNewPurchaseSubmit}>
                        <div className="dTabNewPurchaseFormItem" style={{marginTop: 0}}>
                            <label>Item Purchased<span style={{color: 'red'}}>*</span></label>
                            <Input
                            required
                            fluid
                            placeholder='Group movie tickets'
                            value={newPurchaseInput.item}
                            onChange={handleNewPurchaseInputInputChange}
                            id='itemInput'
                            />
                        </div>

                        <div className="dTabNewPurchaseFormItem">
                            <label>Amount<span style={{color: 'red'}}>*</span></label>
                            <Input
                            required
                            type='number'
                            style={{maxWidth: '50%'}}
                            label='$' 
                            placeholder='34.51'
                            value={newPurchaseInput.amount}
                            onChange={handleNewPurchaseInputInputChange}
                            id='amountInput'
                            />
                        </div>

                        <div className="dTabNewPurchaseFormItem">
                            <label>Details</label>
                            <Input
                            fluid
                            placeholder='Bought 3 tickets for Joker at Cineplex'
                            value={newPurchaseInput.details}
                            onChange={handleNewPurchaseInputInputChange}
                            id='detailsInput'
                            />
                        </div>

                        <Button type='submit'>Add</Button>
                    </Form>
                </Modal.Content>
            </Modal>

            <div className="dTabTitleDiv">
                <p className="dTabTitleText">{tabDetails.name}</p>
                <p className="dTabTitleDescription">{tabDetails.description}</p>
            </div>

            <div className="dTabDetailsDiv">
                <Segment style={{minWidth: '100%', minHeight: '100%'}}>
                    <TabDetails data={tabDetails} feed={tabData} />
                </Segment>
            </div>

            <div className="dTabNewPurchaseDiv">
                <Button fluid size='huge' onClick={handleAddNewPurchaseClick}>Add New Purchase</Button>
            </div>

            <p className="dTabFeedLabel">Feed</p>
            <div className="dTabFeedDiv">
                <Segment style={{minWidth: '100%', minHeight: '100%'}}>
                    <TabFeed data={tabData} />
                </Segment>
            </div>

        </div>
    )
}

export default TabBody;