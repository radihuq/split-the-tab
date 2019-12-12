import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import TabData from '../../../Context/TabData';
import './Tab.css';

import {Dimmer, Loader, Segment, Button, Modal, Form, Input} from 'semantic-ui-react';

import TabBody from './TabBody';
import TabLoader from './TabLoader';

const qs = require('query-string');

const Tab = () => {

    const [initialized, setInitialized] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [tabDetails, setTabDetails] = useState({});
    const [id, setId] = useState('');

    const history = useHistory();

    if (!history.location.search) {
        history.push(`/`);
    }

    let query = qs.parse(history.location.search);
    
    if (!query.id) {
        history.push(`/`);
    }

    if (id !== '') {
        if (id !== query.id) {
            setId(query.id);
            setDataLoading(false);
            setInitialized(false);
        }
    }

    if (!initialized) {

        if (!dataLoading) {
            setDataLoading(true);

            const data = {
                id: query.id
            }
    
            axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/tab/load`, data)
            .then((res) => {
                setTabDetails(res.data.response);
                setId(query.id);
                setInitialized(true);

                if (localStorage.getItem('tabs')) {
                    let tabs = JSON.parse(localStorage.getItem('tabs'));    

                    let containsTab = tabs.some((e) => {
                        return e.public_id === res.data.response.data.info.public_id
                    });

                    if (!containsTab) {
                        tabs.push(res.data.response.data.info);
                        localStorage.setItem('tabs', JSON.stringify(tabs));
                    }

                } else {
                    let tabInfo = res.data.response.data.info;
                    let tabs = [];
                    tabs.push(tabInfo);
                    localStorage.setItem('tabs', JSON.stringify(tabs));
                }
    
            })
            .catch((err) => {
                console.log(err);
                setInitialized(true);
            })
        }
    }


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

    return (
        <div className="dTabParentDiv">
            {!initialized ? <TabLoader style={{width: '100%', height: '100%'}}/> :
                <TabData tabdata={tabDetails}>
                    <TabBody />
                </TabData>
            }
        </div>
    );
}

export default Tab;