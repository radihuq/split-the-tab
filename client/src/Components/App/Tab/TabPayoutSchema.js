import React from 'react';

import TabPayoutSchemaPopulate from './TabPayoutSchemaPopulate';

import {Segment, List} from 'semantic-ui-react';

const TabPayoutSchema = ({masterfeed, totalexpensed}) => {

    let equalPercentage = 100 / masterfeed.length;

    for (let i=0, len = masterfeed.length; i < len; i++) {
        let plusMinus = (masterfeed[i].expensed - (totalexpensed * (equalPercentage / 100))).toFixed(2);
        masterfeed[i].plusminus = plusMinus;
    }

    let payoutSchema = calculatePayoutSchema(masterfeed);
    console.log(payoutSchema);

    function calculatePayoutSchema (feed) {

        let tmpMasterFeed = feed.sort((a, b) => b.plusminus - a.plusminus);
        let feedLedger = [];

        for (let i=0, len = tmpMasterFeed.length;  i < len; i++) {
            feedLedger.push({
                userid: tmpMasterFeed[i].userid,
                name: tmpMasterFeed[i].name,
                balance: Number(tmpMasterFeed[i].plusminus),
                transactions: []
            });

            console.log(`[${tmpMasterFeed[i].userid}] --- ${Number(tmpMasterFeed[i].plusminus)}`);
        }

        for (let i=0, len = feedLedger.length; i < len; i++) {

            if (feedLedger[i].balance > 0) {

                for (let j=i+1; j < feedLedger.length; j++) {
                    let a = feedLedger[i];
                    let b = feedLedger[j];
                    if (b.balance < 0) {
                        if ((a.balance + b.balance) > 0) {
                            a.transactions.push({
                                type: 'receive',
                                sender: b.userid,
                                senderName: b.name,
                                receipient: a.userid,
                                receipientName: a.name,
                                amount: Math.abs(Number(b.balance.toFixed(2)))
                            });
                            b.transactions.push({
                                type: 'give',
                                sender: b.userid,
                                senderName: b.name,
                                receipient: a.userid,
                                receipientName: a.name,
                                amount: Math.abs(Number(b.balance.toFixed(2)))
                            });
                            a.balance = Number((a.balance + b.balance).toFixed(2));
                            b.balance = 0;
                        } else if ((a.balance + b.balance) < 0) {
                            a.transactions.push({
                                type: 'receive',
                                sender: b.userid,
                                senderName: b.name,
                                receipient: a.userid,
                                receipientName: a.name,
                                amount: Math.abs(Number(a.balance.toFixed(2)))
                            });
                            b.transactions.push({
                                type: 'give',
                                sender: b.userid,
                                senderName: b.name,
                                receipient: a.userid,
                                receipientName: a.name,
                                amount: Math.abs(Number(a.balance.toFixed(2)))
                            });
                            b.balance = Number((a.balance + b.balance).toFixed(2));
                            a.balance = 0;
                        }
                    }
                }

            }
        }

        for (let i=0, len = tmpMasterFeed.length; i < len; i++) {
            tmpMasterFeed[i].balance = feedLedger[i].balance;
            tmpMasterFeed[i].transactions = feedLedger[i].transactions;
        }

        // return feedLedger;
        return tmpMasterFeed;
    }

    return (
        <Segment style={{margin: '1em 1em 0 0', minWidth: '40%'}}>
            <List relaxed='very'>
                {payoutSchema.map((user, index) => (
                    <TabPayoutSchemaPopulate user={user} key={`payoutuschema_${index}`} />
                ))}
            </List>
        </Segment> 
    );
}

export default TabPayoutSchema;