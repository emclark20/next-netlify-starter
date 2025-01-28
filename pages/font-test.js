import Head from 'next/head'
import Header from '@components/Header'

export default function FontTest() {
  return (
    <div>
      <Head>
        <title>Font Test Page</title>
      </Head>
      <Header />
      <div style={{ padding: '2rem' }}>
        <h1 style={{ marginBottom: '1rem' }}>Testing Nunito Font</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
          This text should be in Nunito font.
        </p>
        <p style={{ fontWeight: '700', marginBottom: '1rem' }}>
          This is bold Nunito text.
        </p>
        <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
          This is italic Nunito text.
        </p>
      </div>
    </div>
  )
}