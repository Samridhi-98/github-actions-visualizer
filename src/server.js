import { Octokit } from "@octokit/rest";
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import * as dotenv from 'dotenv';

dotenv.config();

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

function createFile(filename) {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const file = join(__dirname, filename);
    const adapter = new JSONFile(file);

    return adapter;
}

const repository = new Low(createFile('repository.json'));
repository.data ||= { list: [] };

const workflow = new Low(createFile('workflowRuns.json'));
workflow.data ||= { list: [] };

// eslint-disable-next-line no-unused-vars
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

// fetchRepositories();

// eslint-disable-next-line no-unused-vars
async function filterDatewiseData() {

    await workflow.read();

    let list = new Map();

    for (const data of workflow.data.list) {

        let date = new Date(data.created_at).toLocaleDateString();

        if (!list.has(date)) {
            list.set(date, []);
        }

        if (list.get(date).find(workflow => workflow === data.name) === undefined) {
            list.get(date).push(data.name);
        }
    }
    console.log(list);
}

// filterDatewiseData();

// eslint-disable-next-line no-unused-vars
async function filterMonthWiseData() {

    await workflow.read();

    let list = new Map();

    const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    for (const data of workflow.data.list) {

        let month = MONTH[new Date(data.created_at).getMonth()];

        if (!list.has(month)) {
            list.set(month, []);
        }

        if (list.get(month).find(workflow => workflow === data.name) === undefined) {
            list.get(month).push(data.name);
        }
    }

    console.log(list);
}

// filterMonthWiseData();

// eslint-disable-next-line no-unused-vars
async function filterYearWiseData() {

    await workflow.read();

    let list = new Map();
    const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    for (const data of workflow.data.list) {

        let year = new Date(data.created_at).getFullYear();
        let month = MONTH[new Date(data.created_at).getMonth()];

        if (!list.has(year)) {
            list.set(year, []);
        }

        if (list.get(year).find(data => data.month === month) === undefined) {
            let value = {
                "month": month,
                "run": 0
            }
            list.get(year).push(value);
        }
        list.get(year).map(data => data.run++)
    }

    console.log(list);
}
// filterYearWiseData();