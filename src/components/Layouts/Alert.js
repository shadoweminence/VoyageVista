import React ,{useContext} from 'react'
import AlertContext from '../../context/Alert/alertContext';



const Alert = () => {
  const {alert} = useContext(AlertContext);

  return (
    <div style={{ height: "50px" }}>
      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
          {alert.msg}
        </div>
      )}
    </div>
  );
};

export default Alert;