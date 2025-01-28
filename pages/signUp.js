import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
export default function SignUp() {
  return ( <div>
    <style>
        {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0zm0 36c-8.837 0-16-7.163-16-16S11.163 4 20 4s16 7.163 16 16-7.163 16-16 16z' fill='%23FFE4B5' fill-opacity='0.2'/%3E%3C/svg%3E");
        }

        /* Navigation */
        .nav {
            background-color: #1D2761;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .nav-links {
            display: flex;
            gap: 2rem;
        }

        .nav-links a {
            color: white;
            text-decoration: none;
            font-weight: 500;
        }

        .logo {
            width: 120px;
        }

        /* Main Content */
        main {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
            max-width: 500px;
            margin: 0 auto;
            width: 100%;
        }

        h1 {
            color: #1D2761;
            font-size: 3rem;
            margin-bottom: 2rem;
            text-align: center;
        }

        .form-group {
            width: 100%;
            margin-bottom: 1.5rem;
        }

        label {
            display: block;
            margin-bottom: 0.5rem;
            color: #333;
            font-weight: 500;
        }

        input {
            width: 100%;
            padding: 0.75rem;
            border: none;
            background-color: #B3E5FC;
            border-radius: 4px;
        }

        .submit-btn {
            background-color: #1D2761;
            color: white;
            padding: 0.75rem 2rem;
            border: none;
            border-radius: 2rem;
            cursor: pointer;
            font-size: 1rem;
            width: 200px;
            margin: 1rem 0;
        }

        .google-btn {
            background-color: white;
            color: #333;
            padding: 0.75rem 2rem;
            border: 1px solid #ccc;
            border-radius: 2rem;
            cursor: pointer;
            font-size: 1rem;
            width: 200px;
            margin: 1rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }

        .forgot-password {
            color: #03A9F4;
            text-decoration: none;
            margin-left: auto;
            display: block;
            text-align: right;
        }

        .signup-prompt {
            margin-top: 1rem;
            text-align: center;
        }

        .signup-prompt a {
            color: #03A9F4;
            text-decoration: none;
        }

        /* Footer */
        footer {
            background-color: #1D2761;
            padding: 2rem;
            color: white;
            text-align: center;
            margin-top: auto;
        }

        .footer-links {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-top: 1rem;
        }

        .footer-links a {
            color: white;
            text-decoration: none;
        }

        .social-links {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 1rem;
        }

        .social-links a {
            color: white;
            text-decoration: none;
        }
    </style>
    <nav class="nav">
        <div class="nav-links">
            <a href="/home">Home</a>
            <a href="/about">About</a>
            <a href="/start-learning">Start Learning</a>
        </div>
        <img src="/api/placeholder/120/40" alt="SignIE Logo" class="logo">
    </nav>


    <main>
        <h1>Login</h1>
        <form style="width: 100%">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" required>
                <a href="/forgot-password" class="forgot-password">Forgot Password?</a>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center;">
                <button type="submit" class="submit-btn">Submit</button>
                <button type="button" class="google-btn">
                    Login with Google
                </button>
            </div>
        </form>
        <p class="signup-prompt">No Account? <a href="/signup">Sign Up here!</a></p>
    </main>

    <footer>
        <p>&copy; 2025 SignIE</p>
        <div class="footer-links">
            <a href="/home">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
        </div>
        <div class="social-links">
            <a href="#" aria-label="TikTok">TikTok</a>
            <a href="#" aria-label="Instagram">Instagram</a>
        </div>
    </footer>
</div>)
}