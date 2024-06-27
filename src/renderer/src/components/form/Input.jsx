import PropTypes from 'prop-types'

const Input = ({ value, label, setValue }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-diablo">{label}</label>

      <input
        className="text-black rounded h-9 p-4"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

Input.propTypes = {
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default Input
