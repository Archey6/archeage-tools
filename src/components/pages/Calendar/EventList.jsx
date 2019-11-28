import React, { Component } from 'react';
import {
  bool,
  string,
} from 'react-proptypes';
import {
  AppBar,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { HelpOutlineRounded } from '@material-ui/icons';
import { EVENT_TYPE } from 'constants/calendar';
import {
  GAME_TIME_EVENTS,
  REAL_TIME_EVENTS,
} from 'data/calendar';
import EventCard from './EventCard';

class EventList extends Component {
  static propTypes = {
    type: string.isRequired,
    regionNA: bool,
  };

  static defaultProps = {
    regionNA: true,
  };

  state = {
    times: {},
  };

  setTime = (event, time) => {
    const oldTimes = this.state.times;
    const times = { ...oldTimes, [event]: time };

    this.setState({ times });
  };

  sortEvents = (a, b) => {
    const { times } = this.state;
    const timeA = times[a.name];
    const timeB = times[b.name];

    // times not loaded yet
    if (!timeA || !timeB) return 0;

    let startTimeA = timeA.next.time;
    let startTimeB = timeB.next.time;

    if (timeA.running || timeB.running) {
      if (timeA.running && !timeB.running) {
        return -1;
      }
      if (!timeA.running && timeB.running) {
        return 1;
      }

      startTimeA = timeA.running.ends || timeA.running.time;
      startTimeB = timeB.running.ends || timeB.running.time;
    }

    return startTimeA - startTimeB;
  };

  render() {
    const { type, regionNA } = this.props;

    let events = [];
    switch (type) {
      case EVENT_TYPE.REAL_TIME_EVENT:
        events = [...REAL_TIME_EVENTS.filter(event => event.type === type)];
        break;
      case EVENT_TYPE.GAME_TIME_EVENT:
        events = [...GAME_TIME_EVENTS];
        break;
      case EVENT_TYPE.WORLD_BOSSES:
        events = [...REAL_TIME_EVENTS.filter(event => event.type === type)];
        break;
      default:
    }

    return (
      <Paper className="event-list">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="subtitle1" className="title-text">{type}</Typography>
            {type === EVENT_TYPE.GAME_TIME_EVENT &&
            <Tooltip title={
              <React.Fragment>
                <Typography>In-Game Time</Typography>
                <Typography variant="caption" component="p">In-Game Time estimation is approximate. All servers may vary
                  by a minute or so.</Typography>
                <Typography variant="caption" component="p">Each in-game hour spans 10 minutes of real-life time, with a
                  full in-game day occurring in 4 hours of real-life time.</Typography>
                <Typography variant="caption" component="p">Events and bosses spawn at the specified time, but may be
                completed or killed by other players before the timer's in-progress duration is over.</Typography>
              </React.Fragment>
            }>
              <HelpOutlineRounded
                style={{ cursor: 'help' }}
              />
            </Tooltip>}
          </Toolbar>
        </AppBar>
        {events
        .sort(this.sortEvents)
        .map(event => (
          <EventCard
            {...event}
            key={event.name}
            regionNA={regionNA}
            onUpdateTime={this.setTime}
            type={type}
          />),
        )}
      </Paper>
    );
  }
}

export default EventList;
