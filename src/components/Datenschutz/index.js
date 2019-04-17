import React from 'react';
const axios = require('axios');

class Datenschutz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      content: null,
      title: null
    };
  }
  
  componentDidMount() {
    axios.get('https://baeckerei-muenzel.de/wp-json/wp/v2/pages/6689')
    .then(res => {
      this.setState({
        isLoaded: true,
        content: res.data.content.rendered,
        title: res.data.title.rendered
      })
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
    
    // createMarkup() {
    //   return {__html: this.state.content};
    // }
    }
  
    render() {
      const { error, isLoaded} = this.state;
      const createMarkup = () => {
        return {__html: this.state.content}
      }

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <div dangerouslySetInnerHTML={createMarkup()} />

        );
      }
    }
  
}

export default Datenschutz