import 'script-loader!./jquery-3.1.1.min.js';
import 'script-loader!./semantic.min.js';

import {Stats} from './Stats';
import {Table} from './Table';
import {Data} from './Data';


let stats = new Stats();
let table = new Table("#rooster", updateData);
let data = new Data();

const updateData = (id, attendance) => {
    data.update(id,attendance).then((data) => updateView(data));
}

const updateView = (data) => {
    stats.updateStats(data);
    table.renderTable(data);
}

export const start = () =>{
    data.load().then((data) => updateView(data))
}