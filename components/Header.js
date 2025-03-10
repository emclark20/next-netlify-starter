import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    async function checkAuth() {
      try {
        const response = await fetch('/api/user/profile');
        setIsLoggedIn(response.ok);
      } catch (error) {
        setIsLoggedIn(false);
      }
    }
    
    checkAuth();
  }, []);

  return (
    <nav>
      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/aboutUs5">About Us</Link>
        <Link href="/startLearning">Start Learning</Link>
      </div>
      <Image 
        src="/assets/primaryLogoWhite.svg" 
        width={149.28} 
        height={42.05} 
        alt="Webcam" 
      />
      
      {isLoggedIn ? (
        <Link href="/profile" className="sign-in-btn">
          Profile
        </Link>
      ) : (
        <Link href="/auth" className="sign-in-btn">Sign In</Link>
      )}
    </nav>
  )
}