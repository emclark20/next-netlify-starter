import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <>
      <footer class="footer">
        <div class="footer-logo">
          <p>©2025 SignIE</p>
          <Image class="footer-logo-image" src="" alt="SignIE Logo" width={200} height={100} />
        </div>
        <div class="footer-links">
          <Link href="#">Home</Link>
          <Link href="#">About</Link>
          <Link href="#">Contact</Link>
        </div>
      </footer>
    </>
  )
}
