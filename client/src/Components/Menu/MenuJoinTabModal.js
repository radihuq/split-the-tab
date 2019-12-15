import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import {Modal, Input, Icon, Segment} from 'semantic-ui-react';

const MenuJoinTabModal = ({modalopen, modalopenchange}) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [codeInput, setCodeInput] = useState('');
    const [codeInputDisabled, setCodeInputDisabled] = useState(false);
    const [codeIconLoading, setCodeIconLoading] = useState(false);
    const [instructionsText, setInstructionsText] = useState('');
    
    const history = useHistory();

    useEffect(() => {
        setModalOpen(modalopen);
    });

    let recentTabs;
    if (localStorage.getItem('tabs')) {
        recentTabs = JSON.parse(localStorage.getItem('tabs'));
    } else {
        recentTabs = [];
    }

    const handleCodeInputChange = (e) => {
        setCodeInput(e.target.value);
    }

    const handleCodeInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            joinTab();
        }
    }

    const handleCodeInputIconClick = () => {
        joinTab();
    }

    const handleModalClose = () => {
        modalopenchange();
    }

    function joinTab() {
        setCodeInputDisabled(true);
        setCodeIconLoading(true);
        setInstructionsText('');

        console.log(`code input: ${codeInput}`);

        const data = {
            code: codeInput
        }

        axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/tab/join`, data)
        .then((res) => {
            if (res.status === 201) {
                setCodeIconLoading(false);
                setCodeInputDisabled(false);
                setInstructionsText('No tab found with that code! Please try again.');
                return;
            }

            if (res.status === 200) {
                setCodeIconLoading(false);
                setCodeInputDisabled(false);
                modalopenchange();
                setCodeInput('');
                history.push(`/tab?id=${res.data.response.id}`);    
            }
        })
        .catch((err) => {
            console.log(err);
            setInstructionsText('There was an error - please try again.');
            setCodeIconLoading(false);
            setCodeInputDisabled(false);
        })
    }

    const handleRecentTabItemClick = (e) => {
        setCodeInput(e.target.id);
    }

    return (
        <Modal size='large' open={modalOpen} onClose={handleModalClose} closeIcon centered={false}>
            <Modal.Header>Join A Tab</Modal.Header>
            <Modal.Content>
                <div className="dMenuJoinTabParentDiv">
                    <p className="dMenuJoinTabText">Enter The Tab's Code</p>

                    <p className="dMenuJoinTabInstructions">{instructionsText}</p>

                    <Input
                    size='huge'
                    icon
                    disabled={codeInputDisabled}
                    loading={codeIconLoading}
                    placeholder='Enter 6 digit code'
                    style={{width: '80%'}}
                    fluid
                    maxLength="6"
                    onChange={handleCodeInputChange}
                    onKeyDown={handleCodeInputKeyDown}
                    value={codeInput}
                    >
                        <input />
                        <Icon name='search' link={true} onClick={handleCodeInputIconClick} />
                    </Input>

                    <p className="dMenuJoinTabRecentTabsText">Recent Tabs</p>

                    <Segment style={{margin: 0, width: '80%'}}>
                        {recentTabs.map((tab, index) => (
                            <p 
                            key={`tab_${index}`} 
                            id={tab.public_id} 
                            className="dMenuJoinTabRecentTabsItem"
                            onClick={handleRecentTabItemClick}
                            >{tab.title}</p>
                        ))}
                    </Segment>

                </div>
            </Modal.Content>
        </Modal>
    )
}

export default MenuJoinTabModal;