import React, { Component } from 'react';
import {
  Fab,
  Zoom,
} from '@material-ui/core';
import { ExpandLess } from '@material-ui/icons';

class ScrollToTop extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    scrollY: 0,
    height: window.innerHeight,
  };

  handleWindowScroll = () => {
    this.setState({ scrollY: document.documentElement.scrollTop });
  };

  handleWindowResize = () => {
    this.setState({ height: window.innerHeight });
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleWindowScroll);
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll);
    window.removeEventListener('resize', this.handleWindowResize);
  }

  render() {
    const { scrollY, height } = this.state;

    return (
      <Zoom in={scrollY >= height * 0.85} unmountOnExit>
        <Fab
          color="primary"
          className="fab"
          onClick={() => document.getElementById('app').scrollIntoView({ behavior: 'smooth', block: 'start' })}
        >
          <ExpandLess />
        </Fab>
      </Zoom>
    );
  }
}

export default ScrollToTop;
