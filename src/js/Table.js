export class Table {
    constructor(tableId, updateCallback) {
        this.tableId = tableId;
        this.updateCallback = updateCallback;
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
        let cell = $('<td class="center aligned"><div class="ui buttons">');
        cell.append(this.renderButton(rowData.id, "Attend", rowData.isAttending, 1));
        cell.append(this.renderButton(rowData.id, "Don't know", rowData.isAttending, -1));
        cell.append(this.renderButton(rowData.id, "Not coming", rowData.isAttending, 0));
        return cell;
    }

    renderButton(id, title, currentValue, setValue) {
        let active = (currentValue === setValue) ? "active" : "";
        let button = $(`<button class="ui ${active} button">${title}</button>`);
        button.on("click",null, () => this.updateCallback(id,setValue));
        return button;
    }
}