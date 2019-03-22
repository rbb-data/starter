/**
 * Enables vue.js-like classMaps
 * @param  {[type]} classes [description]
 * @return {[type]}         [description]
 */
export default function reactClass (classes) {
  if (Array.isArray(classes)) {
    // meant for arrays like ['class', {'class2': false}, ...]
    return classes
      .filter(c =>
        // { className: true }, { className: false }
        (typeof c === 'object' && Object.values(c)[0] === true) ||
        // 'className'
        typeof c === 'string'
      )
      .map(c => typeof c === 'string' ? c : Object.keys(c)[0])
      .join(' ')
  } else if (typeof classes === 'object') {
    // {class1: true, class2: false}
    return Object.keys(classes).filter(k => classes[k]).join(' ')
  }

  throw new TypeError('Invalid configuration. Please pass in an array or an object.')
}
