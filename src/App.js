import './App.css';
import RepositoryList from './components/repository/RepositoryList.jsx';
import WorkflowList from './components/workflow/WorkflowList.jsx';
import Footer from './components/footer/Footer.jsx';
import TotalRuntimeGraph from './components/graph/TotalRuntimeGraph.jsx';
import RunsDurationGraph from './components/graph/RunsDurationGraph.jsx';
import ConclusionPercentageGraph from './components/graph/ConclusionPercentageGraph.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import Statistics from './components/statistics/Statistics.jsx';
import Description from './components/description/Description.jsx';

function App() {

  return (
    <>
      <div className='app'>
        <header className='app-header'>
          <Navbar />
        </header>
        <main id='main-content' className='main-content'>
          <section className='top-section'>
            <WorkflowList />
            <Statistics />
            <RepositoryList />
          </section>
          <section className='description-section'>
            <Description />
          </section>
          <section className='middle-section'>
            <div className='total-runtime-graph'><TotalRuntimeGraph /></div>
          </section>
          <section className='bottom-section'>
            <div className='graph-subdivison1'>
              <div className='duration-graph'><RunsDurationGraph /></div>
            </div>
            <div className='graph-subdivison2'>
              <div className='conclusion-graph'><ConclusionPercentageGraph /></div>
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
