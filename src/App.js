import { useEffect } from 'react';
import './App.css';
import Description from './components/description/Description.jsx';
import FeatureList from './components/featureList/FeatureList.jsx';
import Footer from './components/footer/Footer.jsx';
import AreaGraph from './components/graph/AreaGraph.jsx';
import BarGraph from './components/graph/BarGraph.jsx';
import LineGraph from './components/graph/LineGraph.jsx';
import MultiLineGraph from './components/graph/MultiLineGraph.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import Statistics from './components/statistics/Statistics.jsx';
import { Octokit } from "@octokit/rest";
import { useContext } from 'react';
import { AppContext } from './context/AppContext.js';

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN
});

function App() {

  const { setRepository, setRepoWorkflowList, setWorkflowRuns, state } = useContext(AppContext);

  useEffect(() => {
    (async function listRepo() {
      const { data } = await octokit.rest.repos.listForOrg({
        org: "asyncapi",
        per_page: 100
      })
      //  console.log(data)
      setRepository(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async function fetchWorkflow() {
      const { data } = await octokit.rest.actions.listRepoWorkflows({
        owner: "asyncapi",
        repo: state.selectedRepo,
      })
      setRepoWorkflowList(data.workflows);
      // console.log("repo data: ", data);
      // console.log("state: ", state)
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedRepo]);

  useEffect(() => {
    (function fetchSpecifiedWorkflowRuns() {
      let runsList = [];
      state.selectedWorkflowList.map(async workflow => {
        const workflowId = workflow.id;
        const { data } = await octokit.rest.actions.listWorkflowRuns({
          owner: "asyncapi",
          repo: state.selectedRepo,
          workflow_id: workflowId,
          per_page: 100,
        })
        runsList.push(...data.workflow_runs);
      })
      // console.log("records: ", runsList);
      setWorkflowRuns(runsList);
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedWorkflowList]);

  // useEffect(() => {
  //   (function fetchRuns() {
  //     state.repoList.map(async repo => {
  //       const { data } = await octokit.rest.actions.listWorkflowRunsForRepo({
  //         owner: "asyncapi",
  //         repo: repo,
  //         per_page: 100
  //       })

  //       console.log("----------------------------");
  //       console.log(repo, " -> ", data);
  //       console.log("----------------------------");
  //     })
  //   })();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state.selectedRepo])


  return (
    <>
      <div className='app'>
        <header className='app-header'>
          <Navbar />
        </header>
        <main id='main-content' className='main-content'>
          <section className='top-section'>
            <FeatureList />
            <Statistics />
            <Description />
          </section>
          <section className='middle-section'>
            <div className='graph-subdivison1'>
              <div className='bar-graph'><BarGraph /></div>
              <div className='line-graph'><LineGraph /></div>
            </div>

            <div className='graph-subdivison2'>
              <div className='multiline-graph'><MultiLineGraph /></div>
              <div className='area-graph'><AreaGraph /></div>
            </div>
          </section>
        </main>
        <hr></hr>
        <footer className='footer'>
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default App;
