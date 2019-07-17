import React from 'react'
import PropTypes from 'prop-types'
import rbbColors from 'global_styles/colors.sass'
import _ from './BrandenburgCountiesMap.module.sass'

import geometries from './geometries.json'

/**
 * Renders a map of all counties in Brandenburg, allowing colorization of and
 * interaction with single counties.
 *
 */
export default function BrandenburgCountiesMap (props) {
  const {
    areaColor,
    selectedAreas,
    onAreaSelect
  } = props

  const makeProps = area => ({
    onClick: _ => onAreaSelect(area.id),
    fill: areaColor(area.id),
    key: area.id,
    id: area.id,
    d: area.path
  })

  const unselected = geometries
    .filter(area => selectedAreas.indexOf(area.id) === -1)
    .map(area => <path {...makeProps(area)} className={_.County} />)

  const selected = geometries
    .filter(area => selectedAreas.indexOf(area.id) !== -1)
    .map(area => <path {...makeProps(area)} className={`${_.County} ${_.selected}`} />)

  // the geometries.json was generated using mapshaper:
  //  mapshaper berlin_brandenburg_landkreise.geo.json -proj +proj=tmerc +lat_0=0 +lon_0=9 +k=1 +x_0=3500000 +y_0=0 +ellps=bessel +datum=potsdam +units=m +no_defs -o out.svg
  // the resulting out.svg is hand-edited
  return (
    <svg className={_.BrandenburgCounties}
      viewBox='0 0 800 791'>
      <defs>
        <filter id='shadow' x='0' y='0' width='200%' height='200%'>
          <feOffset result='offOut' in='SourceAlpha' dx='10' dy='10' />
          <feGaussianBlur result='blurOut' in='offOut' stdDeviation='8' />
          <feBlend in='SourceGraphic' in2='blurOut' mode='normal' />
        </filter>
      </defs>
      <g>{unselected}</g>
      <g filter='url(#shadow)'>{selected}</g>
    </svg>
  )
}

BrandenburgCountiesMap.propTypes = {
  /** areaColor is a function taking the county name as a parameter and
  *   returning a CSS color
  */
  areaColor: PropTypes.func,

  /** onAreaSelect takes a handler which gets called when a user clicks
  *   on a county
  */
  selectedAreas: PropTypes.arrayOf(PropTypes.string),

  /** selectedAreas is an array containing zero or more counties which will get
  *   the class "selected" that can be used to visually tell them apart
  */
  onAreaSelect: PropTypes.func
}

BrandenburgCountiesMap.defaultProps = {
  areaColor: _ => rbbColors.red,
  selectedAreas: [],
  onAreaSelect: Function.prototype
}
