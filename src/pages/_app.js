import '../styles/globals.css';
import '@fontsource/poppins';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function App({ Component, pageProps }) {
  useEffect(() => {
    document.documentElement.classList.add('fade-in');
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

export default App;
