import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import FlashcardGrid from '@components/FlashcardGrid';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('bookmarks');
  const [bookmarkedFlashcards, setBookmarkedFlashcards] = useState([]);

  // Sample flashcard data (to be replaced with actual API call)
  const sampleFlashcards = [
    { id: 1, category: 'Alphabet', content: 'K' },
    { id: 2, category: 'Alphabet', content: 'J' },
    { id: 3, category: 'Alphabet', content: 'Y' },
    { id: 4, category: 'Alphabet', content: 'P' },
    { id: 5, category: 'Common Words', content: 'Aunt' },
    { id: 6, category: 'Common Words', content: 'Uncle' },
    { id: 7, category: 'Common Words', content: 'Goodbye' },
    { id: 8, category: 'Common Words', content: 'Help' },
    { id: 9, category: 'Common Words', content: 'Deaf' },
    { id: 10, category: 'Common Words', content: 'Hungry' },
    { id: 11, category: 'Common Words', content: 'We' },
    { id: 12, category: 'Common Words', content: 'They' },
  ];

  useEffect(() => {
    // Fetch the user profile when the component mounts
    async function fetchUserProfile() {
      try {
        const response = await fetch('/api/user/profile');
        
        if (!response.ok) {
          // If not authenticated, redirect to login
          if (response.status === 401) {
            router.push('/auth');
            return;
          }
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setUser(data.user);
        
        // In the future, fetch the user's bookmarked flashcards
        // For now, use sample data
        setBookmarkedFlashcards(sampleFlashcards);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        // After successful logout, redirect to home page
        router.push('/');
        // Optionally add a small delay to allow the cookie to be cleared
        setTimeout(() => {
          // Force a page refresh to update all components that rely on auth state
          window.location.reload();
        }, 100);
      }
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to sign out. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <Header />
        <main className="profile-main">
          <p>Loading profile...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <Header />
        <main className="profile-main">
          <p className="error-message">{error}</p>
          <button onClick={() => router.push('/auth')}>
            Back to Login
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-container">
        <Header />
        <main className="profile-main">
          <p>You need to be logged in to view this page.</p>
          <button onClick={() => router.push('/auth')}>
            Login
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="profile-container">
      <Head>
        <title>Profile | SignIE</title>
      </Head>
      
      <Header />
      
      <main className="profile-content">
        <div className="profile-header">
          <div className="profile-avatar">
            {/* Default user avatar */}
            <div className="avatar-circle">
              <Image 
                src="/assets/user-placeholder.png" 
                alt="User Avatar"
                width={120} 
                height={120}
                className="avatar-image"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="%23FEDCBA"%3E%3Ccircle cx="60" cy="45" r="30"%3E%3C/circle%3E%3Cpath d="M100 105a50 50 0 0 0-80 0"%3E%3C/path%3E%3C/svg%3E';
                }}
              />
            </div>
          </div>

          <h1 className="profile-username">{user.username}</h1>
          
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Name</span>
              <span className="info-value">{user.first_name} {user.last_name}</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">Join Date</span>
              <span className="info-value">{new Date(user.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="profile-tabs">
            <button 
              className={`tab-button ${activeTab === 'bookmarks' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookmarks')}
            >
              Bookmarks
            </button>
            
            <button 
              className={`tab-button ${activeTab === 'options' ? 'active' : ''}`}
              onClick={() => setActiveTab('options')}
            >
              Options
            </button>
          </div>
        </div>

        <div className="profile-body">
          {activeTab === 'bookmarks' && (
            <FlashcardGrid bookmarksOnly={true} />
          )}

          {activeTab === 'options' && (
            <div className="options-panel">
              <h2>Account Options</h2>
              <button onClick={handleLogout} className="logout-button">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}