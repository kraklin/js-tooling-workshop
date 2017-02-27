class Stats {
    updateStats(statsData) {
        var notDecided = statsData.filter((value) => value.isAttending === -1).length;
        var areGoing = statsData.filter((value) => value.isAttending === 1).length;
        var areNotGoing = statsData.filter((value) => value.isAttending === 0).length;

        $('#areNotDecided').html(notDecided);
        $('#areGoing').html(areGoing);
        $('#areNotGoing').html(areNotGoing);
    }
}

class Table {
    constructor(tableId) {
        this.tableId = tableId;
    }

    renderTable(tableData) {
        this.clearRows();
        for (var i = 0; i < tableData.length; i++) {
            this.renderRow(tableData[i]);
        }
    }

    clearRows(){
        $(`${this.tableId} tbody tr`).remove();
    }

    renderRow(rowData) {
        let row = $("<tr />");
        row.append($(`<td>${rowData.name}</td>`));
        row.append(this.renderThreeButtons(rowData));
        $(this.tableId).append(row);
    }

    renderThreeButtons(rowData) {
        return '<td class="center aligned"><div class="ui buttons">'
            + this.renderButton(rowData.id, "Attend", rowData.isAttending, 1)
            + this.renderButton(rowData.id, "Don't know", rowData.isAttending, -1)
            + this.renderButton(rowData.id, "Not coming", rowData.isAttending, 0)
            + '</div></td>';
    }

    renderButton(id, title, currentValue, setValue) {
        var active = (currentValue === setValue) ? "active" : "";
        return `<button class="ui ${active} button" onclick=\'updateData(${id},${setValue})\'>${title}</button>`;
    }
}

class Data {

    constructor() {
        this.data = [
            { id: 1, name: 'Jack', isAttending: -1 },
            { id: 2, name: 'Jill', isAttending: -1 },
            { id: 3, name: 'Steve', isAttending: -1 },
            { id: 4, name: 'Peter', isAttending: -1 },
            { id: 5, name: 'John', isAttending: -1 },
            { id: 6, name: 'Kevin', isAttending: -1 }
        ]
    }

    load() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(this.data), 3000);
        })
    }

    update(id, attendance) {
        return new Promise((resolve, reject) => {
            let toBeUpdated = this.data.filter((value) => value.id === id);

            if (toBeUpdated.length !== 1)
                reject();

            toBeUpdated[0].isAttending = attendance;
            resolve(this.data);
        });
    }
}

let stats = new Stats();
let table = new Table("#rooster");
let data = new Data();

const updateData = (id, attendance) => {
    data.update(id,attendance).then((data) => updateView(data));
}

const updateView = (data) => {
    stats.updateStats(data);
    table.renderTable(data);
}

data.load().then((data) => updateView(data))