import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './Tab.css';

import TabInviteModal from './TabInviteModal';
import TabPayout from './TabPayout';

import {Button, Statistic} from 'semantic-ui-react';

const TabDetails = ({data, feed}) => {

    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const [calculateLoading, setCalculateLoading] = useState(false);
    const [calculatePayout, setCaculatePayout] = useState(false);

    const history = useHistory();

    let totalExpense = 0;
    for (let i=0, len = feed.length; i < len; i++) {
        totalExpense += feed[i].amount;
    }

    totalExpense = (Math.round(totalExpense * 100) / 100).toFixed(2);

    const handleCalculatePayoutClick = () => {
        // setCalculateLoading(true);
        setCaculatePayout(!calculatePayout);
    }

    const handleCalculateLoading = () => {
        setCalculateLoading(false);
    }

    const handleInviteModalOpenChange = () => {
        setInviteModalOpen(!inviteModalOpen);
    }

    const handleInviteLinkClick = () => {
        setInviteModalOpen(!inviteModalOpen);
    }

    return (
        <div className="dTabDetailsDashboardDiv">
            <TabInviteModal modalopen={inviteModalOpen} modalopenchange={handleInviteModalOpenChange} public_id={data.info.public_id} />

            <Statistic size='small'>
                <Statistic.Value style={{fontFamily: 'Montserrat'}}>${totalExpense}</Statistic.Value>
                <Statistic.Label style={{fontFamily: 'Montserrat', fontWeight: '300'}}>Total Expensed</Statistic.Label>
            </Statistic>

            <div>
                <Button color='teal' onClick={handleCalculatePayoutClick} loading={calculateLoading}>View Payout</Button>
                <Button onClick={handleInviteLinkClick}>Get Invite Link</Button>
            </div>

            {calculatePayout ? <TabPayout feed={feed} totalexpensed={totalExpense} onloading={handleCalculateLoading} /> : null}

        </div>
    )
}

export default TabDetails;