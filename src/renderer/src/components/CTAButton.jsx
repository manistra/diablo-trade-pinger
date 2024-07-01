import { useCallback } from 'react'
import PropTypes from 'prop-types'
import btn from '../assets/btn.png'
import debounce from 'lodash.debounce'

const CTAButton = ({ className, children, disabled, onClick, ...otherProps }) => {
  const debouncedOnClick = useCallback(
    debounce((event) => {
      if (onClick) {
        onClick(event)
      }
    }, 300), // Adjust the debounce delay as needed
    [onClick]
  )

  return (
    <button
      disabled={disabled}
      className={`transition duration-300 disabled:opacity-30 disabled:pointer-events-none relative ${className} ${!disabled && 'hover:glow-shadow'}`}
      onClick={debouncedOnClick}
      {...otherProps}
    >
      <img alt="btn" src={btn} />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-exo uppercase text-nowrap text-xl">
        {children}
      </span>
    </button>
  )
}

CTAButton.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  otherProps: PropTypes.object
}

export default CTAButton
