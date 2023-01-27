/* eslint-disable array-callback-return */
import { Octokit } from "@octokit/rest";
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import * as dotenv from 'dotenv';

dotenv.config();

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
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

// eslint-disable-next-line no-unused-vars
function setDataToJson(repository, prevTenDays) {
    octokit
        .paginate(
            "GET /repos/{owner}/{repo}/actions/runs",
            { owner: "asyncapi", repo: repository, per_page: "100" },
            (response, done) => {
                let condition = response.data.find(workflow => new Date(workflow.created_at).toLocaleDateString() === prevTenDays);
                if (condition) {
                    done();
                }
                // console.log(repository);
                return response.data
            }
        )
        .then((workflowData) => {
            workflowData.map((run) => {
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
            })
            workflow.write();
        });
}

async function fetchWorkflowData() {

    const repositories = repository.data.list;
    const prevTenDays = new Date(new Date().setDate(new Date().getDate() - 10)).toLocaleDateString();
    if (new Date().getDate() === 1) {
        workflow.data.list = [];
    }

    for (let index = 0; index < repositories.length; index++) {
        setTimeout(() => setDataToJson(repositories[index], prevTenDays), index * 5000);
    }
}

fetchRepositories();