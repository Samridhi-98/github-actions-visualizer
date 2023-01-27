import workflow from '../workflowRuns.json';

export const convertToSeconds = (time) => {
    const [minute, second] = time.split(':');
    return minute * 60 + (+second);
}


export const countWordsInString = (str) => {
    return str.trim().split(/\s+/).length;
}

export const workflowCountList = () => {

    let list = [];

    for (const data of workflow.list) {

        const createdAtTime = Date.parse(data.created_at);
        const updatedAtTime = Date.parse(data.updated_at);
        const durationMin = Math.floor(((updatedAtTime - createdAtTime) / 1000 / 60) % 60);

        let run = {
            "name": data.name,
            "duration": durationMin
        };

        const pair = list.find(workflow => workflow.name === data.name);
        const index = list.indexOf(pair);

        if (pair === undefined) {
            list.push(run)
        }
        else {
            list[index].duration += durationMin;
        }
    }

    return list;
}

export const filterWorkflowStats = () => {
    let stats = {
        conclusion: {
            success: 0,
            failure: 0,
            skipped: 0,
            action_required: 0
        },
        durations: {
            success: [],
            failure: [],
            skipped: [],
        },
    }

    for (const run of workflow.list) {

        if (stats.conclusion[run.conclusion] !== undefined) {
            stats.conclusion[run.conclusion] += 1;
        }
        const createdAtTime = Date.parse(run.created_at);
        const updatedAtTime = Date.parse(run.updated_at);
        const durationMs = updatedAtTime - createdAtTime;
        const durationInMinute = Math.floor((durationMs / 1000 / 60) % 60) + ':' + Math.floor((durationMs / 1000) % 60);
        let data = {
            'title': run.name,
            'repo': run.repository_name,
            'duration': durationInMinute
        }
        if (stats.durations[run.conclusion]?.push) {
            stats.durations[run.conclusion].push(data);
        }
    }

    return stats;
}


export const filterHourlyData = () => {

    let list = {};

    for (const run of workflow.list) {

        let hours = new Date(run.created_at).getHours();

        const createdAtTime = Date.parse(run.created_at);
        const updatedAtTime = Date.parse(run.updated_at);
        const durationSec = Math.floor(((updatedAtTime - createdAtTime) / 1000) % 60);

        let time = hours;

        let data = {
            "noOfRuns": 1,
            "duration": durationSec
        }

        if (!list[time]) {
            list[time] = data;
        }
        else {
            list[time].noOfRuns += 1;
            list[time].duration += durationSec;
        }
    }

    return list;
}

export const setWorkflowPerDayData = () => {

    let list = {};
    let workflows = {
        maxNoOfRunPerDay: 0,
        minNoOfRunPerDay: 0,
        averageNoOfRunsPerDay: 0
    }

    for (const data of workflow.list) {

        let date = new Date(data.created_at).toLocaleDateString();

        if (!list[date]) {
            list[date] = [];
        }

        if (list[date].find(workflow => workflow === data.name) === undefined) {
            list[date].push(data.name);
        }
    }

    const totalRecord = Object.values(list).length;
    const noOfWorkflowRunPerDay = Object.values(list).map(data => data.length);

    workflows.maxNoOfRunPerDay = Math.max(...noOfWorkflowRunPerDay);
    workflows.minNoOfRunPerDay = Math.min(...noOfWorkflowRunPerDay);
    workflows.averageNoOfRunsPerDay = noOfWorkflowRunPerDay.reduce((val1, val2) => val1 + val2, 0) / totalRecord;

    return workflows;
}