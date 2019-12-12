import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './Menu.css';

import MenuJoinTabModal from './MenuJoinTabModal';
import MenuProfileModal from './MenuProfileModal';

import {Icon, Button} from 'semantic-ui-react';

const Menu = () => {

    const [joinTabModalOpen, setJoinTabModalOpen] = useState(false);
    const [profileModalOpen, setProfileModalOpen] = useState(false);

    const history = useHistory();

    const handleMenuLogoClick = () => {
        history.push(`/`);
    }

    const handleJoinTabModalOpenChange = () => {
        setJoinTabModalOpen(!joinTabModalOpen);
    }

    const handleProfileModalOpenChange = () => {
        setProfileModalOpen(!profileModalOpen);
    }

    return (
        <div className="dMenuChildDiv">

            <MenuJoinTabModal modalopen={joinTabModalOpen} modalopenchange={handleJoinTabModalOpenChange} />
            <MenuProfileModal modalopen={profileModalOpen} modalopenchange={handleProfileModalOpenChange} />

            <div className="dMenuLogoDiv">
                <div className="dMenuLogoItemsDiv" onClick={handleMenuLogoClick}>
                    <Icon name='hand scissors' size='big' style={{ color: 'rgba(45, 52, 54, 1)'}} />
                    <p className="dMenuLogoText">Split The Tab</p>
                </div>
            </div>

            <div className="dMenuItemsDiv">
                <div className="dMenuButton">
                    <Button size='large' onClick={handleJoinTabModalOpenChange} compact>Join Tab</Button>
                    <Button size='large' onClick={handleProfileModalOpenChange} compact>Profile</Button>
                </div>
            </div>
        </div>
    );
}

export default Menu;