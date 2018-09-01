import React, { Component } from 'react'
import StoreContext from './context'

export default function withStore(options = {}) {
  const { watch = [], mapActionsToProps, mapStateToProps } = options
  return WrappedComp =>
    class StateComponent extends Component {
      componentDidMount() {
        this.updateHandler = (oldState, newState) => {
          if (watch.length === 0) {
            this.forceUpdate()
          } else {
            const needUpdate = watch.some(prop => newState[prop] !== oldState[prop])
            if (needUpdate) {
              this.forceUpdate()
            }
          }
        }
        this.store.listen(this.updateHandler)
      }

      componentWillUnmount() {
        this.store.unlisten(this.updateHandler)
      }

      actions = null

      renderConsumer = store => {
        this.store = store
        if (!this.actions && typeof mapActionsToProps === 'object' && mapActionsToProps !== null) {
          for(const func in mapActionsToProps) {
            mapActionsToProps[func] = mapActionsToProps[func].bind(store)
          }
          this.actions = mapActionsToProps
        }

        let state
        if (typeof mapStateToProps === 'function') {
          state = mapStateToProps(store.getState(), this.props)
        }

        return <WrappedComp {...this.props} {...state} {...this.actions} store={store} />
      }

      render() {
        return (
          <StoreContext.Consumer>
            {this.renderConsumer}
          </StoreContext.Consumer>
        )
      }
    }
}
