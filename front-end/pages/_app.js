import React from 'react';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoadingOverlay from "react-loading-overlay";

class MyApp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      loadingText: "Loading...",
      userProfile: undefined
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


  // User Profile related
  updateUserProfile() {
    // Options for the fetch request
		const requestUrl = 'http://localhost:2333/api/users/get_user_profile'
		const options = {
			method: 'GET',
			credentials: 'include',
		}

		fetch(requestUrl, options)
			.then((response) => {
				if (response.status == 200) {
					return response.json()
				} else {
					throw Error(response.statusText)
				}
			})
			.then((data) => {
				console.log('Success:', data) // TODO: Remove for deployment

				this.setState({userProfile: data.result});
			})
			.catch((error) => {
        console.error('Error:', error)
        this.setState({userProfile: undefined})
			})
  }

  clearUserProfile() {
    this.setState({userProfile: undefined});
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

          userProfile={this.state.userProfile}
          updateUserProfile={this.updateUserProfile.bind(this)}
          clearUserProfile={this.clearUserProfile.bind(this)}

          {...this.props.pageProps} 
        />
      </LoadingOverlay>
    )
  }
}

export default MyApp
