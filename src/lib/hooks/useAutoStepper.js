import { useState, useReducer, useEffect, useRef } from 'react'

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
  const [step, bumpStep] = useReducer(s => s + 1, 0)
  const timeoutId = useRef(null)

  useEffect(() => {
    clearTimeout(timeoutId.current)

    if (!isAnimating) return

    timeoutId.current = setTimeout(bumpStep, initialDelay)
  }, [isAnimating])

  useEffect(() => {
    // don't run on inital render (after that it will only run when handlerStep changed)
    if (step === 0) return

    const delay = handler()
    if (delay === false) return

    timeoutId.current = setTimeout(bumpStep, delay)
  }, [step])

  return [isAnimating, setIsAnimating]
}
