// Adapted from https://wattenberger.com/blog/react-and-d3#sizing-responsivity

import { useState, useRef, useEffect } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';

const updateBounds = (dimensions = {}) => ({
  ...dimensions,
  boundedHeight: Math.max(
    dimensions.height - dimensions.marginTop - dimensions.marginBottom,
    0
  ),
  boundedWidth: Math.max(
    dimensions.width - dimensions.marginLeft - dimensions.marginRight,
    0
  ),
});

const setMarginDefaults = (dimensions = {}) => ({
  ...dimensions,
  marginTop: dimensions.marginTop || 0,
  marginRight: dimensions.marginRight || 0,
  marginBottom: dimensions.marginBottom || 0,
  marginLeft: dimensions.marginLeft || 0,
});

const useChartDimensions = (passedSettings = {}) => {
  const ref = useRef();

  const dimensions = updateBounds(setMarginDefaults(passedSettings));

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (dimensions.width && dimensions.height) return [ref, dimensions];

    const element = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;

      const entry = entries[0];
      if (width !== entry.contentRect.width) setWidth(entry.contentRect.width);
      if (height !== entry.contentRect.height)
        setHeight(entry.contentRect.height);
    });

    resizeObserver.observe(element);
    return () => resizeObserver.unobserve(element);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newSettings = updateBounds({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  });

  return [ref, newSettings];
};

export default useChartDimensions;
