import Select from 'react-tailwindcss-select'
import PropTypes from 'prop-types'
import clsx from 'clsx'

const Dropdown = ({ className, options, label, ...otherProps }) => {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <label className="text-sm text-diablo">{label}</label>

      <Select
        options={options}
        className="font-sans"
        primaryColor={'orange'}
        isSearchable={true}
        {...otherProps}
      />
    </div>
  )
}

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default Dropdown
