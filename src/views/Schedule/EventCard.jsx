import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import cn from 'classnames';
import IfPerm from 'components/IfPerm';
import Link from 'components/Link';
import moment from 'moment-timezone';
import React, { Component } from 'react';
import myStyle from "./EventCard.css";
import {
  array,
  bool,
  func,
  number,
  object,
  string,
} from 'react-proptypes';
import {
  getDay,
  getDayKey,
} from 'utils/schedule';
import { hhmmssFromDate } from 'utils/time';
import AlertSelect from './AlertSelect';

const createMoment = (time, day) => {
  const now = moment.utc().milliseconds(0);
  const [hh, mm, ss] = time.time.split(':');
  const startMoment = moment.utc().hour(hh).minute(mm).second(ss).millisecond(0);
  // don't show past occurrences today
  if (startMoment.isSameOrBefore(now)) {
    startMoment.add(1, 'day');
  }
  // skip days for day-specific times
  // eslint-disable-next-line no-unmodified-loop-condition
  while (day && day !== getDayKey(startMoment.day())) {
    startMoment.add(1, 'day');
  }
  return startMoment.tz(moment.tz.guess());
};

class EventCard extends Component {
  static propTypes = {
    id: number.isRequired,
    name: string.isRequired,
    icon: string.isRequired,
    eventType: number.isRequired,
    gameTime: bool,
    timer: object,
    activeTime: object,
    nextTime: object,
    link: string,
    onEdit: func.isRequired,
    region: string.isRequired,
    description: string,
    times: array,
    disabled: bool,
  };

  static defaultProps = {
    gameTime: false,
    timer: moment(),
    activeTime: {},
    nextTime: {},
    link: null,
  };

  state = {
    expanded: false,
  };

  toggleExpand = () => {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  };

  render() {
    const { id, name, icon, link, timer, activeTime, nextTime, onEdit, description, times, region, disabled } = this.props;
    const { expanded } = this.state;
    const filteredTimes = times.filter(time => !time.region || time.region === region);
    const now = moment.utc().milliseconds(0);
    const tz = moment.tz.guess();
    const running = Boolean(activeTime);
    let upcoming = 'Unknown';
    let label = 'Upcoming';
    let nextDay = null;
    let displayName = `${name}${nextTime.name ? `: ${nextTime.name}` : ''}`;

    if (nextTime.startTime) {
      const upcomingTime = nextTime.startTime.tz(tz);
      if (nextTime.days.length > 0 && nextTime.days.length < 7) {
        nextDay = getDay(upcomingTime.day());
      }
      const format = (upcomingTime.date() !== moment().date()) ? 'ddd h:mm A' : 'h:mm A';
      upcoming = upcomingTime.format(format);
    }

    if (running) {
      label = 'Next';
      if (activeTime.name) {
        upcoming = `${nextTime.name} at ${upcoming}`;
        displayName = `${name}${activeTime.name ? `: ${activeTime.name}` : ''}`;
      }
    }

    if (nextTime.gameTime) {
      upcoming += ` [${nextTime.gameTime.substr(0, 5)}]`;
    }

    const remainingTime = timer.diff(now);
    const remaining = (remainingTime >= 0) ? hhmmssFromDate(remainingTime) : '';

    let externalLink;

    if (this.props.link != null && this.props.link.startsWith("http")) {
      // eslint-disable-next-line react/jsx-no-target-blank
      externalLink = link ? <a style={ { cursor: "pointer" } } target="_blank" href={link}>{displayName} </a> : displayName
    } else {
      externalLink = link ? <Link target="_blank" to={link}>{displayName} </Link> : displayName
    }

    return (
      <Card square className="event-card">
        <CardHeader
          className={cn({ running, disabled })}
          avatar={
            <div style={{ position: 'relative' }}>
              {nextDay && <Tooltip title={nextDay}>
                <div className={`ev-day day-${nextDay}`} />
              </Tooltip>}
              <Avatar aria-label={name} src={`/images/event/${icon}.png`} className="event-icon" />
            </div>
          }
          title={externalLink}
          subheader={`${label}: ${upcoming}`}
          action={
            <div className="ev-status">
              <div className="ev-status-wrapper">
                {running && <div className="ev-status-in-progress" />}
                <Typography variant="caption">
                  {remaining}
                </Typography>
              </div>
              <div className="ev-btn">
                <IfPerm permission="event.edit">
                  <IconButton size="small" onClick={onEdit(true, id)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </IfPerm>
                <AlertSelect id={id} nextTime={nextTime} />
                <Tooltip title="See more times">
                  <IconButton size="small" onClick={this.toggleExpand}>
                    <ExpandMoreIcon className={cn('rotate-btn', { rotated: expanded })} />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          }
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit mountOnEnter>
          <CardContent>
            <Typography component="div">
              {Boolean(description) &&
              <p>{description}</p>}
              {nextTime.gameTime &&
              <p>The next occurrence is at the in-game time of {nextTime.gameTime.substr(0, 5)}.</p>}
              <Table size="small" stickyHeader className="timer-table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>
                      Upcoming Occurrences
                    </TableCell>
                    <TableCell align="right">
                      Countdown
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTimes
                  // need to create multiple entries for some that only have one or two time slots
                  .reduce((objTimes, time) => {
                    if (time.days.length < 7) {
                      time.days.forEach(day => {
                        objTimes.push({ ...time, day, startMoment: createMoment(time, day) });
                      });
                    } else if (filteredTimes.length > 3) {
                      objTimes.push({ ...time, startMoment: createMoment(time) });
                    } else {
                      // for events that happen every day with less than 3 time slots per day
                      // we want to show the next 3 occurrences
                      const next3Times = [];
                      time.days.forEach(day => {
                        next3Times.push({ ...time, day, startMoment: createMoment(time, day) });
                      });
                      next3Times.sort((a, b) => a.startMoment.diff(b.startMoment));
                      next3Times.splice(3);
                      objTimes = objTimes.concat(next3Times);
                    }
                    return objTimes;
                  }, [])
                  // sort entries
                  .sort((a, b) => a.startMoment.diff(b.startMoment))
                  // display entries
                  .map((time, i) => (
                    <TableRow key={`${name}-time-${i}`}>
                      <TableCell>
                        {time.startMoment.format('ddd h:mm A')}
                      </TableCell>
                      <TableCell>
                        {time.name}
                      </TableCell>
                      <TableCell align="right">
                        {hhmmssFromDate(time.startMoment.diff(now))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }

}



export default EventCard;
