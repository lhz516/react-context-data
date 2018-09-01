import React from 'react'
import PropTypes from 'prop-types'
import StoreContext from './context'

const StoreProvider = ({ store, children }) => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
)

StoreProvider.propTypes = {
  children: PropTypes.element.isRequired,
  store: PropTypes.object.isRequired,
}

export default StoreProvider
