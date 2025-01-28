import Link from 'next/link'
 export default function Header() {
    return (<nav>
    <div class="nav-links">
        <Link href="/">HOME</Link>
        <Link href="/aboutUs">About Us</Link>
        <a href="aboutUs">About</a>
        <a href="startLearning">Start Learning</a>
        <a href="signUp">SignUP</a>
    </div>
    <img src="/api/placeholder/100/40" alt="SignIE Logo"/>
    <a href="signUp.js" class="sign-in-btn">Sign In TEST</a>
</nav> )
  }

