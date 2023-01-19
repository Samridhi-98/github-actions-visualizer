import workflow from '../workflowRuns.json';

export let averageRuntime = {
    success: 0,
    failure: 0,
    skipped: 0
}

export const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const workflowCountList = () => {
    let list = [];

    for (const data of workflow.list) {

        let run = {
            "name": data.name,
            "frequency": 1
        };

        const pair = list.find(workflow => workflow.name === data.name);
        const index = list.indexOf(pair);

        if (pair === undefined) {
            list.push(run)
        }
        else {
            list[index].frequency += 1;
        }
    }
    list.sort(() => Math.random() - 0.5);

    return list;
}

export const filterWorkflowStats = () => {
    let stats = {
        conclusion: {
            success: 0,
            failure: 0,
            cancelled: 0,
            skipped: 0,
            startup_failure: 0,
            action_required: 0,
            null: 0
        },
        durations: {
            success: [],
            failure: [],
            skipped: [],
        }
    }

    for (const run of workflow.list) {
        stats.conclusion[run.conclusion] += 1;
        const createdAtTime = Date.parse(run.created_at)
        const updatedAtTime = Date.parse(run.updated_at)
        const durationMs = updatedAtTime - createdAtTime
        if (stats.durations[run.conclusion]?.push) {
            stats.durations[run.conclusion].push(durationMs / 1000)
        }
    }

    averageRuntime.success = (stats.durations.success.reduce((val1, val2) => val1 + val2, 0)) / stats.durations.success.length;
    averageRuntime.failure = (stats.durations.failure.reduce((val1, val2) => val1 + val2, 0)) / stats.durations.failure.length;
    averageRuntime.skipped = (stats.durations.skipped.reduce((val1, val2) => val1 + val2, 0)) / stats.durations.skipped.length;

    return stats;
}

export const filterYearWiseData = () => {

    let list = {};

    for (const data of workflow.list) {

        let year = new Date(data.created_at).getFullYear();
        let month = MONTH[new Date(data.created_at).getMonth()];

        if (!list[year]) {
            list[year] = [];
        }

        if (list[year].find(data => data.month === month) === undefined) {
            let value = {
                "month": month,
                "run": 0
            }
            list[year].push(value);
        }
        list[year].map(data => data.run++);
    }

    return list;
}
