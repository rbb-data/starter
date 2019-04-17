# ValueOnGradientBar

A gradient bar that can display a value on the gradient point

## Dependencies

### npm

```
npm i chroma-js
```

## Parameters

| Param                 | Type           | Description                                                       | Default |
| ---                   | ---            | ---                                                               | --- |
| minValue              | `Number`       | The lower bound of the scale                                      | `0`
| maxValue              | `Number`       | The upper bound of the scale                                      | `100`
| canvasHeight          | `Number`       | the combined height of the bar and the number indicator in pixels | `15`
| barHeight             | `Number`       | the height of the bar alone in pixels                             | `12`
| colorScale            | `Chroma.scale` | [chroma-js](http://gka.github.io/chroma.js) color scale           | `Chroma.scale(['white', 'black'])`
| highlightedValue      | `Number`       | The value of the number indicator                                 | `undefined`
| greyOutBelowThreshold | `Boolean`      | It is possible to grey out the bar below a threshold              | `false`
| threshold             | `Number`       | The threshold which is also displayed on the bar                  | `50`

## Example

**Code**

```jsx
const gradienBarProps = {
  maxValue: 80,
  highlightedValue: 26,
  unit: 'μg/m³',
  colorScale: myColorScale,
  greyOutBelowThreshold: false,
  threshold: thresholdFilter.threshold
}

<ValueOnGradientBar class={_.graph} {...gradienBarProps} />
```

**Screenshot**

![](./example.png)