import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

const CustomTypography = ({
  variant, display, align, className, label, noWrap, color
}) => {
  return (
    <Typography
      variant={ variant }
      display={ display }
      align={ align }
      noWrap={ noWrap }
      className={ className }
      color={ color }
    >
      { label }
    </Typography>
  )
}

CustomTypography.defaultProps = {
  variant: 'body1',
  display: 'initial',
  align: 'inherit',
  className: null,
  noWrap: false,
}

CustomTypography.propTypes = {
  variant: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'caption',
    'button',
    'overline',
    'srOnly',
    'inherit' ]),
  display: PropTypes.oneOf([ 'initial', 'block', 'inline' ]),
  align: PropTypes.oneOf([ 'inherit', 'left', 'center', 'right', 'justify' ]),
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  noWrap: PropTypes.bool,
  color: PropTypes.string
}

export default CustomTypography
