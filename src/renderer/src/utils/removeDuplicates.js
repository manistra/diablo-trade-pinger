export const removeDuplicates = (arr, key) => {
  const seen = new Set()
  return arr.reduce((acc, item) => {
    const keyValue = item[key]
    if (!seen.has(keyValue)) {
      seen.add(keyValue)
      acc.push(item)
    }
    return acc
  }, [])
}
