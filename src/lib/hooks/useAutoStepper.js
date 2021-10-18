import { useReducer, useEffect, useRef } from 'react';

/**
 * hook that can periodically call a handler function
 * @param  {bool} isAnimating          As long as isAnimating is true the next step is scheduled
 *                                     at the specified delay
 *                                     as soon as it will be false the step is cancelled
 * @param  {function} handler          handler must return the delay until it should be called the next time
 *                                     or false to stop the stepper
 *
 * @param  {Number} initialDelay=0     the delay until the handler is called for the first time
 *
 * example usage:
 *
 * const max = 100
 * const [count, setCount] = useState(0)
 * const [isAnimating, setIsAnimating] = useState(false)
 * useAutoStepper(isAnimating, () => {
 *   setCount(count + 1)
 *   return count < max ? 500 : false
 * })
 *
 * return <button onClick={() => { setIsAnimating(true) }}>start counter</button>
 */
export default function useAutoStepper(isAnimating, handler, initialDelay = 0) {
  const delayRef = useRef(initialDelay);
  const [step, bumpStep] = useReducer((s) => s + 1, 0);
  const timeoutId = useRef(null);

  useEffect(() => {
    clearTimeout(timeoutId.current);

    if (!isAnimating) return;

    timeoutId.current = setTimeout(bumpStep, delayRef.current);
  }, [isAnimating]);

  useEffect(() => {
    // don't run on initial render (after that it will only run when step changed)
    if (step === 0) return;

    const delay = handler();
    if (delay === false) return;

    timeoutId.current = setTimeout(bumpStep, delay);
    // I really only want to call this when step changes (Maybe this means we can have outdated values inside handler???)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);
}
