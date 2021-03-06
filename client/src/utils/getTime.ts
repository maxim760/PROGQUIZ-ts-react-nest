export const getTime = (ms: number) => {
  const allSeconds = ms / 1000
  const sec = Math.floor(allSeconds % 60)
  const min = Math.floor(allSeconds / 60 % 60)
  const hour = Math.floor(allSeconds / 60 / 60 % 24)
  const timeArray = [min, sec]
  if (hour !== 0) {
    timeArray.unshift(hour)
  }
  return timeArray.map(item => String(item).padStart(2,"0")).join(":")
}