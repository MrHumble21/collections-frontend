import React from 'react';
import {Toggle} from "react-hook-theme";
import NavBar from "../../components/navbar/NavBar";

const Settings = () => {
    return (
       <>
           <NavBar />
           <div className={'container d-flex flex-column  justify-content-center align-items-start my-5 py-5'}>
               <div className="d-flex justify-content-center align-items-center">
                   <h1 className={'mx-2'}>Theme:</h1><Toggle/>
               </div>
               <div className="d-flex justify-content-center align-items-center">

                   <h1 className={'mx-2'}>Language:</h1>
                   <div id="google_translate_element"></div>
               </div>

           </div>
       </>
    );
};

export default Settings
