export function camelCaseToSentenceCase (text) {
  var result = text.replace( /([A-Z])/g, " $1" );
  var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
}


export function ifDateBetween(check, from, to){
  return ((check.getTime() <= to.getTime() && check.getTime() >= from.getTime()))
}

export function ifDateUpcoming(check, upcoming){
  return (check.getTime() <= upcoming.getTime())
}

export function ifDatePast(check, past){
  return (check.getTime() > past.getTime())
}

export function countDaysBetweenDate(firstDate, secondDate){
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  return Math.round(Math.abs((firstDate - secondDate) / oneDay))
}

export function getDatesBetweenRange(startDate, endDate, steps = 1) {
  const dateArray = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate));
    // Use UTC date to prevent problems with time zones and DST
    currentDate.setUTCDate(currentDate.getUTCDate() + steps);
  }

  return dateArray;
}
