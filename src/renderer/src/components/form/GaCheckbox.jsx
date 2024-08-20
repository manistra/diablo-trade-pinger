import PropTypes from 'prop-types'
import ga from '../../assets/ga.png'
import clsx from 'clsx'

const GaCheckbox = ({ value, setValue, className, label = 'Is Greater Affix' }) => {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <label className="text-sm text-diablo whitespace-nowrap">{label}</label>

      <button
        onClick={() => setValue(!value)}
        className={clsx(
          'w-9 h-9 flex items-center justify-center border rounded mx-auto border-diablo-dark',
          value && 'bg-diablo-bg'
        )}
      >
        <img alt="ga" className={`w-7 h-7 ${value ? 'opacity-100' : 'opacity-30'}`} src={ga} />
      </button>
    </div>
  )
}

GaCheckbox.propTypes = {
  value: PropTypes.bool.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  setValue: PropTypes.func.isRequired
}

export default GaCheckbox
