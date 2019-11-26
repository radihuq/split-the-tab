import React from 'react';
import {useHistory} from 'react-router-dom';
import './Invite.css';

import {Segment} from 'semantic-ui-react';

const QRCode = require('qrcode.react');
const qs = require('query-string');

const Invite = () => {

    const history = useHistory();

    if (!history.location.search) {
        history.push(`/`);
    }

    let query = qs.parse(history.location.search);

    if (!query.id) {
        history.push(`/`);
    }

    return (
        <div className="dInviteParentDiv">

            <p className="dInviteText">Share this code</p>
            <Segment style={{width: '40%'}}>
                <p className="dInviteText" style={{fontWeight: 600}}>{query.id}</p>
            </Segment>
            <p className="dInviteText">or show this QR code</p>
            <QRCode
            value={query.id}
            size={200}
            />
        </div>
    );
}

export default Invite;