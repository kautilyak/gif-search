import React, { Component } from 'react';
import './App.css';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

export default class App extends Component {
  
  state = {
    gifs: [],
    loading: true
  };

  componentDidMount() {
    fetch('http://api.giphy.com/v1/gifs/trending?api_key=0BVSfVNee1YerQFVYoPL1E1pdKFT0IFn')
      .then(response => response.json()) 
      .then(responseData => {
        this.setState({
          gifs: responseData.data,
          loading: false
        });
      })

      .catch(err => {
        console.log('Error fetching and parsing data!', err);
      })
  }

  showLoading = () => {
    this.setState({
      loading: true
    });

    setInterval(() => {
      this.setState({
        loading: false
      });     
    }, 3000);
  }

  searchGIF = (phrase) => {
    
    this.showLoading();

    let url = new URL('https://api.giphy.com/v1/gifs/search');
    url.search = new URLSearchParams({
      q: phrase,
      api_key: '0BVSfVNee1YerQFVYoPL1E1pdKFT0IFn'
    });

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          gifs: data.data,
          loading: false
        });
      });
  }


  render() { 
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.searchGIF}/>      
          </div>   
        </div>    
        <div className="main-content">

        { (this.state.loading) ? <h2>Loading.....</h2> : <GifList data={this.state.gifs}/>}

        </div>
      </div>
    );
  }
}
