import React from 'react';

import TabFeedPopulate from './TabFeedPopulate';

import {List} from 'semantic-ui-react';

const TabFeed = ({data}) => {
    
    return (
        <div>
            <List relaxed='very'>
                {data.feed.slice(0).reverse().map((item, index) => (
                    <TabFeedPopulate item={item} key={`feeditem${index}`} />
                ))}
            </List>
        </div>
    );
}

export default TabFeed;