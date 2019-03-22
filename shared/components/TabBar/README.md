# Tab Bar

Renders an info gauge that's useful for visualizing balances between two dimesions

## Parameters

| Param | Type | Description |
| --- | --- | --- |
| id | `String` | internally this uses radio inputs. Every input will get an this id plus an index |
| class | `String` | A className for the component |
| title | `String` | shown when hovering over the component |
| selectedValue | `Any` | the highlighted value (compared with the `value` part in `options`) |
| options | `Array` | of `Object`s each with a `value` and `display` property. |

## Example

**Code**

```jsx
const tabBarProps = {
  id: 'school-type-filter',
  class: 'school-selector',
  title: 'nach Schultyp filtern',
  selectedValue: 'all',
  options: [
    { value: 'all', display: 'Alle Schultypen' },
    { value: 'gymnasien', display: 'Gymnasium' },
    { value: 'integrierte-sekundarschule', display: 'Integrierte Sekundarschule' }
  ]
}

<TabBar {...tabBarProps} onChange={this.handleSelectSchoolType} />
```

**Screenshot**

![](./example.png)