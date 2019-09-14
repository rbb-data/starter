import { useState, useReducer, useEffect, useRef } from 'react'

const reducer = (state, delay) => {
  return {
    step: state.step + 1,
    delay: delay
  }
}

/**
 * hook that can periodically call a handler function
 * @param  {function} handler          handler must return the delay untill it should be called the next time
 *                                     or false to stop the stepper
 *
 * @param  {Number}   [initialDelay=0] the delay until the handler is called for the first time
 *
 * @return {[bool, func]}              returns a boolean indicating wheather there is a
                                       scheduled next step and a function taking a boolean that will
                                       start or stop the stepper
 */
export default function useAutoStepper (handler, initialDelay = 0) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [state, setupNext] = useReducer(reducer, { step: 0, delay: initialDelay })
  const { step, delay } = state
  const timeoutId = useRef(null)

  useEffect(() => {
    clearTimeout(timeoutId.current)

    if (!isAnimating) return

    const performStep = () => {
      const delay = handler()
      const keepRunning = delay !== false
      if (keepRunning) { setupNext(delay) }
    }

    timeoutId.current = setTimeout(performStep, delay)
  }, [isAnimating, step, delay])

  return [isAnimating, setIsAnimating]
}
