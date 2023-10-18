import '@styles/globals.css';

export const metadata = {
  title: 'Superheroes',
  description: 'Create your team of superheroes and battle one another.'
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout