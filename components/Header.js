import Link from 'next/link'
import Image from 'next/image'
 export default function Header() {
    return (<nav>
    <div class="nav-links">
        <Link href="/">Home</Link>
        <Link href="/aboutUs">About Us</Link>
        <a href="startLearning">Start Learning</a>
    </div>
    <Image src="/assets/primaryLogoWhite.png" width={149.28} height={42.05} alt="Webcam" />
    <a href="signUp.js" class="sign-in-btn">Sign In</a>
</nav> )
  }

