export const getTimeDifferenceText = (isoString) => {
  const now = new Date()
  const listedDate = new Date(isoString)
  const differenceInSeconds = Math.floor((now - listedDate) / 1000)

  let timeText
  if (differenceInSeconds < 60) {
    timeText = `Less than one minute ago`
  } else if (differenceInSeconds < 3600) {
    const minutes = Math.floor(differenceInSeconds / 60)
    timeText = minutes == 1 ? `${minutes} minute ago` : `${minutes} minutes ago`
  } else if (differenceInSeconds < 86400) {
    const hours = Math.floor(differenceInSeconds / 3600)
    timeText = hours == 1 ? `${hours} hour ago` : `${hours} hours ago`
  } else {
    const days = Math.floor(differenceInSeconds / 86400)
    timeText = days == 1 ? `${days} day ago` : `${days} days ago`
  }

  return timeText
}
