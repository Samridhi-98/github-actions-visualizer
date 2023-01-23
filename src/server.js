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
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        // eslint-disable-next-line array-callback-return
        data.workflow_runs.map(run => {
            let isSameYearAndMonth = (new Date(run.created_at).getFullYear() === currentYear) && (new Date(run.created_at).getMonth() === currentMonth);
            if (isSameYearAndMonth) {
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
                if (workflow.data.list.find(run => run.id === data.id) === undefined) {
                    workflow.data.list.push(data);
                }
            }
        })

        await workflow.write();
    }
}

fetchRepositories();

// eslint-disable-next-line no-unused-vars
async function fetchdata() {

    await repository.read();

    for (let index = 0; index < repository.data.list.length; index++) {
        const { data } = await octokit.paginate('GET /repos/{owner}/{repo}/actions/runs', {
            org: "asyncapi",
            repo: repository.data.list[index],
            per_page: 100,
        })
        console.log(data)
    }
}
// fetchdata();