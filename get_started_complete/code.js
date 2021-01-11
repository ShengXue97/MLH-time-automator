

var thead = document.querySelector("table").childNodes[0];
var theadRows = (thead.querySelectorAll("tr"));
var theadCell = theadRows[0].appendChild(document.createElement('th'));
theadCell.innerHTML = Intl.DateTimeFormat().resolvedOptions().timeZone;

var tbody = document.querySelector("table").childNodes[1];
var rows = (tbody.querySelectorAll("tr"));
rows.forEach(row => {
    var cells = row.querySelectorAll("td");
    var [day, timezone1] = cells[0].innerText.split(" ");
    var [ETtime, am_pm, timezone2] = cells[2].innerText.split(" ");

    var td = row.appendChild(document.createElement('td'));

    var date = new Date('January 11, 2021 ' + ETtime + " " + am_pm);

    //5 because Eastern Tims is UTC - 5.
    var result = calcTime(date, 5, day);
    td.innerHTML = result;
    }
)


function convertDay(currentDay, dayDifference){
    const dayMappings = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    var newDay = dayMappings[(dayMappings.indexOf(currentDay) + dayDifference) % 7];
    return newDay;
}

function calcTime(date, offset, dayToCompare) {
    
    // add local time zone offset
    // get UTC time in msec
    const utc = date.getTime() + (3600000 * offset);
    // create new Date object for different city
    // using supplied offset
    const nd = new Date(utc - (60000 * date.getTimezoneOffset()));
    // return time as a string
    const utcDate = new Date(utc);
    const changedDay = convertDay(dayToCompare, nd.getDay() - date.getDay())
    const time = nd.toLocaleString().split(",")[1];
    return `${changedDay},${time}`;
}