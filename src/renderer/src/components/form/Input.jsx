import PropTypes from 'prop-types'

const Input = ({ value, label, setValue, className, ...otherProps }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-diablo">{label}</label>

      <input
        {...otherProps}
        className={'text-black rounded h-9 p-4' + ' ' + className}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setValue: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default Input
