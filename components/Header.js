import Link from 'next/link'
import Image from 'next/image'
 export default function Header() {
    return (<nav>
      <div class="nav-links">
          <Link href="/">Home</Link>
          <Link href="/aboutUs5">About Us</Link>
          <Link href="/startLearning">Start Learning</Link>
          
      </div>
      <Image src="/assets/primaryLogoWhite.svg" width={149.28} height={42.05} alt="Webcam" />
      <Link href="/signUp" class="sign-in-btn">Sign In</Link>
  </nav> )
    }
