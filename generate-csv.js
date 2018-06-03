const events = require('./events.json');
const fs = require('fs');

function s(str) {
  return JSON.stringify(String(str));
}

const bulk = 250;
for(i=0;i<events.length;i+=bulk) {
  let result = '';
  events.slice(i,i+bulk).forEach(o => {
    const enddate = (new Date((+new Date(o.startdate)) + (+new Date(o.starttime)) - (+new Date('2000-01-01')) + o.duration*60 * 1000)).toISOString();
    result += `${s(o.name)},${o.startdate},${o.starttime.slice(11,19)},${enddate.slice(0,10)},${enddate.slice(11,19)},Tinkuy,${s(o.description)}\n`;
  });
  fs.writeFileSync(`events-${i}.csv`, result);
}

