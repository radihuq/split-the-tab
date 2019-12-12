import React from 'react';

import {Image, List, Label} from 'semantic-ui-react';

const TabPayoutPopulate = ({user, totalexpensed, equalpercentage}) => {

    let percentOfTotalExpensed = ((user.expensed / totalexpensed) * 100).toFixed(2);

    return (
        <List.Item>
            <Image avatar src={user.avatar} />
            <List.Content>
                    <List.Header>{user.name}</List.Header>
                    <List.Description>
                        <div className="dTabPayoutPopulateItemDiv">
                            <p className="dTabPayoutPopulateItem">Total Expensed: ${user.expensed.toFixed(2)} ({percentOfTotalExpensed}%)</p>
                        </div>
                    </List.Description>
            </List.Content>
        </List.Item>

    );
}

export default TabPayoutPopulate;