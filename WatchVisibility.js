import React from 'react';
import ReactDOM from 'react-dom';
import {AddVisibilityWatcher, RemoveVisibilityWatcher} from './WatchVisibilityHelpers';

/**
 * Watches an element, and sets a prop 'visibility'.
 * Sets the estimated percent of the element visible in the viewport.
 *
 * To use, wrap your export with this function. Ex:
 *
 * export default WatchVisibility(MyFavoriteComponent);
 */
const WatchVisibility = (ComposedComponent, StopWatchingOnVisible = false) => class extends React.Component {
  constructor(props) {
    super(props);

    let visibility = 0;

    if (this.shouldWatch() === false) {
      visibility = 100;
    }

    this.state = {
      visibility: visibility
    };

    this.watcher = null;
  }

  shouldWatch() {
    return true;
  }

  onVisibilityChange = percentVisible => {
    if (percentVisible > 0 && StopWatchingOnVisible) {
      RemoveVisibilityWatcher(this.watcher);
      percentVisible = 100;
    }

    this.setState({
      visibility: percentVisible
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidMount() {
    if (this.shouldWatch()) {
      const element = ReactDOM.findDOMNode(this);
      this.watcher = AddVisibilityWatcher(element, this.onVisibilityChange);
    }
  }

  componentWillUnmount() {
    RemoveVisibilityWatcher(this.watcher);
  }

  render() {
    return <ComposedComponent {...this.props} visibility={ this.state.visibility } />;
  }
};

export default WatchVisibility;
