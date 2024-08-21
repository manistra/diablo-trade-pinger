import PropTypes from 'prop-types'
import { XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

const ModalContent = ({ children, title, className, closeModal }) => {
  return (
    <div className={clsx('border-diablo-dark border w-[850px] rounded-sm', className)}>
      <h1 className="relative bg-black-blur text-4xl uppercase font-exo flex items-center px-7 py-3">
        {title}

        <button
          className="absolute top-0 right-0 p-1 bg-red-950 transition group border-b border-l border-diablo-dark rounded-bl hover:bg-red-900"
          onClick={closeModal}
        >
          <XMarkIcon
            className="size-5 group-hover:rotate-90 transform transition duration-500"
            strokeWidth={3}
          />
        </button>
      </h1>

      <div className="border-diablo-dark border-t p-9 backdrop-blur bg-black bg-opacity-75 min-h-[400px] max-h-[740px]">
        {children}
      </div>
    </div>
  )
}
ModalContent.propTypes = {
  closeModal: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string
}
export default ModalContent
