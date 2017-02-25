// Node Environment (prod, dev, test, etc.)
// Used to determine which environment the app is currently running in.
export const NODE_ENV = process.env.NODE_ENV || 'dev'

export const API_URI_PREFIX = process.env.REACT_APP_API_URI_PREFIX || 'http://localhost:3001'
