import { useContext } from 'react'
import DiabloTradePingerContext from '../context'
import Modal from './modal/Modal'
import { changelog } from '../changelog'

const PatchNotes = () => {
  const { handleSetPatchNotesOpen, patchNotesOpen } = useContext(DiabloTradePingerContext)

  const currentVersion = import.meta.env.RENDERER_VITE_PACKAGE_VERSION?.toString()

  const patchNotesLastOpenFor = localStorage.getItem('patchNotesLastOpenFor')
  const firstTimeShowing = patchNotesLastOpenFor !== currentVersion

  return (
    <>
      {patchNotesOpen && (
        <Modal
          closeModal={() => handleSetPatchNotesOpen(false)}
          title={firstTimeShowing ? `${changelog[0].version} Patch Notes` : 'Patch Notes'}
        >
          <div className="flex flex-col gap-8 overflow-y-scroll max-h-[640px] pb-20">
            {firstTimeShowing ? (
              <div className="flex flex-col gap-4">
                <p className="text-lg">
                  Thank you for downloading Diablo Trade Pinger v{changelog[0].version}
                </p>

                <div key={changelog[0].version}>
                  <h1 className="text-2xl mb-2 text-diablo">Latest changes: </h1>

                  <ul className="pl-4 flex flex-col gap-1">
                    {changelog[0].changes.map((change, index) => (
                      <li className="flex gap-2" key={index}>
                        <span className="h-1 w-1 rotate-45 border border-diablo bg-diablo mt-[10px]"></span>

                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <>
                {changelog.map((log) => (
                  <div key={log.version}>
                    <h1 className="text-3xl text-diablo">{log.version}</h1>

                    <ul className="pl-4 flex flex-col gap-1">
                      {log.changes.map((change, index) => (
                        <li className="flex gap-2" key={index}>
                          <span className="h-1 w-1 rotate-45 border border-diablo bg-diablo mt-[10px]"></span>
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            )}
          </div>
        </Modal>
      )}
    </>
  )
}

export default PatchNotes
