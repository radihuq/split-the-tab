import React from 'react';

import TabPayoutOverviewPopulate from './TabPayoutOverviewPopulate';

import {Segment, List} from 'semantic-ui-react';

const TabPayoutOverview = ({masterfeed, totalexpensed, showpayoutschema}) => {

    let equalPercentage = 100 / masterfeed.length;
    let sortedFeed = masterfeed.sort((a, b) => b.expensed - a.expensed);

    return (
        <Segment style={{margin: '1em 1em 0 0', minWidth: '40%'}}>
            <List relaxed='very'>
                {sortedFeed.map((user, index) => (
                    <TabPayoutOverviewPopulate key={`user_${index}`} user={user} totalexpensed={totalexpensed} equalpercentage={equalPercentage} />
                ))}
            </List>

            <p className="dTabPayoutSuggestedPayoutText" onClick={showpayoutschema}>See Suggested Payout Schema</p>
        </Segment>
    );
}

export default TabPayoutOverview;