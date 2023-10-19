import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
  title: 'Superheroes',
  description: 'Create your team of superheroes and battle one another.'
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <main>
          <Nav />
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout