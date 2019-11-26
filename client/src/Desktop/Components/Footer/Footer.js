import React, {useState, useEffect} from 'react';
import './Footer.css';

const Footer = () => {

    const [mobileScreen, setMobileScreen] = useState((window.innerWidth < 600) ? true : false);

    useEffect(() => {
        function handleWindowResize () {
            if (mobileScreen) {
                if (window.innerWidth > 600) {
                    setMobileScreen(false);
                }
            }
            if (!mobileScreen) {
                if (window.innerWidth < 600) {
                    setMobileScreen(true);
                }  
            }
        }

        window.addEventListener('resize', handleWindowResize);
        return () => { window.removeEventListener('resize', handleWindowResize); }
    });

    return (
        <div className="dFooterChildDiv"
            style={{
                justifyContent: mobileScreen ? 'center' : 'flex-start'
            }}
        >
            <p className="dFooterItem">{`Privacy Policy`}</p>
            <p className="dFooterItem">{`Terms & Conditions`}</p>  
            <p className="dFooterItem">{`Contact Us`}</p> 
        </div>
    );
}

export default Footer;