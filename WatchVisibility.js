import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Watches an element, and sets a prop 'visibility'.
 * Sets the estimated percent of the element visible in the viewport.
 *
 * To use, wrap your export with this function. Ex:
 *
 * export default WatchVisibility(MyFavoriteComponent);
 */
var WatchVisibility = (ComposedComponent, StopWatchingOnVisible = false, CheckInterval = 300) => class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visibility: 0
    };

    this.checkInterval = null;
    this.element = null;
    this.runLoop = true;
  }

  checkVisibility = () => {
    var rect = this.element.getBoundingClientRect();
    var containmentRect = {
      top: 0,
      left: 0,
      bottom: window.innerHeight || document.documentElement.clientHeight,
      right: window.innerWidth || document.documentElement.clientWidth
    };

    var visibility = 0;

    if (rect.top >= 0 && rect.bottom < containmentRect.bottom) {
      visibility = 100;
    } else if (rect.top > containmentRect.bottom) {
      visibility = 0;
    } else {
      visibility = (rect.bottom / containmentRect.bottom) * 100;
    }

    visibility = Math.max(0, Math.round(visibility));
    visibility = Math.min(100, visibility);

    if (visibility !== this.state.visibility && this.runLoop) {
      this.setState({
        visibility: visibility
      });
    }

    if (visibility > 0 && StopWatchingOnVisible) {
      this.runLoop = false;
    }
  };

  loop = () => {
    this.checkVisibility();

    // We may need to rate limit this for performance.
    if (this.runLoop) {
      requestAnimationFrame(this.loop);
    }
  };

  componentDidMount() {
    this.element = ReactDOM.findDOMNode(this);
    this.loop();
  }

  componentWillUnmount() {
    this.runLoop = false;
  }

  render() {
    return <ComposedComponent {...this.props} visibility={ this.state.visibility } />;
  }
};

export default WatchVisibility;
