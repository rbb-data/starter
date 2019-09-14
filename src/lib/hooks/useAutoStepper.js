import { useReducer, useEffect, useRef } from 'react'

/**
 * hook that can periodically call a handler function
 * @param  {bool} isAnimating          As long as isAnimating is true the next step is scheduled
 *                                     at the speciefied delay
 *                                     as soon as it will be false the step is cancelled
 * @param  {function} handler          handler must return the delay untill it should be called the next time
 *                                     or false to stop the stepper
 *
 * @param  {Number} initialDelay=0     the delay until the handler is called for the first time
 *
 * example usage:
 *
 * const [count, setCount] = useState(0)
 * const [isAnimating, setIsAnimating] = useState(false)
 * useAutoStepper(isAnimating, () => {
 *   setCount(count + 1)
 * })
 *
 * return <button onClick={() => { setIsAnimating(true) }}>start counter</button>
 */
export default function useAutoStepper (isAnimating, handler, initialDelay = 0) {
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
}
