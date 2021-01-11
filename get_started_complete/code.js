var thead = document.querySelector("table").childNodes[0]; 
var theadRows = (thead.querySelectorAll("tr"));
var theadCell = theadRows[0].appendChild(document.createElement('th'));
theadCell.innerHTML = "SGT";

var tbody = document.querySelector("table").childNodes[1]; 
var rows = (tbody.querySelectorAll("tr"));
rows.forEach(row => {
        var cells = (row.querySelectorAll("td"));
        var day = cells[0].innerText;
        var PTtime = cells[1].innerText;

        var td = row.appendChild(document.createElement('td'));
        td.innerHTML = day + ";" + PTtime;
    }
)