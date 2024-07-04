import { openInBrowser } from '../utils/openInBrowser'
import PropTypes from 'prop-types'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const Help = ({ setIsInfoOpen, isInfoOpen }) => {
  return (
    <div
      className={`absolute bottom-0 left-8 transition-all duration-500 ease-out bg-gradient-to-b from-black to-diablo-bg  border border-b-0 border-diablo-dark rounded-t-sm w-[85%] h-[400px] ${!isInfoOpen && 'translate-y-full'}`}
    >
      <div className="relative">
        <button
          className="-ml-[1px] -mb-1px  bg-gradient-to-b from-diablo-bg to-black absolute top-0 -translate-y-full flex flex-row items-center gap-1 font-bold rounded-t-lg border border-diablo-dark border-b-0 py-1 px-3 text-base text-diablo-dark"
          onClick={() => setIsInfoOpen(!isInfoOpen)}
        >
          <ChevronDownIcon
            strokeWidth={2}
            className={`size-3 text-diablo ${!isInfoOpen && 'rotate-180 transition duration-500 ease-in'}`}
          />
          {`The loading bar isn't moving? The app isn't working?`}
          <span className="text-diablo ">Click here!</span>
        </button>
        <div className="p-8 text-gray-200 text-base font-sans gap-7 flex flex-col">
          <p>
            {`This app scrapes item listings from diablo.trade listing pages. In the background it's`}
            <span className="text-diablo"> using your browser.</span>
          </p>

          <div>
            <h2 className="font-bold text-2xl">
              Your loading bar {`isn't`} moving? You need to add a browser path.
            </h2>
            <p className="pl-7">
              Right-click your internet browsers shortcut, go to Properties - Shortcut tab, and copy
              the path from the Target field into the browser path in settings.
            </p>
            <a
              className="pl-7 underline text-blue-500"
              href="https://github.com/manistra/diablo-trade-pinger/blob/main/README.md#how-to-find-browser-path"
              onClick={(e) => {
                e.preventDefault()
                openInBrowser(e.currentTarget.href)
              }}
            >
              Click here for a more in depth guide on how to get browser path
            </a>
          </div>

          <div>
            <h2 className="font-bold text-2xl">
              {`I've set the browser path but this shit still ain't workin'!`}
            </h2>
            <p className="pl-7">
              {`First of all, I'm sorry to hear that. The only fix to this is to try to use another
                browser. Try downloading chrome if you're using something else, also Edge seems to
                always work. And of course, you'll have to get its browser path.`}
            </p>
          </div>

          <div>
            <h2 className="font-bold text-2xl">{`Still no luck?`}</h2>
            <a
              className="pl-7 underline text-blue-500"
              href="https://discord.gg/QVDgUQMSqB"
              onClick={(e) => {
                e.preventDefault()
                openInBrowser(e.currentTarget.href)
              }}
            >
              {`Click here to join our discord and contact me directly. We'll be happy to help you out.`}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

Help.propTypes = {
  setIsInfoOpen: PropTypes.func.isRequired,
  isInfoOpen: PropTypes.bool.isRequired
}

export default Help
