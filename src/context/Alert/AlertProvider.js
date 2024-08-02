import React, {useState} from "react";
import AlertContext from "./alertContext";



const AlertProvider = ({children})=>{
    const [alert, setAlert] = useState(null);


   const showAlert = (msg,type)=>{
    setAlert({msg,type});
    setTimeout(()=>{
        setAlert(null);
    },3000);
   };

return(
    <AlertContext.Provider value={{alert,showAlert}} >
        {children}
    </AlertContext.Provider>
)
}
export default AlertProvider;