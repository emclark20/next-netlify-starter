import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
export default function SignUp() {
  return ( <div>
    <Header/>


    <main>
        <h1>Login</h1>
        <form>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" required></input>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" required></input>
                <a href="/forgot-password" class="forgot-password">Forgot Password?</a>
            </div>
            <div>
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
