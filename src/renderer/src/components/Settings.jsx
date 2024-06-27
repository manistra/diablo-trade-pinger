import { useState } from 'react'

const Settings = () => {
  const executablePathLocalStorage = JSON.parse(localStorage.getItem('executablePath'))

  const [executablePath, setExecutablePath] = useState(executablePathLocalStorage)

  const handleSetExecutablePath = (value) => {
    setExecutablePath(value)
    localStorage.setItem('executablePath', JSON.stringify(value))
  }
  return (
    <div>
      <div>
        <label>Executable path:</label>
        <input value={executablePath} onChange={(e) => handleSetExecutablePath(e.target.value)} />
      </div>
    </div>
  )
}

export default Settings
