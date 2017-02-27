export class Table {
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