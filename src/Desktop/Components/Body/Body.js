import React, {useState, useEffect} from 'react';
import './Body.css';
import Demo from '../../Assets/Body/FoldDemo.svg';

import {Input, Button} from 'semantic-ui-react';

const Body = () => {

    const [mobileScreen, setMobileScreen] = useState((window.innerWidth < 600) ? true : false);
    const [occasionInput, setOccasionInput] = useState('');

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

    const handleOccasionInputChange = (e) => {
        setOccasionInput(e.target.value);
    }

    const handleFoldCTAFormSubmit = (e) => {
        alert(occasionInput);

        e.preventDefault();
    }

    return (
        <div className="dBodyParentDiv">
            <div className="dBodyFold"
                style={{
                    gridTemplateColumns: mobileScreen ? '100%' : '60% 40%'
                }}
            >
                <div className="dBodyFoldCTA">
                    <h1 className="dBodyFoldText">Remove the awkwardness from asking your friends to pay you back</h1>
                    <form className="dBodyFoldCTAForm" onSubmit={handleFoldCTAFormSubmit}>
                        <div style={{width: '80%'}}>
                            <Input required size='large' placeholder='Friday night drinks...' fluid onChange={handleOccasionInputChange} />
                        </div>
                        <div style={{width: '80%', marginTop: '1em'}}>
                            <Button fluid size='large' type='submit' style={{}}>START A TAB</Button>
                        </div>
                    </form>
                    <p className="dBodyFoldQuestion">How does it work?</p>
                </div>
                <div className="dBodyFoldDemoDiv" 
                    style={{
                        display: mobileScreen ? 'none' : 'flex'
                    }}
                >
                    <img className="dBodyFoldDemo" src={Demo} alt="Split The Tab Demo" />
                </div>
            </div>
        </div>
    );
}

export default Body;