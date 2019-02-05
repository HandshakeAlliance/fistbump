import React from 'react';
import url from 'url';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiUrl: '',
      searchTerm: '',
      reserved: false,
      state: ''
    };
    this.updateAPIEndpoint = this.updateAPIEndpoint.bind(this);
    this.searchNames = this.searchNames.bind(this);
  }
  render() {
    return (
      <div>
        <div>
          <input type="text" 
                 value={this.state.apiUrl.href || ''} 
                 onChange={this.updateAPIEndpoint} />
        </div>
        <div>
          <input type="text" 
                 onChange={this.searchNames} />
        </div>
        <div>
          {(this.state.error)
            ? <span style={{color:'red'}}>{this.state.error}</span>
            : <span>
                <span 
                  className={(this.state.reserved) ? 'isReserved' : 'available'}
                  style={(this.state.reserved) ? {color: 'red'} : {color: 'green'}} >
                  {this.state.searchTerm}: 
                </span>
                <span 
                  style={(this.state.reserved) ? {color: 'red'} : {color: 'green'}} >
                  {this.state.state}
                </span>
              </span>
          }
        </div>
      </div>
    );
  }
  updateAPIEndpoint(e) {
    const parsedUrl = url.parse(e.target.value);
    this.setState({ apiUrl: parsedUrl });
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
      
      let reserved;
      if (!data.result.info ) {
        reserved = false;  
      } else if (data.result.info.state != 'BIDDING') {
        reserved = true;
      } else {
        reserved = false;
      }
      const state = (data.result.info) ? data.result.info.state : 'AVAILABLE';
      
      this.setState({ reserved, searchTerm, state });
    })
  }
}