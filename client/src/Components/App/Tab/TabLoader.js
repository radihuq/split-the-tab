import React from 'react';

import {Dimmer, Loader} from 'semantic-ui-react';

const TabLoader = () => {

    return (
        <Dimmer active inverted style={{fontFamily: 'Montserrat, sans-serif'}}>
            <Loader inverted>Loading Tab...</Loader>
        </Dimmer>
    );
}

export default TabLoader;