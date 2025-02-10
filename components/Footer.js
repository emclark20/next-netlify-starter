import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">
        <Image src="/assets/primaryLogoWhite.svg" width={149.28} height={42.05} alt="SignIE Logo" />
      </div>
      <div className="footer-container">
        <p>©2025 SignIE</p>
        <div className="footer-links">
          <Link href="#">Home</Link>
          <Link href="aboutUs4">About</Link>
        </div>
      </div>
    </footer>
  )
}