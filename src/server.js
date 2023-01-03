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


// const octokit = new Octokit({
//     auth: {
//         clientId: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET
//     }
// });

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

// console.log("secret id: ", process.env.CLIENT_ID, " : ", process.env.CLIENT_SECRET);

async function fetchRepositories() {
    const { data } = await octokit.rest.repos.listForOrg({
        org: "asyncapi",
        per_page: 100
    })
    // console.log(data);
    repositoryDB.data.repositoryList = data.map(repository => repository.name);
    await repositoryDB.write();
    await fetchWorkflowData();
}

async function fetchWorkflowData() {
    const repositories = repositoryDB.data.repositoryList;
    console.log(repositories.length);
    for (let index = 0; index < repositories.length; index++) {
        const { data } = await octokit.rest.actions.listWorkflowRunsForRepo({
            owner: "asyncapi",
            repo: repositories[index],
            per_page: 100
        })
        workflowDB.data.workflowRuns.push(data.workflow_runs);
        await workflowDB.write();
        console.log("-------------------------------");
        console.log(index, " -> ", data);
        console.log("-------------------------------");
    }
    // repositories.map(async ( repo, index )=> {
    //     const { data } = await octokit.rest.actions.listWorkflowRunsForRepo({
    //         owner: "asyncapi",
    //         repo: repo,
    //         per_page: 100
    //     })
    //     workflowDB.data.workflowRuns = data.workflow_runs;
    //     await workflowDB.write();
    //     console.log(index, " -> ", data);
    // });
}

fetchRepositories();