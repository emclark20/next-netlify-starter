//a generic HTTP status code that indicates a problem on the website server, meaning the server encountered an unexpected condition and couldn't process the request sent by your browser, usually due to a configuration issue or scripting error on the server side
import Link from 'next/link'
export default function Custom500() {
    const styles = {
        container: {
          width: '100%',
          height: '100vh',
          //backgroundImage: 'url("/assets/404-Page.svg")',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          position: 'absolute',
          bottom: '10vh', // Position from bottom
          left: '50%',
          transform: 'translateX(-50%)', // Center horizontally
          textAlign: 'center',
          width: '100%',
          padding: '20px',
        },
        button: {
          backgroundColor: '#ECA76B',
          padding: ' 0.5rem 1rem',
          fontFamily: 'var(--font-league-spartan), -apple-system, BlinkMacSystemFont, Roboto, sans-serif;',
          fontWeight: 'bold',
          textDecoration: 'none',
          color: 'white',
        }
      };
    return (
        <div style={styles.container}>
          <div style={styles.content}>
          <Link href="/" style={styles.button}>Take me Back</Link>
          </div>
        </div>
      );
  }