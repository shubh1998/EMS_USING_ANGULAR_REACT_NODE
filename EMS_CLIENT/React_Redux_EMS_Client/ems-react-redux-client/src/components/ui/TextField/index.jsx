import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

const CustomTextField = ({
  name,
  label,
  placeholder,
  fullWidth,
  variant,
  className,
  defaultValue,
  type,
  disabled,
  required,
  size,
  multiline,
  rows,
  onChange,
  value,
  inputRef,
  InputLabelProps,
}) => (
  <TextField
    defaultValue={ defaultValue }
    fullWidth={ !!fullWidth }
    name={ name }
    variant={ variant }
    label={ label }
    className={ className }
    type={ type }
    required={ required }
    disabled={ disabled }
    placeholder={ placeholder }
    size={ size }
    multiline={ multiline }
    rows={ rows }
    onChange={ onChange }
    value={ value }
    inputRef={ inputRef }
    InputLabelProps={ InputLabelProps }
  />
)

CustomTextField.defaultProps = {
  label: '',
  disabled: false,
  type: 'string',
  fullWidth: true,
  variant: 'outlined',
  required: false,
  className: null,
  defaultValue: '',
  placeholder: null,
  size: 'medium',
  multiline: false,
  rows: null,
  onChange: () => null,
  value: undefined,
  name: '',
  InputLabelProps: null
}

CustomTextField.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
  variant: PropTypes.oneOf([ 'filled', 'outlined', 'standard' ]),
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.oneOf([ 'small', 'medium' ]),
  multiline: PropTypes.bool,
  rows: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  onChange: PropTypes.func,
  value: PropTypes.string,
  InputLabelProps: PropTypes.object,
}

export default CustomTextField
