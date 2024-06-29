import { useContext, useState } from 'react'
import DiabloTradePingerContext from '../context'
import Input from './form/Input'

const Settings = () => {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const {
    executablePath,
    handleSetExecutablePath,
    showBrowser,
    setShowBrowser,
    pagesPerRun,
    handleSetPagesPerRun,
    runInterval,
    handleSetRunInterval
  } = useContext(DiabloTradePingerContext)

  return (
    <>
      {settingsOpen ? (
        <div className="flex flex-row gap-10 border-diablo-dark border rounded px-7 py-4 relative">
          <Input
            label="Set how many pages to cover per run"
            value={pagesPerRun || 10}
            setValue={handleSetPagesPerRun}
            type="number"
            min={0}
            max={30}
            className="bg-diablo-bg rounded-none text-diablo"
          />

          <Input
            label="Set run interval in seconds"
            type="number"
            min={10}
            max={600}
            value={runInterval || 30}
            setValue={handleSetRunInterval}
            className="bg-diablo-bg rounded-none text-diablo"
          />

          <Input
            label="Browser Path"
            value={executablePath || ''}
            setValue={handleSetExecutablePath}
            placeholder="Enter browser path"
            className="bg-diablo-bg rounded-none text-diablo"
          />

          <div className="flex flex-col">
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
          </div>

          <button
            className="group absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 p-1"
            onClick={() => setSettingsOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="5"
              stroke="currentColor"
              className="size-6  group-hover:scale-110 group-hover:rotate-90 duration-300 group-hover:text-diablo transition text-diablo-dark cursor-pointer"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <button className="group" onClick={() => setSettingsOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="size-10 text-diablo group-hover:scale-110 group-hover:rotate-90 duration-300 group-hover:opacity-100 transition cursor-pointer opacity-55"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
      )}
    </>
  )
}

export default Settings
