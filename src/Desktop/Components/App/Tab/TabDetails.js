import React from 'react';
import {useHistory} from 'react-router-dom';
import './Tab.css';

import {Button, Statistic} from 'semantic-ui-react';

const TabDetails = ({data, feed}) => {

    const history = useHistory();

    let totalExpense = 0;
    for (let i=0, len = feed.length; i < len; i++) {
        totalExpense += feed[i].amount;
    }

    totalExpense = Math.round(totalExpense * 100) / 100;

    const handleCalculatePayoutClick = () => {
        history.push(`/tab/payout?id=${data.id}`);
    }

    const handleInviteLinkClick = () => {
        history.push(`/invite?id=${data.id}`);
    }

    return (
        <div className="dTabDetailsDashboardDiv">
            <div>
                <Button color='teal' onClick={handleCalculatePayoutClick}>Calculate Payout</Button>
                <Button onClick={handleInviteLinkClick}>Get Invite Link</Button>
            </div>
            
            <Statistic size='small'>
                <Statistic.Value style={{fontFamily: 'Montserrat'}}>${totalExpense}</Statistic.Value>
                <Statistic.Label style={{fontFamily: 'Montserrat', fontWeight: '300'}}>Total Expensed</Statistic.Label>
            </Statistic>

        </div>
    )
}

export default TabDetails;