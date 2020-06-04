import React from 'react'
import PropTypes from 'prop-types'
import _ from './ShareButtons.module.sass'
import './css/fontello-embedded.css'

/**
 * Cleans a string from hashtags
 *
 * @param {String} text
 * @return {String}
 */
const removeHashtags = text =>
  text
    // remove final hashtags
    .replace(/(\s?#[^#\s]+)+$/, '')
    // remove just the pound signs from hashtags in the middle of the text
    .replace(/#[^\s]+/g, s => s.substr(1))

export const FacebookButton = ({ url }) => (
  <a
    className={`${_.Button} icon-facebook`}
    aria-label='Auf Facebook teilen'
    target='_blank'
    rel='noopener noreferrer'
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`}
  />
)

FacebookButton.propTypes = {
  url: PropTypes.string.isRequired
}

export const TwitterButton = ({ url, description }) => (
  <a
    className={`${_.Button} icon-twitter`}
    aria-label='Auf Twitter teilen'
    target='_blank'
    rel='noopener noreferrer'
    href={
      'https://twitter.com/intent/tweet?via=rbb24&url=' +
      encodeURIComponent(url) +
      '&text=' +
      encodeURIComponent(description)
    }
  />
)

TwitterButton.propTypes = {
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export const WhatsAppButton = ({ url, description }) => (
  <a
    className={`${_.Button} icon-whatsapp`}
    aria-label='Auf WhatsApp teilen'
    target='_blank'
    rel='noopener noreferrer'
    href={
      'whatsapp://send?text=' +
      encodeURIComponent(removeHashtags(description) + ' ' + url)
    }
  />
)

WhatsAppButton.propTypes = {
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

/**
 * Componen to add social share buttons
 * **NOTE**: The WhatsApp button is only visible on screens that are less than 600px wide
 * @param {*} props
 */
const ShareButtonGroup = props => (
  <div className={_.ShareButtonGroup}>
    <p className={_.text}>{props.title}</p>
    <FacebookButton url={props.url} description={props.description} />
    <TwitterButton url={props.url} description={props.description} />
    <WhatsAppButton url={props.url} description={props.description} />
  </div>
)

ShareButtonGroup.propTypes = {
  /** The URL to share (usually the url of a custom sharing server) */
  url: PropTypes.string.isRequired,
  /** The text displayed above the share buttons */
  title: PropTypes.string.isRequired,
  /** Twitter and WhatsApp accept a description that is added to the post content of the user */
  description: PropTypes.string.isRequired
}

export default ShareButtonGroup
