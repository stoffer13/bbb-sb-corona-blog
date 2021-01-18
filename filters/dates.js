/*
A date formatter filter for Nunjucks
*/
module.exports = function(date, part) {
  var d = new Date(date);
  if(part == 'year') {
    return d.getUTCFullYear();
  }
  var month = [
    "Januar",
    "Februar",
    "Marts",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "December"
  ];
  return d.getDate() + ". " + month[d.getMonth()] + " " + d.getUTCFullYear();
}
