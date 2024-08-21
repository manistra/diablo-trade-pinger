export const getPagesPerRunMaximum = () => {
  if (localStorage.getItem('godmode') === 'true') return 15
  else return 6
}
