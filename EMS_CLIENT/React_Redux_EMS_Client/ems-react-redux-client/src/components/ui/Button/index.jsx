import React from 'react'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'

const CustomButton = ({
  type,
  href,
  variant,
  classes,
  className,
  size,
  label,
  disabled,
  fullWidth,
  onClick,
  startIcon,
  endIcon,
  disableElevation,
  color
}) => {
  return (
    <Button
      href={ href }
      type={ type }
      disabled={ disabled }
      fullWidth={ fullWidth }
      variant={ variant }
      onClick={ onClick }
      size={ size }
      className={ className }
      classes={ classes }
      startIcon={ startIcon }
      endIcon={ endIcon }
      disableElevation={ disableElevation }
      color={ color }
    >
      { label }
    </Button>
  )
}
CustomButton.defaultProps = {
  variant: 'contained',
  className: null,
  size: 'medium',
  disabled: false,
  fullWidth: false,
  type: 'button',
  onClick: () => null,
  classes: {},
  href: null,
  startIcon: null,
  endIcon: null,
  disableElevation: false,
}

CustomButton.propTypes = {
  variant: PropTypes.oneOf([ 'contained', 'outlined', 'text' ]),
  type: PropTypes.oneOf([ 'submit', 'button' ]),
  color: PropTypes.string,
  size: PropTypes.oneOf([ 'large', 'medium', 'small' ]),
  label: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  classes: PropTypes.shape({}),
  href: PropTypes.string,
  startIcon: PropTypes.element,
  endIcon: PropTypes.element,
  disableElevation: PropTypes.bool,
}

export default CustomButton
