import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Auth0Provider } from "@auth0/auth0-react";


function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain="garyplanner.us.auth0.com"
      clientId="nMnVSzU4rg1q3Ipe7mnf4fI7HblUWxvW"
      redirectUri={"http://localhost:3000/login"}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  )
}

export default MyApp
