import { useState } from "react";
import StatusContext from "./statusContext";

const StatusState =(props)=>{

    const statusInitial =[
        {
          "_id": "66a751deb5253be94e76b407",
          "user": "66a746854bf2b7451df14d0b",
          "title": "heheh",
          "description": "jsut a try one",
          "tag": "General",
          "date": "2024-07-29T08:25:02.105Z",
          "__v": 0
        },
        
            {
              "_id": "66a751deb5253be94e76b407",
              "user": "66a746854bf2b7451df14d0b",
              "title": "heheh",
              "description": "jsut a try one",
              "tag": "General",
              "date": "2024-07-29T08:25:02.105Z",
              "__v": 0
            }
          
      ]
      const[status, setStatus] = useState(statusInitial)

    return(
        <StatusContext.Provider value={{status,setStatus}}>
            {props.children}
        </StatusContext.Provider>
    )
}

export default StatusState;