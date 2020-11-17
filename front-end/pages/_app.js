import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Particles from 'react-particles-js';
function MyApp({ Component, pageProps }) {

  return (
      <>
        <Particles
                    params={{
                        "particles": {
                        "number": {
                        "value": 90,
                        "density": {
                          "enable": true,
                          "value_area": 2000
                        }
                        },
                        "color": {
                          "value": "#ffffff"
                        },
                        "size": {
                        "value": 2.5
                        }
                    },
                        "interactivity": {
                        "events": {
                        "onhover": {
                        "enable": true,
                        "mode": "repulse"
                        }
                        }
                        }
                    }}/>
        <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                }}>
          <Component {...pageProps} />
        </div>
      </>
    )
}

export default MyApp
