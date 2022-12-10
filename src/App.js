import { useEffect } from 'react';
import './App.css';
import Description from './components/description/Description';
import FeatureList from './components/featureList/FeatureList';
import Footer from './components/footer/Footer';
import AreaGraph from './components/graph/AreaGraph';
import BarGraph from './components/graph/BarGraph';
import LineGraph from './components/graph/LineGraph';
import MultiLineGraph from './components/graph/MultiLineGraph';
import Navbar from './components/navbar/Navbar';
import Statistics from './components/statistics/Statistics';
import { Octokit } from "@octokit/rest";
import { useContext } from 'react';
import { AppContext } from './context/AppContext';

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN
});

function App() {

  const { setRepository, setRepoWorkflowList, state } = useContext(AppContext);

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
  }, [state.selectedRepo])

  // useEffect(() => {
  //   const result = state.repoList.map(async repository => {
  //     // const workflowId = workflow.id;
  //     await octokit.actions.listWorkflowRuns({
  //       owner: "asyncapi",
  //       repo: repository,
  //       // workflow_id: workflowId,
  //       per_page: 100,
  //     }).then(data => {
  //       console.log("records-> ", data);
  //     }).catch(err => {
  //       console.log(err);
  //     })
  //   })
  //   console.log(result);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

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
