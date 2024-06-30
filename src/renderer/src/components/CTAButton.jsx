import btn from '../assets/btn.png'
import PropTypes from 'prop-types'

const CTAButton = ({ className, children, ...otherProps }) => {
  return (
    <button
      className={`hover:glow-shadow transition duration-300 relative ${className}`}
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
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  otherProps: PropTypes.object
}

export default CTAButton
