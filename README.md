# react-vizibility-watcher
An higher order component that watches a components visibility and sets a prop

# Install
`npm install react-vizibility-watcher`

# Demo
http://www.kyleswanson.org/projects/visibility/

<!-- ![Watch Me Scroll!](http://www.kyleswanson.org/images/reactVizGif.gif) -->

# Example
```javascript
import WatchVisibility from 'react-vizibility-watcher';

const WatchedComponent = props => {
  const {visibility} = props;
  // visibility is supplied by the WatchVisibility wrapper below.

  return <h1>{ `I am ${Math.round(visibility)}% visible` }</h1>;
};
const SayMyVisibility = WatchVisibility(WatchedComponent);

// Now just include <SayMyVisibility /> in the component of your choice!
```
