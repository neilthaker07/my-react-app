import { useState, createContext, Suspense, lazy } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import PromoBanner from './PromoBanner'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import DebouncedToggle from './DebouncedToggle'
import Profile from './Profile'
import Stopwatch from './Stopwatch'
import FAQAccordion from './FAQAccordion'
import SalesChart from './SalesChart'
import DebouncedSearch from './DebouncedSearch'
import DocumentHeader from './DocumentHeader'
import Providers from './Providers'

export const GlobalContext = createContext();

// lazy loading with React.lazy and Suspense
const VideoPlayer = lazy(() => import('./VideoPlayer'));

// 1. Extract your original App content into a dedicated "Home" component
function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          Go to GitHub
        </a>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        {/* Docs and Social sections truncated here for readability, 
            but keep your original SVG and list code here! */}
        <h2>Documentation & Socials</h2>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

// 2. Your App component now becomes the Router configuration
function App() {
  const [user, setUser] = useState({ name: 'NST' });
  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        {/* NAVIGATION: This stays visible on every page */}
        <nav style={{ padding: '20px', display: 'flex', gap: '15px', borderBottom: '1px solid #444', marginBottom: '20px' }}>
          <Link to="/">Home</Link>
          <Link to="/header">Header</Link>
          <Link to="/video">Video Player</Link>
          <Link to="/promo">Promo Banner</Link>
          <Link to="/toggle">Toggle</Link>
          <Link to="/search">Search</Link>
          <Link to="/stopwatch">Stopwatch</Link>
          <Link to="/faqAccordion">FAQAccordion</Link>
          <Link to="/sales">Sales</Link>
          <Link to="/providers">Providers</Link>
          <Link to="/profile">Profile</Link>
        </nav>

        {/* ROUTES: This is the dynamic area that swaps out components based on the URL */}
        <main>
          <Suspense fallback={<div className="spinner">Loading page...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/header" element={<DocumentHeader />} />
              <Route path="/video" element={<VideoPlayer />} />
              <Route path="/promo" element={<PromoBanner name="welcome to the jungle" />} />
              <Route path="/toggle" element={<DebouncedToggle />} />
              <Route path="/search" element={<DebouncedSearch />} />
              <Route path="/stopwatch" element={<Stopwatch />} />
              <Route path="/faqAccordion" element={<FAQAccordion />} />
              <Route path="/sales" element={<SalesChart />} />
              <Route path="/providers" element={<Providers />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Suspense>
        </main>
      </BrowserRouter>
    </GlobalContext.Provider>
  )
}

export default App