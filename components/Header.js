import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    // Check if user is logged in
    async function checkAuth() {
      try {
        const response = await fetch('/api/user/profile');
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setUserData(data.user);
        } else {
          setIsLoggedIn(false);
          setUserData(null);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUserData(null);
      }
    }
    
    checkAuth();
  }, []);

  return (
    <nav>
      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/aboutUs5">About Us</Link>
        <Link href="/flashcards">Start Learning</Link>
      </div>
      <Image 
        src="/assets/primaryLogoWhite.svg" 
        width={149.28} 
        height={42.05} 
        alt="Webcam" 
      />
      
      {isLoggedIn && userData ? (
        <Link href="/profile" className="sign-in-btn">
          Profile
        </Link>
      ) : (
        <Link href="/signUp" className="sign-in-btn">Sign In</Link>
      )}
    </nav>
  )
}