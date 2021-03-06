import { useState } from "react"

export const useChange = (initial = "") => {
  const [value, setValue] = useState(initial)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
  return {
    value,
    onChange
  }
}