import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import {Modal, Input, Icon, Segment, Form, Button} from 'semantic-ui-react';

const MenuProfileModal = ({modalopen, modalopenchange}) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [avatarsSelection, setAvatarsSelection] = useState([
        {id: 0, img: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg', active: false},
        {id: 1, img: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg', active: false},
        {id: 2, img: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg', active: false},
        {id: 3, img: 'https://react.semantic-ui.com/images/avatar/small/justen.jpg', active: false},
        {id: 4, img: 'https://react.semantic-ui.com/images/avatar/small/laura.jpg', active: false},
        {id: 5, img: 'https://react.semantic-ui.com/images/avatar/small/helen.jpg', active: false}
    ]);
    const [prevLocalStorage, setPrevLocalStorage] = useState('');
    const [userProfile, setUserProfile] = useState({name: '', avatar: ''});
    const [instructionsText, setInstructionsText] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);
    
    const history = useHistory();

    useEffect(() => {
        setModalOpen(modalopen);
    });

    if (localStorage.getItem('tabsProfile')) {
        if (localStorage.getItem('tabsProfile') !== prevLocalStorage) {
            setPrevLocalStorage(localStorage.getItem('tabsProfile'));
            let profile = JSON.parse(localStorage.getItem('tabsProfile'));

            if (!profile.name) {
                return;
            } else if (!profile.avatar) {
                return;
            } else {
                setUserProfile({...userProfile, 
                    name: profile.name,
                    avatar: profile.avatar
                });

                let newActiveAvatarState = avatarsSelection;
                newActiveAvatarState.map((el) => {
                    return (el.img === profile.avatar) ? el.active = true : el.active = false
                });
                setAvatarsSelection(newActiveAvatarState);
            }
        }
    }

    const handleModalClose = () => {
        setInstructionsText('');
        modalopenchange();
    }

    const handleUserProfileInputInputChange = (e) => {
        let input = e.target.value;
        let inputType = e.target.id;

        switch (inputType) {
            case 'nameInput':
                setUserProfile({...userProfile, name: input});
                break;
            default:
                break;
        }
    }

    const handleAvatarSelectionClick = (e) => {
        setUserProfile({...userProfile, avatar: e.target.getAttribute('src')});
        
        let newActiveAvatarState = avatarsSelection;
        newActiveAvatarState.map((el) => {
            return (el.id === Number(e.target.id)) ? el.active = true : el.active = false
        });
        setAvatarsSelection(newActiveAvatarState);
    }

    const handleProfileUpdateSubmit = (e) => {
        setButtonLoading(true);

        let profile = {
            name: userProfile.name,
            avatar: userProfile.avatar
        }

        localStorage.setItem('tabsProfile', JSON.stringify(profile));

        setButtonLoading(false);
        setInstructionsText('Saved!');
        e.preventDefault();
    }

    return (
        <Modal size='large' open={modalOpen} onClose={handleModalClose} closeIcon centered={false}>
            <Modal.Header>Edit Your Profile</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleProfileUpdateSubmit}>
                    <div className="dMenuProfileUpdateFormItem" style={{marginTop: 0}}>
                        <label>Your Name</label>
                        <Input
                        fluid
                        placeholder='Richard Hendricks'
                        value={userProfile.name}
                        onChange={handleUserProfileInputInputChange}
                        id='nameInput'
                        />
                    </div>

                    <div className="dMenuProfileUpdateFormItem">
                        <label>Select Avatar</label>
                        <div className="dMenuProfileAvatarsSelectionDiv">
                            {avatarsSelection.map((avatar, index) => (
                                <img 
                                key={`avatar_${index}`}
                                src={avatar.img} 
                                id={avatar.id} 
                                className={avatar.active ? "dMenuProfileAvatarItem dMenuProfileAvatarItemActive" : "dMenuProfileAvatarItem"}
                                onClick={handleAvatarSelectionClick}
                                />
                            ))}
                        </div>
                    </div>

                    <p className="dMenuProfileUpdateInstructionsText">{instructionsText}</p>
                    <Button type='submit' loading={buttonLoading} disabled={buttonLoading} >Save</Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default MenuProfileModal;