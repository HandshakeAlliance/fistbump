import React from 'react';
import url from 'url';
import './index.less';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiUrl: 'http://127.0.0.1:13037/',
      searchTerm: '',
      reserved: false,
      state: ''
    };
    this.updateAPIEndpoint = this.updateAPIEndpoint.bind(this);
    this.saveAPIEndpoint = this.saveAPIEndpoint.bind(this);
    this.searchNames = this.searchNames.bind(this);
  }
  componentDidMount() {
      chrome.storage.local.get(['apiEndpoint'], (storage) => {
        const deserializedEndpoint = JSON.parse(storage.apiEndpoint) || '';
        this.setState({ apiUrl: deserializedEndpoint });
      });
  }
  render() {
    return (
      <div className="container">
        <div className="row name-search">
          {(this.state.error)
            ? <span className="error">{this.state.error}</span>
            : <div className="result-box">
                <span 
                  className={this.state.state} >
                  {this.state.searchTerm || <span className="default-term">Search for a name</span>} 
                </span>
                <span 
                  className={this.state.state} >
                  {this.state.state}
                </span>
              </div>
          }
        </div>
        <div className="row">
          <input type="text" 
                 placeholder='http://127.0.0.1:13037/'
                 value={this.state.apiUrl.href || ''} 
                 onChange={this.updateAPIEndpoint}
                 onBlur={this.saveAPIEndpoint} />
        </div>
        <div className="row">
          <input type="text" 
                 placeholder='fistbump'
                 onChange={this.searchNames} />
        </div>
      </div>
    );
  }
  updateAPIEndpoint(e) {
    const parsedUrl = url.parse(e.target.value);
    this.setState({ apiUrl: parsedUrl });
  }
  saveAPIEndpoint(e) {
    if (!this.state.apiUrl) {
        return chrome.storage.local.remove('apiEndpoint');
    }
    
    const serializedEndpoint = JSON.stringify(this.state.apiUrl);
    chrome.storage.local.set({ apiEndpoint: serializedEndpoint });
  }
  searchNames(e) {
    this.setState({ error: null })
    const searchTerm = e.target.value;
    const { protocol, host, auth } = this.state.apiUrl;
    const encodedAuth = window.btoa(auth);
    
    fetch(`${protocol}//${host}`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${encodedAuth}`
      },
      body: JSON.stringify({ 'method': 'getnameinfo', 'params': [`${searchTerm}`]})
    })
    .then(res => res.json())
    .then((data) => {
      if (data.error) return this.setState({ error: data.error.message });
      
      let reserved, state;
      if (!data.result.info && !data.result.start.reserved) {
        reserved = false;  
        state = 'AVAILABLE';
      } else if (!data.result.info && data.result.start.reserved) {
        reserved = true;
        state = 'PRE-RESERVED';
      } else if (data.result.info.state != 'BIDDING') {
        reserved = true;
        state = data.result.info.state;
      } else {
        reserved = false;
        state = 'AVAILABLE';
      }
      
      this.setState({ reserved, searchTerm, state });
    })
  }
}