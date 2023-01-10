import { Octokit } from "@octokit/rest";
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import * as dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const workflowFile = join(__dirname, 'workflowRuns.json');
const workflowAdapter = new JSONFile(workflowFile);
const workflowDB = new Low(workflowAdapter);
workflowDB.data ||= { workflowRuns: [] };

const repositoryFile = join(__dirname, 'repository.json');
const repositoryAdapter = new JSONFile(repositoryFile);
const repositoryDB = new Low(repositoryAdapter);
repositoryDB.data ||= { repositoryList: [] };

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


async function fetchRepositories() {

    const { data } = await octokit.rest.repos.listForOrg({
        org: "asyncapi",
        per_page: 100
    })

    repositoryDB.data.repositoryList = data.map(repository => repository.name);

    await repositoryDB.write();
    await fetchWorkflowData();
}

async function fetchWorkflowData() {

    const repositories = repositoryDB.data.repositoryList;

    for (let index = 0; index < repositories.length; index++) {
        const { data } = await octokit.rest.actions.listWorkflowRunsForRepo({
            owner: "asyncapi",
            repo: repositories[index],
            per_page: 100
        })

        // eslint-disable-next-line array-callback-return
        data.workflow_runs.map(run => {
            let workflow = {
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

            workflowDB.data.workflowRuns.push(workflow);
        })

        await workflowDB.write();
    }
}

// fetchRepositories();

async function filterWorkflowStats(){

    await workflowDB.read();
  
    for (const run of workflowDB.data.workflowRuns) {
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

    await workflowDB.read();

    for(const data of workflowDB.data.workflowRuns){

        let run = {
            "name" : data.name,
            "frequency" : 0
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

    // filterWorkflowStats();

}

createWorkflowCountList();