import React from 'react';
import ReactDOM from 'react-dom';
import {AddVisibilityWatcher, RemoveVisibilityWatcher} from './Utils';

/**
 * Watches an element, and sets a prop 'visibility'.
 * Sets the estimated percent of the element visible in the viewport.
 *
 * To use, wrap your export with this function. Ex:
 *
 * export default WatchVisibility(MyFavoriteComponent);
 */
const WatchVisibility = (ComposedComponent) => class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visibility: 0
    };

    this.watcher = null;
  }

  onVisibilityChange = percentVisible => {
    if (percentVisible !== this.state.visibility) {
      this.setState({
        visibility: percentVisible
      });
    }
  };

  componentDidMount() {
    const element = ReactDOM.findDOMNode(this);
    this.watcher = AddVisibilityWatcher(element, this.onVisibilityChange);
  }

  componentWillUnmount() {
    RemoveVisibilityWatcher(this.watcher);
  }

  render() {
    return <ComposedComponent {...this.props} visibility={ this.state.visibility } />;
  }
};

export default WatchVisibility;
