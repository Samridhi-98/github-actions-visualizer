import './App.css';
import Description from './components/description/Description';
import FeatureList from './components/featureList/FeatureList';
import Footer from './components/footer/Footer';
import AreaGraph from './components/graph/AreaGraph';
import BarGraph from './components/graph/BarGraph';
import LineGraph from './components/graph/LineGraph';
import MultiLineGraph from './components/graph/MultiLineGraph';
// import PieGraph from './components/graph/PieGraph';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <>
      <div className='app'>
        <header className='app-header'>
          <Navbar />
        </header>
        <main id='main-content' className='main-content'>
          <section className='top-section'>
            <FeatureList />
            <div className='stats'>
              <h4>Statistics</h4>
              <div className='pie-graph'>
                {/* <PieGraph /> */}
              </div>
            </div>
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
