# Shared Components and Code

This is to collect reusable react Components and other code sippets
that are reused in different rbb-data projects.

## Component Conventions

### Structure

Dependencies should be provided as `props` or be contained in the components folder.  

*Components should not depend on any global variables such as `context` or stores.*  
An exeption to this rule are components that rely on the [context provided by the react-leaflet Map component](https://react-leaflet.js.org/docs/en/intro.html#component-context). Those Components names should be prepended with Map (e.g. MapSearchResultMarker) and state this dependency in the `README.md`

#### index.js

Every subfolder in `/components` must have an `ComponentName.js` that contains an [react.js](https://reactjs.com/)
component.  
The component should be the default export in the file so it can be imported like this:

```js
import ComponentName from './src/shared/components/ComponentName'
```

#### README.md

Every subfolder in `/components` must have an `README.md` and or a `ComponentName.stories.js`
file that provides a description of the component and documentation on how to use the component.

#### styles.sass (optional)

The styles for the component.

### Webpack / CSS Modules

To write the components we use [jsx](https://reactjs.org/docs/introducing-jsx.html).
To encapsulate the styles of a component we use [css-modules](https://github.com/css-modules/css-modules) and [sass](http://sass-lang.com/) as a css preprocessor.
