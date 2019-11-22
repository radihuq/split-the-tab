import React from 'react';
import './Tab.css';

import {Image, List, Label} from 'semantic-ui-react';

const TabFeedPopulate = ({item}) => {

    return (
        <List.Item>
            <Label style={{marginRight: '1em'}}>
                ${Math.round(item.amount * 100) / 100}
            </Label>
            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
            <List.Content>
                <List.Header>{item.time}</List.Header>
                <List.Description>
                    <span className="dTabFeedPopulateStrong">{item.name} </span>
                    purchased {item.item}. 
                     Details: {item.details}
                </List.Description>
            </List.Content>
        </List.Item>
    );
}

export default TabFeedPopulate;