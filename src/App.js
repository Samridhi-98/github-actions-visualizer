import './App.css';
import Description from './components/description/Description';
import FeatureList from './components/featureList/FeatureList';
import Footer from './components/footer/Footer';
import Graph from './components/graph/Graph';
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
              <p>Hello Kittty!</p>
            </div>
            <Description />
          </section>
          <section className='middle-section'>
            <Graph />
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
