// Settings.js
import React, { useContext } from 'react';
import {Helmet} from "react-helmet";


const Settings = () => {

  return (
    <div>
 <Helmet>
                <meta charSet="utf-8" />
                <title>Settings- Voyage Vista</title>
              
            </Helmet>

      <ul>
        <li>User Details</li>
        <li>Password and Security</li>
      </ul>
     
    </div>
  );
};

export default Settings;