import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import calendar from './calendar';
import dailies from './dailies';
import display from './display';
import mounts from './mounts';
import notification from './notification';
import thunderstruck from './thunderstruck';
import tradepacks from './tradepacks';

const rootReducer = (history) => combineReducers({
  dailies,
  display,
  calendar,
  mounts,
  notification,
  router: connectRouter(history),
  thunderstruck,
  tradepacks,
});

export const getLocalData = {
  dailies: ({ dailies }) => dailies,
  calendar: ({ calendar }) => calendar,
  display: ({ display }) => display,
  mounts: ({ mounts }) => mounts,
  thunderstruck: ({ thunderstruck }) => thunderstruck,
  tradepacks: ({ tradepacks }) => tradepacks,
};

export default rootReducer;
