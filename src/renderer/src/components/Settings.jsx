import { useContext, useState } from 'react'
import DiabloTradePingerContext from '../context'
import Input from './form/Input'
import Modal from './modal/Modal'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'

const Settings = () => {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const {
    executablePath,
    handleSetExecutablePath,
    pagesPerRun,
    handleSetPagesPerRun,
    runInterval,
    handleSetRunInterval,
    isSnooping,
    handleSetPatchNotesOpen
    // showBrowser,
    // setShowBrowser
  } = useContext(DiabloTradePingerContext)

  return (
    <>
      <button
        className="absolute bottom-4 right-24 group self-start -mr-2"
        onClick={() => setSettingsOpen(true)}
      >
        <Cog6ToothIcon
          strokeWidth={2}
          className="size-[70px] group-hover:scale-110 group-hover:rotate-90 duration-300 transition cursor-pointer group-hover:opacity-100 opacity-70 text-diablo-dark hover:text-diablo"
        />
      </button>

      {settingsOpen && (
        <Modal closeModal={() => setSettingsOpen(false)} title="Settings">
          <div className="grid grid-cols-2 gap-10 relative">
            <div className="flex flex-col gap-6">
              <Input
                disabled={isSnooping}
                label="Browser Path"
                value={executablePath || ''}
                setValue={handleSetExecutablePath}
                placeholder="Enter browser path"
                className=""
              />

              <Input
                disabled={isSnooping}
                label="Pages per Run (max 6)"
                value={pagesPerRun || 4}
                setValue={handleSetPagesPerRun}
                type="number"
                min={1}
                max={5}
                className=""
              />

              <Input
                disabled={isSnooping}
                label="Run Interval in seconds (min 45)"
                type="number"
                min={45}
                max={6000}
                value={runInterval || 60}
                setValue={handleSetRunInterval}
                className=""
              />

              {/* <div className="flex flex-col">
                <label className="text-sm text-diablo mb-2">Show Browser While Snooping</label>

                <input
                  className="w-6 h-6 accent-diablo"
                  type="checkbox"
                  role="switch"
                  onClick={() => setShowBrowser(!showBrowser)}
                  checked={showBrowser}
                  id="flexSwitchCheckDefault02"
                  defaultChecked
                />
                 </div> */}

              <p className="absolute -bottom-7 right-1/2 translate-x-1/2 text text-diablo-dark">
                Diablo Trade Pinger: v{import.meta.env.RENDERER_VITE_PACKAGE_VERSION}
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-diablo">Patch Notes:</label>

                <button
                  className="btn-secondary h-9 p-0"
                  onClick={() => {
                    handleSetPatchNotesOpen(true)
                    setSettingsOpen(false)
                  }}
                >
                  Show Patch Notes
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default Settings
