import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';

import {CTX} from '../../../Context/TabData';

import {Button, Modal, Form, Input} from 'semantic-ui-react';

const TabNewPurchaseModal = ({modalopen, modalopenchange, id}) => {

    const {updateFeed} = useContext(CTX);
    const [newPurchaseInput, setNewPurchaseInput] = useState({item: '', amount: '', details: ''});
    const [modalOpen, setModalOpen] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    
    useEffect(() => {
        setModalOpen(modalopen);
    });

    const handleModalClose = () => {
        modalopenchange();
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
        setButtonLoading(true);

        let profile = {
            name: 'Anonymous',
            avatar: 'http://www.styletextile.com/wp-content/uploads/2017/10/profile.jpg'
        }

        if (localStorage.getItem('tabsProfile')) {
            let parsedProfile = JSON.parse(localStorage.getItem('tabsProfile'));

            if (parsedProfile.name) {
                profile.name = parsedProfile.name;
            }

            if (parsedProfile.avatar) {
                profile.avatar = parsedProfile.avatar;
            }
        }

        let newPurchase = newPurchaseInput;
        newPurchase.id = id;
        newPurchase.amount = Math.round(newPurchase.amount * 100) / 100; 
        newPurchase.userId = localStorage.getItem('tabsUserID');
        newPurchase.name = profile.name;
        newPurchase.avatar = profile.avatar;
        newPurchase.action = 'purchase';
        newPurchase.time = '8:01PM - 11/30/2019';

        axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/tab/purchase`, newPurchase)
        .then((res) => {
            console.log(res);
            updateFeed(newPurchase);
            modalopenchange();
            setButtonLoading(false);
            setNewPurchaseInput({item: '', amount: '', details: ''});
        })
        .catch((err) => {
            console.log(err);
            alert('There was an error! Please try again.');
            setButtonLoading(false);
        });

        e.preventDefault();
    }

    return (
        <Modal size='small' open={modalOpen} onClose={handleModalClose} closeIcon centered={false}>
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

                    <Button loading={buttonLoading} disabled={buttonLoading} type='submit'>Add</Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default TabNewPurchaseModal;