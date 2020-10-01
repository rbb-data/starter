import Chroma from 'chroma-js'
import { adjustHue, darken, lighten, tint } from 'polished'
import * as colors from './colors'

export const diverging = {
  changes: Chroma.scale([
    lighten(0.05, '#6374C9'),
    colors.beige,
    darken(0.1, colors.orange),
  ]),
  cyanYellow: Chroma.scale([
    lighten(0.05, colors.darkCyan),
    colors.lightCyan,
    colors.beige,
    colors.yellow,
    darken(0.15, adjustHue(-2, '#ebb600')),
  ]).mode('lab'),
  greenMagenta: Chroma.scale([
    darken(0.1, '#5d8421'),
    darken(0.1, adjustHue(5, colors.lightGreen)),
    colors.beige,
    colors.magenta,
    darken(0.02, colors.darkMagenta),
  ]).mode('lab'),
}

export const linear = {
  cyanBlue: Chroma.scale([
    lighten(0.1, colors.beige),
    colors.backgroundCyan,
    colors.lightCyan,
    colors.blue,
    colors.darkBlue,
  ])
    .correctLightness()
    .mode('lab'),
  yellowGreen: Chroma.scale([
    lighten(0.1, colors.beige),
    tint(0.5, colors.backgroundYellow),
    colors.green,
    darken(0.18, '#5d8421'),
  ])
    .correctLightness()
    .mode('lab'),
  yellowMagenta: Chroma.scale([
    lighten(0.1, colors.beige),
    tint(0.5, colors.backgroundYellow),
    colors.magenta,
    darken(0.1, colors.darkMagenta),
  ])
    .correctLightness()
    .mode('lab'),
  no2: Chroma.bezier(['#B6D61B', '70B50F', '#E2430D', 'E30F04', '000']).scale(),
}
