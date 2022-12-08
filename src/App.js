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

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN
});

function App() {

  // const [workflowList, setWorkFlow] = useState([]);
  // const repoWorkflowListApi = "https://api.github.com/repos/asyncapi/modelina/actions/runs";
  // const orgRepoListApi = "https://api.github.com/orgs/asyncapi/repos";

  useEffect(() => {
    const listRepo = async () => {
      // const { data } = await octokit.rest.repos.listForOrg({
      //   org: "asyncapi",
      //   type: "public",
      //   per_page: 100
      // })
      // console.log(data.name)
    }
    listRepo();
    // const fetchWorkflow = async () => {
    //   const { data } = await octokit.actions.listRepoWorkflows({
    //     owner: "asyncapi",
    //     repo: "modelina",
    //   })
    //   setWorkFlow(data.workflows);
    // }
    // console.log(workflowList);
    // const demo = () => {
    //   workflowList.map(async workflow => {
    //     const workflowId = workflow.id;
    //     await octokit.actions.listWorkflowRuns({
    //       owner: "asyncapi",
    //       repo: "modelina",
    //       workflow_id: workflowId,
    //       per_page: 100,
    //     }).then(data => {
    //       console.log("records-> ", data);
    //     }).catch(err => {
    //       console.log("error: ", err);
    //     })
    //   })
    // }
    // fetchWorkflow();
    // demo();
  }, []);

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
