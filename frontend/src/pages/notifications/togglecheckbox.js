// import React from 'react'
// import './notifications.css'

// const togglecheckbox = ({ isOn, handleToggle, onColor }) => {
//   return (
//     <div className="container">
//         {/* <input
//         checked={isOn}
//         onChange={handleToggle}
//         className="react-switch-checkbox"
//         id={`react-switch-new`}
//         type="checkbox"
//       />
//       <label
//         style={{ background: isOn && onColor }}
//         className="react-switch-label"
//         htmlFor={`react-switch-new`}
//       >
//         <span className={`react-switch-button`} />
//       </label> */}
//     </div>

//   )
// }

// export default togglecheckbox
import React from 'react'
import './notifications.css'

const togglecheckbox = ({label}) => {
  return (
    <div className="d-flex">
        <div className="label-side">
            <div className="labe mt-2">
                 {label}{" "}
            </div>
        </div>
        <div className="d-block">
            <div className="toggle-switch">
                <input type="checkbox" className="checkbox" 
                        name={label} id={label} />
                <label className="label" htmlFor={label}>
                    <div>
                    <span className="inner" />
                    <span className="switch" />
                    </div>
                </label>
            </div>
        </div>
  </div>
  )
}

export default togglecheckbox