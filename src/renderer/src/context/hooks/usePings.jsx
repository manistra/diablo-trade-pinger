import { useState } from 'react'
const notifier = require('node-notifier')
const path = require('path')
const { ipcRenderer } = require('electron')

notifier.on('click', () => {
  ipcRenderer.send('focus-window')
})

const usePings = () => {
  const existingPings = localStorage.getItem('pings')
  const [pings, setPings] = useState(existingPings ? JSON.parse(existingPings) : [])

  const handleAddPings = (incomingPings) => {
    const existingPingsLocalStorage = localStorage.getItem('pings')
    const existingPings = existingPingsLocalStorage ? JSON.parse(existingPingsLocalStorage) : []

    const existingIds = existingPings.map((item) => item.diabloTradeId)

    const newNonDuplicatePings = incomingPings.filter(
      (item) => !existingIds.includes(item.diabloTradeId)
    )

    if (newNonDuplicatePings.length > 0)
      notifier.notify({
        title: `${newNonDuplicatePings.length} New Items Found!`,
        message: 'Items found, come check them out!',
        sound: true,
        contentImage: path.join(__dirname, '../../resources/icon.ico'),
        wait: true
      })

    const newPings = [...newNonDuplicatePings, ...existingPings]
    setPings(newPings)
    localStorage.setItem('pings', JSON.stringify(newPings))
  }

  const deleteAllPings = () => {
    localStorage.removeItem('pings')
    setPings([])
  }

  const deletePingById = (id) => {
    const pingsCopy = pings.filter((item) => item.diabloTradeId !== id)

    setPings(pingsCopy)
    localStorage.setItem('pings', JSON.stringify(pingsCopy))
  }
  return { pings, handleAddPings, deleteAllPings, deletePingById }
}

export default usePings
