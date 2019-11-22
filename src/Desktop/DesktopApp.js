import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './DesktopApp.css';

import Menu from './Components/Menu/Menu';
import Body from './Components/Body/Body';
import Footer from './Components/Footer/Footer';
import NewTab from './Components/App/NewTab/NewTab';
import Tab from './Components/App/Tab/Tab';
import Invite from './Components/App/Invite/Invite';

const DesktopApp = () => {

    return (
        <Router>
            <div className='dParentDiv'>
                <div className="dMenuParentDiv">
                    <Menu />
                </div>

                <div className="dBodyParentDiv">
                    <Switch>
                        <Route path="/newtab" exact component={NewTab} />
                        <Route path="/tab" exact component={Tab} />
                        <Route path="/invite" exact component={Invite} />
                        <Route path="/" component={Body} />
                    </Switch>

                </div>

                <div className="dFooterParentDiv">
                    <Footer />
                </div>
            </div>
        </Router>
    );
}

export default DesktopApp;