const formatDateBy = (data) => {
  const dt = new Date(data)
  const y = dt.getFullYear()
  const m = (`${dt.getMonth() + 1}`).padStart(2, '0')
  const d = (`${dt.getDate()}`).padStart(2, '0')

  // const hh = (`${dt.getHours()}`).padStart(2, '0')
  // const mm = (`${dt.getMinutes()}`).padStart(2, '0')
  // const ss = (`${dt.getSeconds()}`).padStart(2, '0')
  // return `yyyy-mm-dd hh:mm:ss`
  return `${y}-${m}-${d}`
}
export default {formatDateBy}
