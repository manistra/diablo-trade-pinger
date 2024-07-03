import { useState } from 'react'

const usePatchNotes = () => {
  const patchNotesLastOpenFor = localStorage.getItem('patchNotesLastOpenFor')
  const openOnAppStart =
    patchNotesLastOpenFor !== import.meta.env.RENDERER_VITE_PACKAGE_VERSION.toString()

  const [patchNotesOpen, setPatchNotesOpen] = useState(openOnAppStart)

  const handleSetPatchNotesOpen = (value) => {
    setPatchNotesOpen(value)
    if (!value)
      localStorage.setItem(
        'patchNotesLastOpenFor',
        import.meta.env.RENDERER_VITE_PACKAGE_VERSION.toString()
      )
  }

  return {
    patchNotesOpen,
    handleSetPatchNotesOpen
  }
}

export default usePatchNotes
