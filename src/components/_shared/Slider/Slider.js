import React, { Component } from 'react'
import PropTypes from 'prop-types'
import nextIcon from './nextIcon.svg'
import _ from './Slider.module.sass'

/**
 * Adds prev next icons around provided content and provides functions for navigating
 * backward and forward throgh content (on mobile with swipe gesture).
 */
export default class Slider extends Component {
  static propTypes = {
    /** an array of render funtions for the prevoius current and next slide
     *  in that order.
     *
     *  return null for the previous or next slide if you want to dissable backward
     *  or forward navigation
     */
    children: PropTypes.arrayOf(PropTypes.func),
    /** called after user did navigate forward */
    onBackwardNavigation: PropTypes.func,
    /** called after user did navigate backward */
    onForwardNavigation: PropTypes.func,
    /** when Slider is focusable user can navigate with keyboard */
    canHaveFocus: PropTypes.bool,
    showSlideButtons: PropTypes.bool,
    className: PropTypes.string
  }

  static defaultProps = {
    onBackwardNavigation: () => {},
    onForwardNavigation: () => {},
    canHaveFocus: true,
    showSlideButtons: true
  }

  handleKeyDown = e => {
    const {
      onBackwardNavigation: navigateBack,
      onForwardNavigation: navigateForward
    } = this.props

    const keyIsArrowRight = e.key === 'ArrowRight' || e.key === 'Right'
    const keyIsArrowLeft = e.key === 'ArrowLeft' || e.key === 'Left'

    if (this.canNavigateForward && keyIsArrowRight) navigateForward()
    if (this.canNavigateBackward && keyIsArrowLeft) navigateBack()
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
    if (!this.canNavigateBackward && !isForwardNavigation) return this.resetTransition({ animated: true })
    if (!this.canNavigateForward && isForwardNavigation) return this.resetTransition({ animated: true })

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

  componentDidUpdate () {
    this.resetTransition()
  }

  render () {
    const {
      className,
      onForwardNavigation: navigateForward,
      onBackwardNavigation: navigateBack,
      canHaveFocus,
      showSlideButtons,
      children
    } = this.props

    const [renderPreviousSlide, renderCurrentSlide, renderNextSlide] = children
    const previousSlide = renderPreviousSlide()
    const currentSlide = renderCurrentSlide()
    const nextSlide = renderNextSlide()

    this.canNavigateForward = !!nextSlide
    this.canNavigateBackward = !!previousSlide

    const wrapperProps = {
      className: `${_.slider} ${className} ${showSlideButtons && _.hasSlideButtons}`,
      tabIndex: canHaveFocus ? 0 : null,
      onKeyDown: this.handleKeyDown,
      onTouchStart: this.handleTouchStart,
      onTouchMove: this.handleTouchMove,
      onTouchEnd: this.handleTouchEnd,
      onTouchCancel: this.handleTouchCancel
    }

    return <div {...wrapperProps}>
      <div className={_.content} ref={ref => { this.contentRef = ref }}>
        <div className={_.previousSlideWrapper}>{previousSlide}</div>
        {currentSlide}
        <div className={_.nextSlideWrapper}>{nextSlide}</div>
      </div>

      { showSlideButtons &&
        <div>
          { this.canNavigateBackward &&
            <button className={`${_.prevNextButton} ${_.prev}`} onClick={navigateBack}>
              <img alt='go to previous slide' src={nextIcon} />
            </button>
          }
          { this.canNavigateForward &&
            <button className={`${_.prevNextButton} ${_.next}`} onClick={navigateForward}>
              <img alt='go to next slide' src={nextIcon} />
            </button>
          }
        </div>
      }
    </div>
  }
}
