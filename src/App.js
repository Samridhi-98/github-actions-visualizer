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

  // const [repo, setRepo] = useState([]);
  // const repoWorkflowListApi = "https://api.github.com/repos/asyncapi/modelina/actions/runs";
  // const orgRepoListApi = "https://api.github.com/orgs/asyncapi/repos";

  const { setRepository, setRepoWorkflowList, state } = useContext(AppContext);
  // const list = ['spec', 'website', 'spec-json-schemas', 'generator', 'asyncapi-react', 'parser-go', 'parser-js', 'extensions-catalog', 'converter-js', 'converter-go', 'bindings', 'enterprise-patterns', 'tck', 'studio', 'raml-dt-schema-parser', 'openapi-schema-parser', 'html-template', 'markdown-template', 'nodejs-template', 'nodejs-ws-template', 'java-spring-template', 'java-spring-cloud-stream-template', 'python-paho-template', 'github-action-for-generator', 'ts-nats-template', 'conference-website', '.github', 'generator-filters', 'jasyncapi', 'generator-hooks', 'avro-schema-parser', 'dotnet-nats-template', 'go-watermill-template', 'vs-asyncapi-preview', 'shape-up-process', 'template-for-generator-templates', 'generator-react-sdk', 'modelina', 'asyncapi-php-template', 'cli', 'event-gateway', 'community', 'simulator', 'template-for-go-projects', 'parser-api', 'training', 'cupid', 'diff', 'optimizer', 'chatbot', 'glee', 'glee-hello-world', 'create-glee-app', 'bundler', 'server-api', 'brand', 'infra', 'java-template', 'design-system', 'dotnet-rabbitmq-template', 'EDAVisualiser', 'problem', 'jasyncapi-idea-plugin'];

  useEffect(() => {
    (async function listRepo() {
      const { data } = await octokit.rest.repos.listForOrg({
        org: "asyncapi",
        per_page: 100
      })
      //  console.log(data)
      // setRepo(data.map(repository => repository.name));
      setRepository(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (function fetchWorkflow() {
      state.repoList.map(async repository => {
        const { data } = await octokit.actions.listRepoWorkflows({
          owner: "asyncapi",
          repo: repository,
        })
        setRepoWorkflowList(data.workflows);
        // console.log(repository, " -> ", data.workflows);
      })
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.repoList])

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
