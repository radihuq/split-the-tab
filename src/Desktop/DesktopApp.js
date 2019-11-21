import React from 'react';
import './DesktopApp.css';

import Menu from './Components/Menu/Menu';
import Body from './Components/Body/Body';
import Footer from './Components/Footer/Footer';

const DesktopApp = () => {

    return (
        <div className='dParentDiv'>
            <div className="dMenuParentDiv">
                <Menu />
            </div>

            <div className="dBodyParentDiv">
                <Body />
            </div>

            <div className="dFooterParentDiv">
                <Footer />
            </div>
        </div>
    );
}

export default DesktopApp;