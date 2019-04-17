# Slider

Adds prev next icons around provided content and provides functions for navigating
backward and forward throgh content.

## Parameters

| Param | Type | Description | Default |
| --- | --- | --- | --- |
| class | `String` | A className for the component | ''
| onForwardNavigation | `function` | called after user did navigate forward | `() => {}`
| onBackwardNavigation | `function` | called after user did navigate backward | `() => {}`
| previousSlide | `preact Component` | used during slide animation - set to null if backward navigation is not possible | null
| currentSlide | `preact Component` | the currently visible slide | null
| nextSlide | `preact Component` | used during slide animation - set to null if forward navigation is not possible | null
| canHaveFocus | `Boolean` | when slider is focusable user can navigate with keyboard | true
## Example

**Code**

```jsx
const previousLocation = locations[index - 1]
const currentLocation = locations[index]
const nextLocation = locations[index + 1]

const silderProps = {
  onForwardNavigation: () => {
    this.context.actions.selectLocation({ byIndex: index + 1 })
  },
  onBackwardNavigation: () => {
    this.context.actions.selectLocation({ byIndex: index - 1 })
  },
  previousSlide: previousLocation && <Video filmingLocation={previousLocation} />,
  currentSlide: <Video filmingLocation={currentLocation} />,
  nextSlide: nextLocation && <Video filmingLocation={nextLocation} />,
  canHaveFocus: !isTouchEnabled
}

<Slider {...silderProps} />
```