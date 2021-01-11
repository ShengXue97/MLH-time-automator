

var tables = document.querySelectorAll("table");

tables.forEach(table => {
    var thead = table.childNodes[0];
    var theadRows = (thead.querySelectorAll("tr"));
    var theadCell = theadRows[0].appendChild(document.createElement('th'));
    theadCell.innerHTML = Intl.DateTimeFormat().resolvedOptions().timeZone;

    var tbody = table.childNodes[1];
    var rows = tbody.querySelectorAll("tr");
    rows.forEach(row => {
        var cells = row.querySelectorAll("td");
        var [day, timezone1] = cells[0].innerText.split(" ");
        var [ETtime, am_pm, timezone2] = cells[2].innerText.split(" ");

        var td = row.appendChild(document.createElement('td'));
        var date = new Date(`January 11, 2021 ${ETtime} ${am_pm}`);

        //5 because Eastern Time is UTC - 5.
        var result = calcTime(date, 5, day);
        td.innerHTML = result;
    }
    )
}
);


function convertDay(currentDay, dayDifference) {
    const dayMappings = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    var newDay = dayMappings[(dayMappings.indexOf(currentDay) + dayDifference) % 7];
    return newDay;
}

function calcTime(date, offset, dayToCompare) {
    // get UTC time in milliseconds
    const utc = date.getTime() + (3600000 * offset);
    // create new Date object for different city
    // using supplied offset
    const nd = new Date(utc - (60000 * date.getTimezoneOffset()));
    // check if day is changed after time conversion
    const changedDay = convertDay(dayToCompare, nd.getDay() - date.getDay())
    const time = nd.toLocaleString().split(",")[1];
    return `${changedDay},${time}`;
}
