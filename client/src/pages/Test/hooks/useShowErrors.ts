import React, { useState } from 'react'

export const useShowErrors = () => {
  const [isShow, setIsShow] = useState(false);
  const onToggle = () => setIsShow((prev) => !prev);

  return {
    onToggle,
    isShow
  }

}
