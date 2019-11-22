import React from 'react';
import {useHistory} from 'react-router-dom';
import './Menu.css';

import {Icon, Button} from 'semantic-ui-react';

const Menu = () => {

    const history = useHistory();

    const handleMenuLogoClick = () => {
        history.push(`/`);
    }

    return (
        <div className="dMenuChildDiv">
            <div className="dMenuLogoDiv">
                <div className="dMenuLogoItemsDiv" onClick={handleMenuLogoClick}>
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