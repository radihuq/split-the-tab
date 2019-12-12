import React, {useState, useContext} from 'react';

import {CTX} from '../../../Context/TabData';
import TabInviteModal from './TabInviteModal';
import TabNewPurchaseModal from './TabNewPurchaseModal';
import TabDetails from './TabDetails';
import TabFeed from './TabFeed';

import {Segment, Button, Modal, Form, Input} from 'semantic-ui-react';

const TabBody = () => {

    const {tabDetails} = useContext(CTX);
    const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);

    const handleAddNewPurchaseClick = (e) => {
        setPurchaseModalOpen(!purchaseModalOpen);
    }

    const handlePurchaseModalOpenChange = () => {
        setPurchaseModalOpen(!purchaseModalOpen);
    }

    console.log(tabDetails);

    return (
        <div className="dTabBodyDiv">
            <TabNewPurchaseModal modalopen={purchaseModalOpen} modalopenchange={handlePurchaseModalOpenChange} id={tabDetails.id} />

            <div className="dTabTitleDiv">
                <p className="dTabTitleText">{tabDetails.data.info.name}</p>
                <p className="dTabTitleDescription">{tabDetails.data.info.description}</p>
            </div>

            <div className="dTabDetailsDiv">
                <Segment style={{minWidth: '100%', minHeight: '100%'}}>
                    <TabDetails data={tabDetails.data} feed={tabDetails.data.feed} />
                </Segment>
            </div>

            <div className="dTabNewPurchaseDiv">
                <Button fluid size='huge' onClick={handleAddNewPurchaseClick}>Add New Purchase</Button>
            </div>

            <p className="dTabFeedLabel">Feed</p>
            <div className="dTabFeedDiv">
                <Segment style={{minWidth: '100%', minHeight: '100%'}}>
                    <TabFeed data={tabDetails.data} />
                </Segment>
            </div>

        </div>
    )
}

export default TabBody;