export class Data {

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
            setTimeout(() => resolve(this.data), 1000);
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
