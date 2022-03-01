const request = (...args) => fetch(...args)
  .then(res => {
    if (res.status < 400) return res
    throw new Error(`Request was not successful. Status code: ${res.status}`)
  })
  .then(res => res.json())

export default request
