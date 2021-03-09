import { useState } from "react"


export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false)
  const onShow = () => setIsVisible(true)
  const onHide = () => setIsVisible(false)
  return { isVisible, onShow, onHide }
}