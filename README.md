# React Context Data

- React data flow solution with context API, support React 16.3.0+
- Easier than Redux

## Usage

```jsx
import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore, Provider, withStore } from 'react-context-data'

const Demo = ({ num, addNum }) => (
  <div>
    <div>{num}</div>
    <button onClick={addNum}>Add Number</button>
  </div>
)

const DemoWithStore = withStore({
  mapActionsToProps: {
    addNum() {
      this.setState(prevState => ({ num: prevState.num + 1 }))
    },
  },
  mapStateToProps(state, ownProps) {
    return { num: state.num }
  },
  // if `watch` is not specified, component will re-render when any state changes
  // watch: ['num'],
})(Demo)

const App = () => (
  <Provider store={createStore({ num: 0 })}>
    <DemoWithStore />
  </Provider>
)

render(<App />, document.getElementById('app-root'))
```

# License

MIT
