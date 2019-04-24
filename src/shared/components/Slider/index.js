import React, { Component } from 'react'
import nextIcon from './nextIcon.svg'
import _ from './styles.sass'

export default class Slider extends Component {
  static defaultProps = {
    onBackwardNavigation: () => {},
    onForwardNavigation: () => {},
    canHaveFocus: true,
    showSlideButtons: true
  }

  handleKeyDown = e => {
    const {
      previousSlide,
      nextSlide,
      onBackwardNavigation: navigateBack,
      onForwardNavigation: navigateForward
    } = this.props

    const keyIsArrowRight = e.key === 'ArrowRight' || e.key === 'Right'
    const keyIsArrowLeft = e.key === 'ArrowLeft' || e.key === 'Left'

    if (!!nextSlide && keyIsArrowRight) navigateForward()
    if (!!previousSlide && keyIsArrowLeft) navigateBack()
  }

  handleTouchStart = (e) => {
    this.contentRef.style.transition = ''
    this.touchStartPosition = e.changedTouches[0]
  }

  handleTouchMove = (e) => {
    if (!this.touchStartPosition || !this.contentRef) return

    const diffX = (this.touchStartPosition.clientX - e.changedTouches[0].clientX) * -1
    const diffY = (this.touchStartPosition.clientY - e.changedTouches[0].clientY)

    if (Math.abs(diffX) < 20 || Math.abs(diffY) > Math.abs(diffX)) return

    this.contentRef.style.transform = `translateX(${diffX}px)`
    e.preventDefault()
  }

  handleTouchEnd = (e) => {
    if (!this.touchStartPosition || !this.contentRef) return

    const {
      previousSlide,
      nextSlide,
      onBackwardNavigation: navigateBack,
      onForwardNavigation: navigateForward
    } = this.props

    const { width } = this.contentRef.getBoundingClientRect()
    const diff = (this.touchStartPosition.clientX - e.changedTouches[0].clientX)
    const isForwardNavigation = diff > 0
    const offset = isForwardNavigation ? width * -1 : width

    this.touchStartPosition = undefined

    if (Math.abs(diff) < 100) return this.resetTransition({ animated: true })

    // cancel transition when there is no slide to go to
    if (!previousSlide && !isForwardNavigation) return this.resetTransition({ animated: true })
    if (!nextSlide && isForwardNavigation) return this.resetTransition({ animated: true })

    this.contentRef.style.transition = 'transform 0.5s'
    this.contentRef.style.transform = `translateX(${offset}px)`

    setTimeout(() => {
      isForwardNavigation ? navigateForward() : navigateBack()
    }, 500)
  }

  handleTouchCancel = () => {
    this.touchStartPosition = undefined
    this.resetTransition()
  }

  resetTransition = ({ animated = false } = {}) => {
    if (!animated) {
      this.contentRef.style.transition = ''
      this.contentRef.style.transform = ''
    } else {
      this.contentRef.style.transition = 'transform 0.5s'
      this.contentRef.style.transform = `translateX(0px)`
      setTimeout(() => {
        this.contentRef.style.transition = ''
        this.contentRef.style.transform = ''
      }, 500)
    }
  }

  // When a user selects something on the map or in the search the content
  // of the slider will change and componentDidUpdate will be called
  // so now we set the focus here so we can use keyboard navigation
  // focusSlider = () => {
  //   this.ref.focus()
  // }
  // componentDidMount () {
  //   this.focusSlider()
  // }

  componentDidUpdate () {
    // this.focusSlider()
    this.resetTransition()
  }

  render (props) {
    const {
      class: className,
      onForwardNavigation: navigateForward,
      onBackwardNavigation: navigateBack,
      previousSlide,
      currentSlide,
      nextSlide,
      canHaveFocus,
      showSlideButtons
    } = props

    const wrapperProps = {
      class: `${_.slider} ${className} ${showSlideButtons && _.hasSlideButtons}`,
      ref: ref => { this.ref = ref },
      tabIndex: canHaveFocus ? 0 : null,
      onKeyDown: this.handleKeyDown,
      onTouchStart: this.handleTouchStart,
      onTouchMove: this.handleTouchMove,
      onTouchEnd: this.handleTouchEnd,
      onTouchCancel: this.handleTouchCancel
    }

    return <div {...wrapperProps}>
      <div class={_.content} ref={ref => { this.contentRef = ref }}>
        <div class={_.previousSlideWrapper}>{previousSlide}</div>
        {currentSlide}
        <div class={_.nextSlideWrapper}>{nextSlide}</div>
      </div>

      { showSlideButtons &&
        <div>
          { !!previousSlide &&
            <button class={`${_.prevNextButton} ${_.prev}`} onClick={navigateBack}>
              <img src={nextIcon} />
            </button>
          }
          { !!nextSlide &&
            <button class={`${_.prevNextButton} ${_.next}`} onClick={navigateForward}>
              <img src={nextIcon} />
            </button>
          }
        </div>
      }
    </div>
  }
}
