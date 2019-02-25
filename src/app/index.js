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
      state: '',
      trackedNames: new Map()
    };
    this.updateAPIEndpoint = this.updateAPIEndpoint.bind(this);
    this.saveAPIEndpoint = this.saveAPIEndpoint.bind(this);
    this.trackName = this.trackName.bind(this);
    this.searchNames = this.searchNames.bind(this);
    this.updateTrackedNameInfo = this.updateTrackedNameInfo.bind(this);
  }
  componentDidMount() {
      // chrome.storage.local.remove('trackedNames');
      chrome.storage.local.get(['apiEndpoint', 'trackedNames'], (storage) => {
        const apiUrl = (storage.apiEndpoint) ? JSON.parse(storage.apiEndpoint) : '';
        const trackedNames = (storage.trackedNames) ? JSON.parse(storage.trackedNames) : [];
        this.setState({ apiUrl }, () => {
          this.updateTrackedNameInfo(trackedNames);
        });
      });
  }
  render() {
    let trackedNamesList = [];
    this.state.trackedNames.forEach((value, key) => {
      trackedNamesList.push(
        <li key={key}>
          <a href="#" 
             onClick={() => { this.setState({ searchTerm: key }, () => { 
               this.searchNames({target: {value: key}}) }) }}>
            {key}
          </a>
            &middot; Block {value.result.start.start} &middot; Available on Mainnet
          ~{value.result.start.week} weeks after launch &middot; {(value.result.info) ? value.result.info.state : ''}
          <button className="unTrackButton"
                  onClick={() => { this.unTrackName(key) }} >
            x
          </button>
        </li>
      );
    })
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
                 value={this.state.searchTerm}
                 onChange={this.searchNames} />
        </div>
        {this.state.searchTerm &&
          <div className="row">
            <button className="trackButton"
                    onClick={this.trackName} >
              Track
            </button>
          </div>
        }
          <div className="row">
            <ul className="trackedList">
            {trackedNamesList}
            </ul>
          </div>
      </div>
    );
  }
  async updateTrackedNameInfo(nameList) {
    nameList = new Map(nameList);
    const trackedNames = new Map();
    for (const name of nameList.entries()) {
      const nameInfo = await this.fetchName(name[0]);
      trackedNames.set(name[0], nameInfo);
    }

    this.setState({ trackedNames });
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
  async trackName(e) {
    const term = this.state.searchTerm;
    const trackedNames = this.state.trackedNames;
    const exists = trackedNames.get(term);
    if (!exists) {
      trackedNames.set(term, await this.fetchName(term));
    }  
    this.setState({ trackedNames });
    chrome.storage.local.set({ trackedNames: JSON.stringify([...trackedNames]) });
  }
  unTrackName(name) {
    const trackedNames = this.state.trackedNames;
    trackedNames.delete(name);
    this.setState({ trackedNames });
    chrome.storage.local.set({ trackedNames: JSON.stringify([...trackedNames]) });
  }
  async fetchName(name) {
    const { protocol, host, auth } = this.state.apiUrl;
    const encodedAuth = window.btoa(auth);
    
    return fetch(`${protocol}//${host}`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${encodedAuth}`
      },
      body: JSON.stringify({ 'method': 'getnameinfo', 'params': [`${name}`]})
    })
    .then(res => res.json());
  }
  async searchNames(e) {
    this.setState({ error: null, searchTerm: e.target.value }, async () => {
      const searchTerm = this.state.searchTerm;
      const data = await this.fetchName(searchTerm);
      
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
      
      this.setState({ reserved, state });
    })
  }
}