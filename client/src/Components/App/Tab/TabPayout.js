import React, {useState, useEffect} from 'react';

import TabPayoutOverview from './TabPayoutOverview';
import TabPayoutSchema from './TabPayoutSchema';

const TabPayout = ({feed, totalexpensed, onloading}) => {

    const [initialized, setInitialized] = useState(false);
    const [prevFeed, setPrevFeed] = useState([]);
    const [masterFeed, setMasterFeed] = useState([]);
    const [showPayoutSchema, setShowPayoutSchema] = useState(false);

    if (feed !== prevFeed) {
        setPrevFeed(feed);
        setInitialized(false);
    }

    if (!initialized) {
        let tmpMasterFeed = [];
        let prevSearch = [];

        for (let i=0, len = feed.length; i < len; i++) {
            if (!prevSearch.includes(feed[i].userId)) {
                let userId = feed[i].userId;
                let data = [];

                for (let j=i, jlen = feed.length; j < jlen; j++) {
                    if (feed[j].userId === userId) {
                        data.push(feed[j]);
                    }
                }

                let expensed = 0;
                for (let k=0, klen = data.length; k < klen; k++) {
                    expensed += data[k].amount;
                }

                let name = data[data.length - 1].name;
                let avatar = data[data.length - 1].avatar;

                let obj = {
                    userid: userId,
                    name: name,
                    avatar: avatar,
                    data: data,
                    expensed: expensed,
                    percentage: 0
                }

                prevSearch.push(userId);
                tmpMasterFeed.push(obj);
            } else {
                continue;
            }
        }

        setMasterFeed(tmpMasterFeed);
        setInitialized(true);
        onloading();
    }


    const handleShowPayoutSchemaClick = () => {
        setShowPayoutSchema(!showPayoutSchema);
    }

    return (
        <div className="dTabPayoutParentDiv">

            <TabPayoutOverview masterfeed={masterFeed} totalexpensed={totalexpensed} showpayoutschema={handleShowPayoutSchemaClick} />

            {showPayoutSchema ? 
                <TabPayoutSchema masterfeed={masterFeed} totalexpensed={totalexpensed} />
            : null}


        </div>
    );
}

export default TabPayout;