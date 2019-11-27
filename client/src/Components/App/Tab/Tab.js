import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import TabData from '../../../Context/TabData';
import './Tab.css';

import {Segment, Button, Modal, Form, Input} from 'semantic-ui-react';

import TabBody from './TabBody';

const qs = require('query-string');

const Tab = () => {

    const [feed, setFeed] = useState([
        {user: '1ni31', name: 'Radi', action: 'purchase', amount: 131.35, item: 'hotdog', details: 'was very hungry', time: '3:07PM - 11/28/2019'},
        {user: '1ni31', name: 'Radi', action: 'purchase', amount: 131.35, item: 'hotdog', details: 'was very hungry', time: '3:07PM - 11/28/2019'},
        {user: '1ni31', name: 'Radi', action: 'purchase', amount: 131.35, item: 'hotdog', details: 'was very hungry', time: '3:07PM - 11/28/2019'},
        {user: '1ni31', name: 'Radi', action: 'purchase', amount: 131.35, item: 'hotdog', details: 'was very hungry', time: '3:07PM - 11/28/2019'},
        {user: '1ni31', name: 'Radi', action: 'purchase', amount: 131.35, item: 'hotdog', details: 'was very hungry', time: '3:07PM - 11/28/2019'},
        {user: '1ni31', name: 'Radi', action: 'purchase', amount: 131.35, item: 'hotdog', details: 'was very hungry', time: '3:07PM - 11/28/2019'},
        {user: '1ni31', name: 'Radi', action: 'purchase', amount: 131.35, item: 'hotdog', details: 'was very hungry', time: '3:07PM - 11/28/2019'},
        {user: '1ni31', name: 'Radi', action: 'purchase', amount: 131.35, item: 'hotdog', details: 'was very hungry', time: '3:07PM - 11/28/2019'},
        {user: '1ni31', name: 'Radi', action: 'purchase', amount: 131.35, item: 'hotdog', details: 'was very hungry', time: '3:07PM - 11/28/2019'},
    ]);

    const history = useHistory();

    if (!history.location.search) {
        history.push(`/`);
    }

    let query = qs.parse(history.location.search);
    
    if (!query.id) {
        history.push(`/`);
    }

    return (
        <div className="dTabParentDiv">
            <TabData tabdata={feed}>
                <TabBody />
            </TabData>
        </div>
    );
}

export default Tab;