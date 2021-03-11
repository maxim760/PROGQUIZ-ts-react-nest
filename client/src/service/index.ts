import axios from "axios"

const $host = axios.create()

const $authHost = axios.create()

$authHost.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `${token}`;
  return config
})

export {
  $host,
  $authHost,
}