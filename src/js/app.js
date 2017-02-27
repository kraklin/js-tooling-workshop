var data = [
    { id: 1, name: 'Jack', isAttending: -1 },
    { id: 2, name: 'Jill', isAttending: -1 },
    { id: 3, name: 'Steve', isAttending: -1 },
    { id: 4, name: 'Peter', isAttending: -1 },
    { id: 5, name: 'John', isAttending: -1 },
    { id: 6, name: 'Kevin', isAttending: -1 }
]

function updateData(id, attendance) {
    var toBeUpdated = this.data.filter(function (value) {
        return value.id === id;
    })

    if (toBeUpdated.length !== 1)
        return;

    toBeUpdated[0].isAttending = attendance;
    updateView(this.data);
}

function updateView(data) {
    renderStats(data);
    renderTable(data);
}

function renderTable(data) {
    $("#rooster tbody tr").remove();

    for (var i = 0; i < data.length; i++) {
        renderRow(data[i]);
    }
}

function renderRow(rowData) {
    var row = $("<tr />")
    $("#rooster").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
    row.append($("<td>" + rowData.name + "</td>"));
    row.append(renderThreeButtons(rowData));
}

function renderThreeButtons(rowData) {
    return '<td class="center aligned"><div class="ui buttons">'
        + renderButton(rowData.id, "Attend", rowData.isAttending, 1)
        + renderButton(rowData.id, "Don't know", rowData.isAttending, -1)
        + renderButton(rowData.id, "Not coming", rowData.isAttending, 0)
        + '</div></td>';
}

function renderButton(id, title, currentValue, setValue) {
    var active = (currentValue === setValue) ? "active" : "";
    return '<button class="ui ' + active + ' button" onclick=\'updateData(' + id + ',' + setValue + ')\'>' + title + '</button>';
}

function renderStats(statsData) {
    var notDecided = statsData.filter(function (value) { return value.isAttending === -1 }).length;
    var areGoing = statsData.filter(function (value) { return value.isAttending === 1 }).length;
    var areNotGoing = statsData.filter(function (value) { return value.isAttending === 0 }).length;
    $('#areNotDecided').html(notDecided);
    $('#areGoing').html(areGoing);
    $('#areNotGoing').html(areNotGoing);
}

updateView(data);