import { Select } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

const CustomSelect = ({ className, name, inputRef, options, onChange }) => {
    return (
        <Select
            native
            label="Filter"
            onChange={ onChange }
            className={ className } 
            name={ name } 
            ref={ inputRef }
        >
            <option value={''}>None</option>
            {
                options.map((item)=>{
                    return (
                        <option key={item.value} value={item.value}>{item.label}</option>
                    )
                })
            }
        </Select>
    )
}


CustomSelect.defaultProps = {
    name: "",
    className: null,
    inputRef: null,
    onChange: ()=>null,
    options: [],
}
  
CustomSelect.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    inputRef: PropTypes.func,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.object),
}

export default CustomSelect
