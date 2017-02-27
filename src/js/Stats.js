export class Stats {
    updateStats(statsData) {
        var notDecided = statsData.filter((value) => value.isAttending === -1).length;
        var areGoing = statsData.filter((value) => value.isAttending === 1).length;
        var areNotGoing = statsData.filter((value) => value.isAttending === 0).length;

        $('#areNotDecided').html(notDecided);
        $('#areGoing').html(areGoing);
        $('#areNotGoing').html(areNotGoing);
    }
}