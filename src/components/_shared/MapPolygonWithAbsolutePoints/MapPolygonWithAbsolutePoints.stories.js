import React from 'react';
import * as colors from 'global_styles/colors';
import Map from '../Map/Map';
import MapPolygonWithAbsolutePoints from './MapPolygonWithAbsolutePoints';

export default {
  title: 'II Components/Map/MapPolygonWithAbsolutePoints',
  component: MapPolygonWithAbsolutePoints,
};

export const AtBottomRight = (args) => {
  const polygonProps = {
    positionsOnMap: [{ lat: 52.49, lng: 13.4 }],
    pointCalculationFunctions: [
      ({ width, height }) => ({ x: width * 0.8, y: height }),
      ({ width, height }) => ({ x: width * 0.8 + 10, y: height }),
    ],
  };

  return (
    <Map>
      <MapPolygonWithAbsolutePoints {...args} {...polygonProps} />
    </Map>
  );
};
AtBottomRight.args = {
  fillColor: colors.darkGrey,
  color: colors.darkGrey,
  fillOpacity: 1,
  weight: 1,
};

export const AtTopRight = (args) => {
  const polygonProps = {
    positionsOnMap: [{ lat: 52.49, lng: 13.4 }],
    pointCalculationFunctions: [
      ({ width, height }) => ({ x: width * 0.8, y: 0 }),
      ({ width, height }) => ({ x: width * 0.8 + 10, y: 0 }),
    ],
  };

  return (
    <Map>
      <MapPolygonWithAbsolutePoints {...args} {...polygonProps} />
    </Map>
  );
};
AtTopRight.args = {
  fillColor: colors.darkGrey,
  color: colors.darkGrey,
  fillOpacity: 1,
  weight: 1,
};

export const AtLeftCenter = (args) => {
  const polygonProps = {
    positionsOnMap: [{ lat: 52.49, lng: 13.4 }],
    pointCalculationFunctions: [
      ({ width, height }) => ({ x: 0, y: height / 2 }),
      ({ width, height }) => ({ x: 0, y: height / 2 + 10 }),
    ],
  };

  return (
    <Map>
      <MapPolygonWithAbsolutePoints {...args} {...polygonProps} />
    </Map>
  );
};
AtLeftCenter.args = {
  fillColor: colors.darkGrey,
  color: colors.darkGrey,
  fillOpacity: 1,
  weight: 1,
};

export const MultiplePointsOnMap = (args) => {
  const polygonProps = {
    positionsOnMap: [
      { lat: 52.49, lng: 13.4 },
      { lat: 52.52, lng: 13.5 },
    ],
    pointCalculationFunctions: [
      ({ width, height }) => ({ x: 0, y: height / 2 }),
    ],
  };

  return (
    <Map>
      <MapPolygonWithAbsolutePoints {...args} {...polygonProps} />
    </Map>
  );
};
MultiplePointsOnMap.args = {
  fillColor: 'transparent',
  color: colors.darkGrey,
  fillOpacity: 1,
  weight: 1,
};
