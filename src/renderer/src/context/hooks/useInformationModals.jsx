import { useState } from 'react'

const useInformationModals = () => {
  const currentVersion = import.meta.env.RENDERER_VITE_PACKAGE_VERSION?.toString()

  const isFirstAppStartLocalStorage = localStorage.getItem('isFirstAppStart')
  const isFirstAppStartLocalStorageBool = isFirstAppStartLocalStorage?.toString() !== 'false'

  const patchNotesLastOpenFor = localStorage.getItem('patchNotesLastOpenFor')
  const openOnAppStart =
    patchNotesLastOpenFor !== currentVersion && !isFirstAppStartLocalStorageBool

  const [patchNotesOpen, setPatchNotesOpen] = useState(openOnAppStart)
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(!!isFirstAppStartLocalStorageBool)

  const handleSetPatchNotesOpen = (value) => {
    setPatchNotesOpen(value)
    if (!value) localStorage.setItem('patchNotesLastOpenFor', currentVersion)
  }

  const handleSetWelcomeModalOpen = (value) => {
    setWelcomeModalOpen(value)
    if (isFirstAppStartLocalStorage?.toString() !== 'false') {
      localStorage.setItem('isFirstAppStart', 'false')
    }
  }

  return {
    patchNotesOpen,
    handleSetPatchNotesOpen,

    welcomeModalOpen,
    handleSetWelcomeModalOpen
  }
}

export default useInformationModals
