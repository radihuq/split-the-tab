import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './Body.css';
import Demo from '../../Assets/Body/FoldDemo.svg';

import {Input, Button} from 'semantic-ui-react';

const Body = () => {

    const [mobileScreen, setMobileScreen] = useState((window.innerWidth < 600) ? true : false);
    const [occasionPlaceholderText, setOccasionPlaceholderText] = useState((window.innerWidth < 900) ? 'Friday night drinks, New York trip...' : 'Friday night drinks, Vacation to New York, Business Trip...');
    const [occasionInput, setOccasionInput] = useState('');

    const history = useHistory();

    useEffect(() => {
        function handleWindowResize () {
            if (mobileScreen) {
                if (window.innerWidth > 600) {
                    setOccasionPlaceholderText('Friday night drinks, Vacation to New York, Business Trip...');
                    setMobileScreen(false);
                }
            }
            if (!mobileScreen) {
                if (window.innerWidth < 600) {
                    setOccasionPlaceholderText('Friday night drinks, New York trip...');
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
        sessionStorage.setItem('occasion', occasionInput);
        history.push(`/newtab`);
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
                            <Input required size='large' 
                            placeholder={occasionPlaceholderText} 
                            fluid 
                            onChange={handleOccasionInputChange} />
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