import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './Payout.css';

import PayoutPopulate from './PayoutPopulate';

import {Segment, Button, Input} from 'semantic-ui-react';

const qs = require('query-string');

const Payout = () => {

    const [initialized, setInitialized] = useState(false);
    const [tabDetails, setTabDetails] = useState(JSON.parse(localStorage.getItem('tabDetails')));

    const history = useHistory();

    if (!history.location.search) {
        history.push(`/`);
    }

    let query = qs.parse(history.location.search);

    if (!query.id) {
        history.push(`/`);
    }

    if (!initialized) {
        let newTabDetails = tabDetails;
        for (let i=0, len = newTabDetails.users.length; i < len; i++) {
            newTabDetails.users[i].percentage = 50;
        }
        setTabDetails(newTabDetails);
        setInitialized(true);
    }

    const handleSplitEquallyClick = (e) => {
        let newTabDetails = tabDetails;
        for (let i=0, len = newTabDetails.users.length; i < len; i++) {
            newTabDetails.users[i].percentage = 100 / len;
        }
        setTabDetails(newTabDetails);
    }

    console.log(tabDetails);
    return (
        <div className="dPayoutParentDiv">
            <div className="dPayoutTitleDiv">
                <p className="dPayoutTitleText">{tabDetails.name}</p>
                <p className="dPayoutTitleDescription">{tabDetails.description}</p>
            </div>

            <div className="dPayoutDetailsDiv">
                <Segment style={{height: '100%', width: '100%'}}>
                    <p>This is payout. ID: {query.id}</p>
                    <p className="dPayoutSplitEquallyButton" onClick={handleSplitEquallyClick}>Split tab equally</p>
                    
                    {tabDetails.users.map((user, index) => (
                        // <PayoutPopulate user={user} key={`user_${index}`} />
                        <div className="dPayoutPopulateDiv" key={`user_${index}`}>
                            <p style={{margin: 0}}>{user.name}</p>
                            <Input 
                            type='number'

                            label='%' 
                            labelPosition='right'
                            placeholder='10'
                            value={user.percentage}
                            />
                        </div>
                    ))}

                    {/* {initialized ? 
                    tabDetails.users.map((user, index) => (
                        // <PayoutPopulate user={user} key={`user_${index}`} />
                        <div className="dPayoutPopulateDiv" key={`user_${index}`}>
                            <Input 
                            type='number'
                            style={{maxWidth: '50%'}}
                            label='%' 
                            labelPosition='right'
                            placeholder='10'
                            value={user.percentage}
                            />
                            <p>{user.name}</p>
                            <p>{user.percentage}</p>
                        </div>
                    )) 
                    : null} */}
                </Segment>
            </div>
        </div>
    );
}

export default Payout;