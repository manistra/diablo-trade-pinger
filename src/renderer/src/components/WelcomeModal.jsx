import { useContext } from 'react'
import DiabloTradePingerContext from '../context'
import Modal from './modal/Modal'

const WelcomeModal = () => {
  const { welcomeModalOpen, handleSetWelcomeModalOpen } = useContext(DiabloTradePingerContext)

  return (
    <>
      {welcomeModalOpen && (
        <Modal closeModal={() => handleSetWelcomeModalOpen(false)} title="Welcome!">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-diablo text-2xl font-exo mx-auto">
                Welcome to Diablo Trade Pinger!
              </h1>
              <p>
                This app provides an easy-to-use, free tool that notifies you whenever a new item is
                listed on the diablo.trade website. In a community where high-end traders often
                hoard their exclusive tools, gaining an advantage in quickly snatching valuable
                items—a practice known as sniping—I believe in making this tool equally accessible
                to everyone. By making it public, all players have an equal opportunity.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-diablo text-2xl mx-auto uppercase font-exo">getting started</h1>

              <hr className="border-diablo-dark" />
              <ol className="flex flex-col gap-6 pl-3">
                <li className="flex gap-1 flex-col">
                  <h2 className="text-diablo text-lg">1. Creating Listings:</h2>

                  <div className="flex gap-3  pl-3">
                    <span className="h-1 w-1 rotate-45 border border-diablo bg-diablo mt-[10px]"></span>{' '}
                    <p>
                      Navigate to the left under Listings and click the plus sign button to create a
                      new listing.
                    </p>
                  </div>
                  <p className="ml-6 pl-2 border-diablo border-l text-sm text-gray-300">
                    <span className="text-diablo">Note:</span> The app notifies you when an item on
                    diablo.trade matches your listing by checking for at least 2 affixes. For
                    instance, a listing with 3 affixes will match any item that includes 2 or more
                    of those affix combinations. Even a single affix listing matches if that affix
                    is present on the item. Better item filtering coming in the future.
                  </p>
                </li>

                <li className="flex gap-1 flex-col">
                  <h2 className="text-diablo text-lg">2. Starting the search:</h2>

                  <div className="flex gap-3 pl-3">
                    <span className="h-1 w-1 rotate-45 border border-diablo bg-diablo mt-[10px]"></span>{' '}
                    <p>
                      Once you have one or more listings created, click the start button on the left
                      sidebar.
                    </p>
                  </div>
                  <p className="ml-6 pl-2 border-diablo border-l text-sm text-gray-300">
                    <span className="text-diablo">Note:</span> Ensure the loading bar moves to
                    indicate the tool is active. If not, set your browser path by clicking the
                    button in the bottom left of the app or visit our Discord for assistance.
                  </p>
                </li>
                <li className="flex gap-1 flex-col">
                  <h2 className="text-diablo text-lg">2. Receiving Notifications:</h2>

                  <p className="flex gap-3 pl-3">
                    <span className="h-1 w-1 rotate-45 border border-diablo bg-diablo mt-[10px]"></span>{' '}
                    <p>When a notification arrives, it appears in the Pings section.</p>
                  </p>

                  <p className="flex gap-3 pl-3">
                    <span className="h-1 w-1 rotate-45 border border-diablo bg-diablo mt-[10px]"></span>{' '}
                    <p>
                      Click on the item in the Pings section to view it directly on the trade site.
                    </p>
                  </p>
                </li>
              </ol>
            </div>

            <p>
              Diablo Trade Pinger is a project developed solely by me alongside my full-time job. I
              am committed to refining and enhancing this tool. Your contributions and feedback are
              valued and can help shape the future of Diablo Trade Pinger. Join our Discord
              community to connect directly with me and learn more about how you can contribute.
            </p>
          </div>
        </Modal>
      )}
    </>
  )
}

export default WelcomeModal
