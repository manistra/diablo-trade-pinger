import PropTypes from 'prop-types'
import ModalWrapper from './ModalWrapper'
import ModalContent from './ModalContent'

function Modal({ children, className, closeModal, title }) {
  return (
    <ModalWrapper closeModal={closeModal}>
      <ModalContent closeModal={closeModal} title={title} className={className}>
        {children}
      </ModalContent>
    </ModalWrapper>
  )
}

Modal.propTypes = {
  closeModal: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string
}

export default Modal
