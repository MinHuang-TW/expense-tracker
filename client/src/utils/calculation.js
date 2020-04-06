import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export function checkDay(d) {
  const start = moment().startOf('day');
  const end = moment().endOf('day');
  const today = moment(d);
  const range = moment().range(start, end);

  if (today.within(range)) return true;
  return false;
}

export function checkWeek(d) {
  const sunday = moment().startOf('week');
  const saturday = moment().endOf('week');
  const today = moment(d);
  const range = moment().range(sunday, saturday);

  if (today.within(range)) return true;
  return false;
}

export function checkMonth(d) {
  const fistday = moment().startOf('month');
  const lastday = moment().endOf('month');
  const today = moment(d);
  const range = moment().range(fistday, lastday);

  if (today.within(range)) return true;
  return false;
}

export function checkYear(d) {
  const fistday = moment().startOf('year');
  const lastday = moment().endOf('year');
  const today = moment(d);
  const range = moment().range(fistday, lastday);

  if (today.within(range)) return true;
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
  let amountA = a.amount;
  let amountB = b.amount;

  if (amountA < amountB) return 1;
  if (amountA > amountB) return -1;
  return 0;
}

export function sortAmountAsc(a, b) {
  let amountA = a.amount;
  let amountB = b.amount;

  if (amountA < amountB) return -1;
  if (amountA > amountB) return 1;
  return 0;
}