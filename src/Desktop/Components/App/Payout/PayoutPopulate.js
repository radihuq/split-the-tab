import React from 'react';
import './Payout.css';

import {Input} from 'semantic-ui-react';

const PayoutPopulate = ({user}) => {

    return (
        <div className="dPayoutPopulateDiv">
            <Input 
            type='number'
            style={{maxWidth: '50%'}}
            label='%' 
            labelPosition='right'
            placeholder='25%'
            />
            <p>{user.name}</p>
        </div>
    );
}

export default PayoutPopulate;