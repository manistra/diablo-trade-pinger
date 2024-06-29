export const formatNumber = (num) => {
  if (num >= 1e9) {
    return parseFloat((num / 1e9).toFixed(3)) + ' B'
  } else if (num >= 1e6) {
    return parseFloat((num / 1e6).toFixed(3)) + ' M'
  } else if (num >= 1e3) {
    return parseFloat((num / 1e3).toFixed(3)) + ' K'
  } else {
    return num.toString()
  }
}
