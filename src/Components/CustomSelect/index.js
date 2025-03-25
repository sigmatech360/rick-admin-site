// import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
// import './style.css'

// export const SelectBox = (props) => {
//     const handleClick = (e) => {
//         console.log(e)
//     }

//     return (
//         <div className="inputWrapper">
//             <div class="inputIcon">
//                 <FontAwesomeIcon icon={props?.iconShow} />
//             </div>
//             {props?.label && <label htmlFor={props?.id} className={props?.labelClass}>{props?.label}{props?.required ? '*' : ''}</label>}
//             <div className="fieldData">
//                 <select className={props?.selectClass} name={props?.name} onChange={props.onChange} value={props.value}>
//                     <option>{`Select ${props?.name}`}</option>
//                     {Array.isArray(props.option) && props.option.map(item => (

//                         <option value={!item?.code ? item?.id : item?.code}>{item?.name || item?.title}</option>
//                     ))
//                     }
//                 </select>
//                 {props?.buttonAction && (
//                     <button type='button' onClick={handleClick}><FontAwesomeIcon icon={faTrashAlt} className="removeField"></FontAwesomeIcon></button>
//                 )
//                 }
//             </div>

//         </div>
//     )
// }







import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './style.css'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

export const SelectBox = (props) => {
    const handleClick = (e) => {
        console.log(e)
    }
    const renderTooltip = (tooltipProps) => (
        <Tooltip id="button-tooltip-2" className='custom-tooltip'>
          {props?.tooltip }
        </Tooltip>
      );

    return (
        <div className="inputWrapper">
            <div className="inputIcon">
                <FontAwesomeIcon icon={props?.iconShow} />
            </div>
            {props?.label && (
                <label htmlFor={props?.id} className={props?.labelClass}>
                    {props?.label}{props?.required ? '*' : ''}
                </label>
            )}
            {props?.tooltip && (
                <div className=' ms-2 d-inline-block'>
                    {/* <span style={{backgroundColor:'green'}}> <FontAwesomeIcon icon={faCircleInfo} /></span> */}
                    
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={<Tooltip id="button-tooltip-2" className='custom-tooltip'>
                            {props?.tooltip }
                          </Tooltip>}
                        >
                        {/* <Button variant="success">Hover me to see</Button> */}
                         <FontAwesomeIcon icon={faCircleInfo} style={{color:'#348F99'}} />
                    </OverlayTrigger>
                </div>
            )}
            <div className="fieldData">
                <select className={props?.selectClass} name={props?.name} onChange={props.onChange} value={props.value}>
                    <option value="">{props?.label ?  props?.placeholder ? `${props.placeholder}`: `  ${props.label}` : "Select"}</option>
                    {Array.isArray(props.option) &&
                        props.option.map((item) => (
                            <option key={item?.id} value={item?.id}>{item?.name || item?.title}</option>
                        ))
                    }
                </select>
                {props?.buttonAction && (
                    <button type='button' onClick={handleClick}>
                        <FontAwesomeIcon icon={faTrashAlt} className="removeField" />
                    </button>
                )}
            </div>
        </div>
    )
}