import React, {useState} from 'react';

import {Image, List, Label} from 'semantic-ui-react';

const TabPayoutSchemaPopulate = ({user}) => {

    console.log(user);

    return (
        <List.Item>
            <Image avatar src={user.avatar} />
            <List.Content>
                <List.Header>{`${user.name} [Expensed $${user.expensed.toFixed(2)}]`}</List.Header>
                <List.Description>
                    <List style={{padding: '0.25em 0'}}>
                        {user.transactions.map((transaction, index) => (
                            (transaction.type === 'give') ? 
                            <List.Item key={`transaction_${index}`}>
                                <List.Description>
                                    <span className="dTabPayoutSchemaPopulateGive">
                                        {`Give $${transaction.amount.toFixed(2)} to ${transaction.receipientName}`}
                                    </span>
                                </List.Description>
                            </List.Item>
                            :
                            <List.Item key={`transaction_${index}`}>
                                <List.Description>
                                    <span className="dTabPayoutSchemaPopulateReceive">
                                        {`Receive $${transaction.amount.toFixed(2)} from ${transaction.senderName}`}
                                    </span>
                                </List.Description>
                            </List.Item>
                        ))}
                    </List>
                </List.Description>
            </List.Content>
        </List.Item>
    );

}

export default TabPayoutSchemaPopulate;