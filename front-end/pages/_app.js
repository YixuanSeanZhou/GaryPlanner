import React from 'react';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoadingOverlay from "react-loading-overlay";

class MyApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      loadingText: "Loading..."
    }
  }

  enableLoading(text) {
    this.setState({
      isLoading: true,
      loadingText: text,
    })
  }

  disableLoading() {
    this.setState({
      isLoading: false,
    })
  }

  

  render() {
    return (
      <LoadingOverlay
        active={this.state.isLoading}
        text={this.state.loadingText}
        spinner
      >
        <this.props.Component 
          enableLoading={this.enableLoading.bind(this)} 
          disableLoading ={this.disableLoading.bind(this)}
          {...this.props.pageProps} 
        />
      </LoadingOverlay>
    )
  }
}

export default MyApp
