import { Octokit } from "@octokit/rest";
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import * as dotenv from 'dotenv';

dotenv.config();

let list = [];

let stats = {
    conclusion: {
        success: 0,
        failure: 0,
        cancelled: 0,
        skipped: 0,
        startup_failure: 0,
        action_required: 0
    },
    durations: {
        success: [],
        failure: [],
        cancelled: [],
        skipped: [],
        startup_failure: [],
    },
    earliestRun: new Date(8640000000000000).getTime(),
    latestRun: new Date(-8640000000000000).getTime()
}

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

function createFile(filename){
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const file = join(__dirname, filename);
    const adapter = new JSONFile(file);

    return adapter;
}

const repository = new Low(createFile('repository.json'));
repository.data ||= { list: [] };

const workflow = new Low(createFile('workflowRuns.json'));
workflow.data ||= { list: [] };

async function fetchRepositories() {

    const { data } = await octokit.rest.repos.listForOrg({
        org: "asyncapi",
        per_page: 100
    })

   repository.data.list = data.map(repository => repository.name);

    await repository.write();
    await fetchWorkflowData();
}

async function fetchWorkflowData() {

    const repositories = repository.data.list;

    for (let index = 0; index < repositories.length; index++) {
        const { data } = await octokit.rest.actions.listWorkflowRunsForRepo({
            owner: "asyncapi",
            repo: repositories[index],
            per_page: 100
        })

        // eslint-disable-next-line array-callback-return
        data.workflow_runs.map(run => {
            let data = {
                "id": run.id,
                "name": run.name,
                "repository_name": run.repository.name,
                "run_number": run.run_number,
                "event": run.event,
                "status": run.status,
                "conclusion": run.conclusion,
                "workflow_id": run.workflow_id,
                "created_at": run.created_at,
                "updated_at": run.updated_at,
                "run_started_at": run.run_started_at,
            }

            workflow.data.list.push(data);
        })

        await workflow.write();
    }
}

fetchRepositories();

// eslint-disable-next-line no-unused-vars
async function filterWorkflowStats(){

    await workflow.read();
  
    for (const run of workflow.data.list) {
        stats.conclusion[run.conclusion] += 1
        const createdAtTime = Date.parse(run.created_at)
        const updatedAtTime = Date.parse(run.updated_at)
        const durationMs = updatedAtTime - createdAtTime
        if (stats.durations[run.conclusion]?.push) {
            stats.durations[run.conclusion].push(durationMs / 1000)
        }
        stats.earliestRun = Math.min(stats.earliestRun, createdAtTime)
        stats.latestRun = Math.max(stats.latestRun, createdAtTime)
    }
    
    console.log("stats: ", stats)
}

async function createWorkflowCountList(){

    await workflow.read();

    for(const data of workflow.data.list){

        let run = {
            "name" : data.name,
            "frequency" : 1
        };

        const pair = list.find(workflow => workflow.name === data.name);
        const index = list.indexOf(pair);

        if(pair === undefined){
            list.push(run)
        }
        else{
            list[index].frequency += 1;
        }
    }

    console.log("list: ", list);

    filterWorkflowStats();

}

createWorkflowCountList();