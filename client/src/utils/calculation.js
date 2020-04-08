import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export function getGreeting(d) {
  const hour = moment(d).hour();
  if (hour < 4) return 'night';
  if (hour < 13) return 'morning';
  if (hour < 18) return 'afternoon';
  if (hour < 24) return 'evening';
  return 'day';
}

export function checkDayTime(d) {
  const hour = moment(d).hour();
  if (hour > 3 && hour < 18) return true;
  return false;
}

export function checkDay(d) {
  const start = moment().startOf('day');
  const end = moment().endOf('day');
  const date = moment(d);
  const range = moment().range(start, end);

  if (date.within(range)) return true;
  return false;
}

export function checkWeek(d) {
  const sunday = moment().startOf('week');
  const saturday = moment().endOf('week');
  const date = moment(d);
  const range = moment().range(sunday, saturday);

  if (date.within(range)) return true;
  return false;
}

export function checkMonth(d) {
  const fistday = moment().startOf('month');
  const lastday = moment().endOf('month');
  const date = moment(d);
  const range = moment().range(fistday, lastday);

  if (date.within(range)) return true;
  return false;
}

export function checkYear(d) {
  const fistday = moment().startOf('year');
  const lastday = moment().endOf('year');
  const date = moment(d);
  const range = moment().range(fistday, lastday);

  if (date.within(range)) return true;
  return false;
}

export function sortDateDsc(a, b) {
  let dateA = new Date(a.date);
  let dateB = new Date(b.date);
  
  if (dateA < dateB) return 1;
  if (dateA > dateB) return -1;
  return 0;
}

export function sortDateAsc(a, b) {
  let dateA = new Date(a.date);
  let dateB = new Date(b.date);
  
  if (dateA < dateB) return -1;
  if (dateA > dateB) return 1;
  return 0;
}

export function sortAmountDsc(a, b) {
  if (a.amount < b.amount) return 1;
  if (a.amount > b.amount) return -1;
  return 0;
}

export function sortAmountAsc(a, b) {
  if (a.amount < b.amount) return -1;
  if (a.amount > b.amount) return 1;
  return 0;
}