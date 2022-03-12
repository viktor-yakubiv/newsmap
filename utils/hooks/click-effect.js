import { useRef } from 'react'

const useClickEffect = (func, delay = 150) => {
  const timeStamp = useRef(0)

  const onMouseDown = (event) => {
    timeStamp.current = event.timeStamp
  }

  const onClick = (event) => {
    if (event.timeStamp - timeStamp.current < delay) {
      func?.(event)
    }
  }

  const style = { cursor: 'pointer' }

  return { style, onClick, onMouseDown }
}

export default useClickEffect
