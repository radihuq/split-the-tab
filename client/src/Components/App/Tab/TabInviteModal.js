import React, {useState, useEffect} from 'react';

import {Modal, Segment} from 'semantic-ui-react';

const QRCode = require('qrcode.react');
const qs = require('query-string');

const TabInviteModal = ({modalopen, modalopenchange, public_id}) => {

    const [modalOpen, setModalOpen] = useState(false);
    
    useEffect(() => {
        setModalOpen(modalopen);
    });

    const handleModalClose = () => {
        modalopenchange();
    }

    return (
        <Modal size='small' open={modalOpen} onClose={handleModalClose} closeIcon>
            <Modal.Header>Invite Your Group</Modal.Header>
            <Modal.Content>
                <div className="dTabInviteDiv">
                    <p className="dTabInviteText">Share this code</p>
                    <Segment style={{width: '40%'}}>
                        <p className="dTabInviteText" style={{fontWeight: 600}}>{public_id}</p>
                    </Segment>
                    <p className="dTabInviteText">or show this QR code</p>
                    <QRCode
                    value={public_id}
                    size={200}
                    style={{margin: '1em'}}
                    />
                </div>
            </Modal.Content>
        </Modal>
    )
}

export default TabInviteModal;