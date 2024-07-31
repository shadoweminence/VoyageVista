import React from "react";
import {Helmet} from "react-helmet";
import Status from "../Layouts/Status";




export default function Profile() {
  
  
  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Profile- Voyage Vista</title>
              
            </Helmet>
    <div>
       
      <Status/>
    </div>
    </>
  )
}
