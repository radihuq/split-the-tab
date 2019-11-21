import React from 'react';
import './Menu.css';

import {Icon, Button} from 'semantic-ui-react';

const Menu = () => {

    return (
        <div className="dMenuChildDiv">
            <div className="dMenuLogoDiv">
                <div className="dMenuLogoItemsDiv">
                    <Icon name='hand scissors' size='big' style={{ color: 'rgba(45, 52, 54, 1)'}} />
                    <p className="dMenuLogoText">Split The Tab</p>
                </div>
            </div>

            <div className="dMenuItemsDiv">
                <div className="dMenuButton">
                    <Button size='large' compact>Join Tab</Button>
                </div>
            </div>
        </div>
    );
}

export default Menu;