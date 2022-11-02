import './App.css';

function App() {
  return (
    <>
      <div className='app'>
        {/* <header className='App-header'>
        </header> */}
        <main id='main-content' className='main-content'>
          <section className='top-section'>
            <div className='feature-list'>
              <p><centre>Hello World!</centre></p>
            </div>
            <div className='description'>
            <p><centre>Hello Kittty!</centre></p>
            </div>
          </section>
          <section className='middle-section'>
            <p>Hello kitty, it's wednesday!</p>
          </section>
        </main>
        <hr></hr>
        <footer className='footer'>
          Made with  ❤️  by the AsyncAPI Initiative.
          {/* Copyright © AsyncAPI Project a Series of LF Projects, LLC. For web site terms of use, <br></br>
          trademark policy and general project policies please see https://lfprojects.org */}
        </footer>
      </div>
    </>
  );
}

export default App;
