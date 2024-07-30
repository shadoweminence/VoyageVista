import react from "react";
import statusContext from "./statusContext";

const StatusState =(props)=>{
const state ={
    "name":"Prashant",
    "class":"5b"
}

return(
    <statusContext.provider value={state}>
        {props.children}
    </statusContext.provider>
)
}


export default StatusState;