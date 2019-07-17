export default function (event) {
  if (process.env.REACT_APP_ANALYTICS_ENABLED && typeof window.callAnalytics === 'function') {
    window.callAnalytics('pi', process.env.REACT_APP_ANALYTICS_NAME, event)
  }
}
