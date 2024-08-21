export const getRunIntervalMinimum = () => {
  if (localStorage.getItem('godmode') === 'true') return 5
  else return 30
}
