import {
  AppBar,
  CircularProgress,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import {
  fetchEvents,
  fetchEventTypes,
} from 'actions/gameData';
import {
  clearAlerts,
  getReminderMessage,
  getStartMessage,
  setRegion,
  setVolume,
  speak,
} from 'actions/schedule';
import cn from 'classnames';
import AdContainer from 'components/AdContainer';
import IfPerm from 'components/IfPerm';
import { REGIONS } from 'constants/myGame';
import {
  ALERT_CUE,
  ALERT_OPTIONS,
  CARGO_ID,
  EVENT_TYPE_OTHER,
  SCHEDULE_COLS,
  VOLUME_DEFAULT,
} from 'constants/schedule';
import debounce from 'lodash.debounce';
import moment from 'moment-timezone';
import {
  equals,
  pathOr,
} from 'ramda';
import React, { Component } from 'react';
import {
  bool,
  func,
  number,
  object,
  string,
} from 'react-proptypes';
import { connect } from 'react-redux';
import {
  deepCopy,
  objectHasProperties,
} from 'utils/object';
import {
  getDayKey,
  getReminderTime,
  hhmmssToInt,
  hhmmssToIntNoPrecision,
} from 'utils/schedule';
import { setTitle } from 'utils/string';
import CargoShip from './CargoShip';
import EditEvent from './EditEvent';
import EventList from './EventList';
import InGameTime from './InGameTime';
import Volume from './Volume';

class Schedule extends Component {
  static propTypes = {
    region: string,
    clearAlerts: func.isRequired,
    hasAlerts: bool,
    fetchEvents: func.isRequired,
    fetchEventTypes: func.isRequired,
    events: object,
    volume: number,
    alerts: object,
    speak: object,
    doSpeak: func.isRequired,
    getStartMessage: func.isRequired,
    getReminderMessage: func.isRequired,
    setVolume: func.isRequired,
    setRegion: func.isRequired,
    eventTypes: object,
    mobile: bool,
  };

  static defaultProps = {
    region: REGIONS.NA,
    hasAlerts: false,
  };

  state = {
    events: [],
    width: 0,
    editOpen: false,
    editId: null,
    showDisabled: false,
    interacted: null,
  };

  alerts = {};

  ref = React.createRef();

  interval = null;

  componentDidMount() {
    const { fetchEventTypes, fetchEvents, events, region, hasAlerts, volume } = this.props;
    fetchEventTypes();
    fetchEvents();

    if (objectHasProperties(events)) {
      this.setupEvents(events, region);
    }

    window.addEventListener('resize', this._handleResize);

    // preload audio cues
    Object.values(ALERT_CUE).forEach(cue => {
      const alert = new Audio(cue.file);
      this.alerts[cue.name] = alert;
      alert.load();
      alert.setVolume = (volume) => {
        this.volume = volume / 100;
      };
      alert.setVolume(volume || VOLUME_DEFAULT);
    });

    // test for page interaction, otherwise display an error banner
    if (hasAlerts) {
      this.playCue(ALERT_CUE.TEST);
    }
  }

  UNSAFE_componentWillUpdate(nextProps) {
    const { events, region } = nextProps;

    if (!equals(events, this.props.events) || region !== this.props.region) {
      this.setupEvents(events, region);
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    window.removeEventListener('resize', this._handleResize);
    window.removeEventListener('click', this.confirmInteraction);
  }

  playCue = (cue) => {
    const { interacted } = this.state;

    const alert = this.alerts[cue.name];
    alert.pause();
    alert.currentTime = 0;
    alert
    .play()
    .then(() => {
      if (!interacted) {
        this.setState({ interacted: true });
      }
    })
    .catch(() => {
      this.setState({ interacted: false });
      window.addEventListener('click', this.confirmInteraction);
    });
  };

  confirmInteraction = () => {
    window.removeEventListener('click', this.confirmInteraction);
    this.setState({ interacted: true }, () => this.playCue(ALERT_CUE.TEST));
  };

  setupEvents = (events, region) => {
    this.handleResize();
    events = Object.values(events);
    if (!this.state.showDisabled) {
      events = events.filter(e => !e.disabled);
    }
    events = events.map(this.calculateNextStart(region));
    events.sort(this.sortEvents);
    this.setState({ events }, () => {
      if (!this.interval) {
        this.interval = setInterval(this.doTick, 1000);
        this.doTick();
      }
    });
  };

  calculateNextStart = (region) => (event) => {
    const now = moment.utc().milliseconds(0);
    let { times } = event;
    let activeTime = null;
    let nextTime = {};

    // skip if there are no times
    if (!times) return;

    // only look through one region's times
    times = times.filter(time => !time.region || time.region === (region)).sort((a, b) => hhmmssToIntNoPrecision(a.time) - hhmmssToIntNoPrecision(b.time));
    if (times.length > 0) {
      // duplicate the last occurrence to yesterday
      const lastTime = deepCopy(times[times.length - 1]);
      lastTime.yesterday = true;
      const firstTime = deepCopy(times[0]);
      firstTime.tomorrow = true;

      times.unshift(lastTime);
      // also duplicate the first time to the end
      times.push(firstTime);
    }

    // loop through times until we get to the time that starts
    times.forEach(occurrence => {
      const { days, time, duration, yesterday, tomorrow } = occurrence;

      // create the start time from 00:00:00 format
      const [hh, mm, ss] = time.split(':');
      const startTime = moment.utc().hour(hh).minute(mm).second(ss).milliseconds(0);

      // modify yesterday/tomorrow times
      if (yesterday === true) {
        startTime.subtract(1, 'day');
      }
      if (tomorrow === true) {
        startTime.add(1, 'day');
      }

      // create the end time by adding a duration from 00:00:00 format to start time
      const endTime = moment(startTime);
      if (duration) {
        const [hh, mm, ss] = duration.split(':');
        endTime.add(hh, 'hours').add(mm, 'minutes').add(ss, 'seconds');
      }

      // if the event only starts on specific days, we need to move it to that day first
      while (days.length > 0 && !days.includes(getDayKey(startTime.day()))) {
        // subtract days for yesterday occurrences
        startTime.add(yesterday ? -1 : 1, 'day');
        endTime.add(yesterday ? -1 : 1, 'day');
      }

      // add times to object
      occurrence.startTime = startTime;
      occurrence.endTime = endTime;

      // check if an event is active right now
      if (startTime.isSameOrBefore(now) && endTime.isAfter(now)) {
        // event is active
        activeTime = occurrence;
      }

      // times are sorted, so find the next occurrence that is after right now as the next time
      if (startTime.isAfter(now) && (!nextTime.startTime || nextTime.startTime.isAfter(startTime))) {
        nextTime = occurrence;
      }
    });

    if (activeTime) {
      event.timer = activeTime.endTime;
    } else {
      event.timer = nextTime.startTime;
    }

    event.activeTime = activeTime;
    event.nextTime = nextTime;

    return event;
  };

  sortEvents = (a, b) => {
    if (a.activeTime || b.activeTime) {
      if (a.activeTime && !b.activeTime) {
        return -1;
      }
      if (!a.activeTime && b.activeTime) {
        return 1;
      }
    }
    if (!a.timer && b.timer) return 1;
    if (a.timer && !b.timer) return -1;
    if (!a.timer && !b.timer) return 0;
    const diff = a.timer.diff(b.timer);
    if (diff === 0) {
      if (a.name > b.name) return 1;
      if (b.name > a.name) return -1;
    }
    return diff;
  };

  doTick = () => {
    const { alerts, speak, doSpeak, getStartMessage, getReminderMessage } = this.props;
    const { events } = this.state;
    const now = moment.utc().milliseconds(0);

    let sort = false;
    let cue = null;
    let alertQueue = [];

    const triggerAlert = (value) => {
      if (moment().month() === 3 && moment().date() === 1) value = ALERT_CUE.OTHER;

      if (!cue || cue.priority < value.priority) {
        cue = value;
      }
    };

    events.forEach((event, i) => {
      // calculate alert
      const eventAlerts = pathOr([], [event.id])(alerts);
      const isSpeak = pathOr(false, [event.id])(speak);
      const startDiff = event.nextTime.startTime && event.nextTime.startTime.diff(now);
      eventAlerts.forEach(alert => {
        if (startDiff === getReminderTime(event.nextTime, ALERT_OPTIONS[alert]) * 1000) {
          if (startDiff === 0) {
            if (event.eventType === EVENT_TYPE_OTHER) {
              triggerAlert(ALERT_CUE.START_OTHER);
            } else {
              triggerAlert(ALERT_CUE.START);
            }
            if (isSpeak) {
              alertQueue.push(getStartMessage(event, event.nextTime));
            }
          } else {
            triggerAlert(ALERT_CUE.REMINDER);
            if (isSpeak) {
              alertQueue.push(getReminderMessage(event, event.nextTime));
            }
          }
        }
      });

      // check if event timer is ended to start the next timer
      if (event.timer && now.isSameOrAfter(event.timer)) {
        events[i] = this.calculateNextStart(this.props.region)(event);
        sort = true;
      }
    });

    // play the cue
    if (cue) {
      this.playCue(cue);
    }
    let delay = 0;
    if (cue && alertQueue.length > 0) {
      delay = 500;
    }

    if (alertQueue.length > 0) {
      setTimeout(() => {
        alertQueue.forEach(message => doSpeak(message));
      }, delay);
    }

    if (sort) {
      events.sort(this.sortEvents);
    }

    this.setState({ events, now });
  };

  handleResize = () => {
    const { width } = this.ref.current.getBoundingClientRect();
    this.setState({ width });
  };

  _handleResize = debounce(this.handleResize, 100);

  setEditOpen = (editOpen, editId) => () => {
    this.setState({ editOpen, editId });
  };

  setShowDisabled = (showDisabled) => () => {
    const { events, region } = this.props;

    this.setState({ showDisabled }, () => this.setupEvents(events, region));
  };

  setVolume = (e, volume) => {
    this.props.setVolume(volume);
    Object.values(this.alerts).forEach(alert => alert.setVolume(volume));
    this.playCue(ALERT_CUE.REMINDER);
  };

  _setVolume = debounce(this.setVolume, 75);

  render() {
    const { region, setRegion, eventTypes, mobile, hasAlerts, clearAlerts } = this.props;
    const { events, width, editOpen, editId, showDisabled, interacted } = this.state;

    // add the cargo ship timer
    const eventTypeList = Object.values(eventTypes);
    {/*eventTypeList.push({ id: CARGO_ID, name: 'Cargo Ship', icon: 'exploration' });*/}

    // max cols = 3
    // min cols = 1
    // min col size = 350
    const cols = Math.max(Math.min(Math.floor(width / 350), 3), 1);
    const colWidth = Math.round(10000 / cols) / 100;

    setTitle('Event Schedule');

    return (
      <div className="schedule-container">
        {interacted === false &&
        <div className="section">
          <Alert severity="error" variant="filled" onClose={() => null}>
            <AlertTitle>Playback Error</AlertTitle>
            Alert sounds cannot play until you interact with the page. Simply close this message to interact.
          </Alert>
        </div>}
        <Paper className="section">
          <AppBar position="static">

          </AppBar>
        </Paper>
        {mobile &&
        <AdContainer type="feed" />}
        <div className={cn('section', 'schedule-categories')} ref={this.ref}>
          {!objectHasProperties(eventTypes) &&
          <CircularProgress size={64} color="primary" style={{ width: 'center' }} />}
          {Array.from(Array(cols)).map((_, col) => (
            <div className="schedule-column" style={{ width: `${colWidth}%` }} key={`event-col-${col}`}>
              {col === 0 && mobile && <InGameTime mobile={mobile} />}
              {Object.values(eventTypeList)
              // .filter((type, i) => (i + (cols === 2 && i > 1 && i < 4 ? 1 : 0)) % cols === col)
              .filter((_, i) => SCHEDULE_COLS[cols][col].includes(i))
              .map(type =>
                type.id === CARGO_ID
                  ? (<CargoShip key={`event-list-${type.id}`} playCue={this.playCue} />)
                  : (
                    <EventList
                      key={`event-list-${type.id}`}
                      {...type}
                      events={events.filter(e => e.eventType === type.id)}
                      onEdit={this.setEditOpen}
                      region={region}
                    />
                  ))}
            </div>
          ))}
        </div>
        <EditEvent
          onClose={this.setEditOpen(false, null)}
          open={editOpen}
          id={editId}
        />
        <AdContainer type="horizontal" />
      </div>
    );
  }
}

const mapStateToProps = ({ calendar: { region, alerts, speak, volume }, gameData: { events, eventTypes }, display: { mobile } }) => ({
  region,
  mobile,
  events,
  eventTypes,
  alerts,
  hasAlerts: objectHasProperties(alerts) && Object.values(alerts).map(a => a.length || 0).reduce((a, b) => a + b, 0) > 0,
  speak,
  volume,
});

const mapDispatchToProps = {
  setRegion,
  fetchEventTypes,
  fetchEvents,
  clearAlerts,
  setVolume,
  doSpeak: speak,
  getStartMessage,
  getReminderMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
