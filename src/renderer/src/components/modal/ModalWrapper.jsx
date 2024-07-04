import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

function ModalWrapper({ children, className, closeModal }) {
  const modalRoot = document.getElementById('modal-root')
  return ReactDOM.createPortal(
    <>
      <div
        className="absolute h-screen w-full left-0 top-0 bg-black bg-opacity-20 backdrop-blur-sm"
        onClick={closeModal}
      ></div>

      <div
        className={`absolute left-1/2 bottom-1/2 -translate-x-1/2 translate-y-1/2 min-w-44${className && ' ' + className}`}
      >
        {children}
      </div>
    </>,

    modalRoot
  )
}

ModalWrapper.propTypes = {
  closeModal: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string
}

export default ModalWrapper
