import React, {} from 'react';
import './cssreset.css';
import './App.css';

import DesktopApp from './Desktop/DesktopApp';

import 'semantic-ui-css/semantic.min.css';

const App = () => {

    // useEffect(() => {
    //     function handleWindowResize () {
    //         if (window.innerWidth < 600) {
                
    //         }
    //     }

    //     window.addEventListener('resize', handleWindowResize);
    //     return () => { window.removeEventListener('resize', handleWindowResize); }
    // });

    return (
        <div className="App">
            <DesktopApp />
        </div>
    );
}

export default App;