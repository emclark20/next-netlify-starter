import Image from "next/image"
import Link from 'next/link'
export default function Custom404() {
    const styles = {
      container: {
        width: '100%',
        height: '100vh',
        backgroundImage: 'url("/assets/404-Page.svg")',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      content: {
        textAlign: 'center',
      }
    };
  
    return (
      <div style={styles.container}>
        <div style={styles.content}>
        <Link href="/" style={styles.link}>Home</Link>
        </div>
      </div>
    );
  }