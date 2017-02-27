
import {Stats} from './Stats';
import {Table} from './Table';
import {Data} from './Data';

const updateData = (id, attendance) => {
    data.update(id,attendance).then((data) => updateView(data));
}

const updateView = (data) => {
    stats.updateStats(data);
    table.renderTable(data);
}

let stats = new Stats();
let table = new Table("#rooster", updateData);
let data = new Data();

export const start = () =>{
    data.load().then((data) => updateView(data))
}