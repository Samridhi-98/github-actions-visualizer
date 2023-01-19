import './App.css';
import RepositoryList from './components/repository/RepositoryList.jsx';
import WorkflowList from './components/workflow/WorkflowList.jsx';
import Footer from './components/footer/Footer.jsx';
import AreaGraph from './components/graph/AreaGraph.jsx';
import BarGraph from './components/graph/BarGraph.jsx';
import MultiLineGraph from './components/graph/MultiLineGraph.jsx';
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
            <div className='area-graph'><AreaGraph /></div>
          </section>
          <section className='bottom-section'>
            <div className='graph-subdivison1'>
              <div className='bar-graph'><BarGraph /></div>
            </div>
            <div className='graph-subdivison2'>
              <div className='multiline-graph'><MultiLineGraph /></div>
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
