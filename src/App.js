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

function App() {

  const repoWorkflowListApi = "https://api.github.com/repos/asyncapi/modelina/actions/runs";
  const orgRepoListApi = "https://api.github.com/orgs/asyncapi/repos";

  useEffect(() => {
    const fetchRepoList = async () => {
      try {
        const response = await fetch(orgRepoListApi, { method: 'get' });
        const repoList = await response.json();
        console.log("repo list-> ", repoList);
      }
      catch (err) {
        console.log(err);
      }
    }
    const fetchWorkflow = async () => {
      try {
        const response = await fetch(repoWorkflowListApi, { method: 'get' });
        const data = await response.json();
        console.log("Data -> ", data);

      }
      catch (err) {
        console.log(err);
      }
    }
    fetchRepoList();
    fetchWorkflow();
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
