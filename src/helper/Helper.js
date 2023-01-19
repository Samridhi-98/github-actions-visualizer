import workflow from '../workflowRuns.json';

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
        }
    }

    for (const run of workflow.list) {
        stats.conclusion[run.conclusion] += 1;
    }

    return stats;
}

export const filterWorkflow = () => {

    let stats = {
        durations: {
            success: [],
            failure: [],
            skipped: [],
        }
    }

    for (const run of workflow.list) {
        const createdAtTime = Date.parse(run.created_at)
        const updatedAtTime = Date.parse(run.updated_at)
        const durationMs = updatedAtTime - createdAtTime
        if (stats.durations[run.conclusion]?.push) {
            stats.durations[run.conclusion].push(durationMs / 1000)
        }
    }

    return stats;
    // const successAverage = (stats.durations.success.reduce((val1, val2) => val1 + val2, 0)) / stats.durations.success.length || 0;
    // const failureAverage = (stats.durations.failure.reduce((val1, val2) => val1 + val2, 0)) / stats.durations.failure.length || 0;
    // const skippedAverage = (stats.durations.skipped.reduce((val1, val2) => val1 + val2, 0)) / stats.durations.skipped.length || 0;
    // console.log("stats: ", stats)
    // console.log(successAverage, " - ", failureAverage, " - ", skippedAverage);
}
