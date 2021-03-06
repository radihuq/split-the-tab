import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './cssreset.css';
import './App.css';

import Menu from './Components/Menu/Menu';
import Body from './Components/Body/Body';
import Footer from './Components/Footer/Footer';
import NewTab from './Components/App/NewTab/NewTab';
import Tab from './Components/App/Tab/Tab';
import Payout from './Components/App/Payout/Payout';

import 'semantic-ui-css/semantic.min.css';

const DesktopApp = () => {

    if (!localStorage.getItem('tabsUserID')) {
        let userId = Math.random().toString(36).substr(2, 6);
        localStorage.setItem('tabsUserID', userId);
    }

    return (
        <div className="App">
            <Router>
                <div className='dParentDiv'>
                    <div className="dMenuParentDiv">
                        <Menu />
                    </div>

                    <div className="dBodyParentDiv">
                        <Switch>
                            <Route path="/newtab" exact component={NewTab} />
                            <Route path="/tab" exact component={Tab} />
                            <Route path="/tab/payout" exact component={Payout} />
                            <Route path="/" component={Body} />
                        </Switch>

                    </div>

                    <div className="dFooterParentDiv">
                        <Footer />
                    </div>
                </div>
            </Router>
        </div>
    );
}

export default DesktopApp;