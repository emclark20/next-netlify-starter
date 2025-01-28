import { League_Spartan, Nunito } from 'next/font/google'

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  variable: '--font-league-spartan',
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-nunito',
  display: 'swap',
});

import '@styles/globals.css'

function Application({ Component, pageProps }) {
  return (
    <main className={`${nunito.variable} ${leagueSpartan.variable}`}>
      <Component {...pageProps} />
    </main>
  )
}

export default Application