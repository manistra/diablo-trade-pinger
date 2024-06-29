import { useContext } from 'react'
import DiabloTradePingerContext from '../context'
import Input from './form/Input'

const Settings = () => {
  const { executablePath, handleSetExecutablePath } = useContext(DiabloTradePingerContext)

  return (
    <div>
      <Input
        label="Browser Path"
        value={executablePath || ''}
        setValue={handleSetExecutablePath}
        placeholder="Enter browser path"
        className="bg-diablo-bg rounded-none"
      />
    </div>
  )
}

export default Settings
