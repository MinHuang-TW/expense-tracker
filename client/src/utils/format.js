export function numberEuro(x) {
  return x.toString()
    .replace(/\./, ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function numberValid(x) {
  return /^(\d+|\d{1,3}(\.\d{3})*)(,\d{1,2})?$/.test(x);
}

export function numberCalc(x) {
  return Number(x.replace(/\./g, '').replace(/,/, '.'));
}

export function formatDate(date) {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [day, month, year].join('/');
}

export function newDateArr(date) {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [String(year), month, day];
}

export function dbDateArr(date) {
  return date.slice(0, 10).split('-');
}

function getMondayOfCurrentWeek(d) {
  var day = d.getDay();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + (day === 0 ? -6 : 1) - day);
}

function getSundayOfCurrentWeek(d) {
    var day = d.getDay();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + (day === 0 ? 0 : 7) - day);
}

export function checkWeek(data) {
  const parsedData = Date.parse(data);
  const today = new Date();
  const monday = getMondayOfCurrentWeek(today);
  const sunday = getSundayOfCurrentWeek(today);

  if (parsedData >= monday && parsedData <= sunday) return true;
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