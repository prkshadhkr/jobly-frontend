import React from 'react';

const Alert = ({type, msgs})=>{
  return(
    <div className={`alert alert-${type}`} role="alert">
        {msgs.map(e => (
          <p className="mb-0 small" key={e}>
              {e}
          </p>))
        }
    </div>
  );
}

Alert.defaultProps = {
  type: "danger",
  msgs: []
}

export default Alert;