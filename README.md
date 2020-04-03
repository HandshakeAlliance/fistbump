# FistBump
An open source browser extension for the Handshake network

## Purpose
It's [pretty well known](https://domains.google/learn/5-things-to-watch-out-for-when-buying-a-domain/#/) that you can't always trust a domain registrar to keep you data private. While registrars are a great service, they don't make a ton of money on registering domain names and so they look for other ways to monetize. Like your search queries, for instance. Consider this scenario:

Alice is looking to buy a domain and so she goes on Godaddy to search around for one that sounds good. She runs a bunch of searches and finds one that is short enough to remember but also clever and describes her business well. She needs to run it by her business partner so she doesn't buy it on the spot. I mean, if someone hasn't bought it for the first 2 decades of the internet they surely won't in the next 24 hours. After a day Alice comes back to purchase the domain only to find that it's been registered already by Bob. She emails Bob to ask about getting the domain, and Bob is happy to sell it back to her at 10-100x the original price.

Who knows if Godaddy was actually selling your search logs to professional domain squatters like Bob, but why take the chance? With FistBump, all of your Handshake TLD searches happen on your own node and the FistBump code is open source so you never have to worry about someone using your own data against you!

## Install
### Prerequisites
- You will need to have an [HSD full-node](https://github.com/handshake-org/hsd) running and synced, FistBump connects to the node to run TLD searches. Optionally you can use [Bob Wallet](https://github.com/kyokan/bob-wallet) to set up a full node to connect to.
- Nodejs and NPM

### Build from Source
```
$ git clone git@github.com:HandshakeAlliance/fistbump.git
$ cd fistbump
$ npm install
$ npm start
```
### Add to Chrome
1. After the build has finished, open a new Chrome tab and go to `chrome://extensions`.
1. Toggle on "Developer mode" in the upper right corner of the tab.
1. Click "Load unpacked" in upper left corner of the tab and open the `PATH/TO/fistbump/dist` dir.

## Usage
In its current state Fistbump supports very basic wallet functionality. (just shows your balance, more wallet features coming soon!) Its primary use is for searching for TLDs. There are two ways to do this. Once connected to your node, there is a persistent search input in the header of the extensions popup. Also, without opening the extension you can click directly in the browser address bar, type `fb` and press the tab key, and start typing a handshake name. This allows you to quickly search for TLDs, read their brief details, select/enter/save the TLD to your watch list directly from the address bar.

## Usage with Bob Wallet
If you're using Bob Wallet (which I highly recommend, it's awesome) to run your full node, there's two things to note.
1. Your api key is located in Bob's settings under `HSD API Key`
1. Bob creates a wallet for you called `allison` instead of using the `primary` wallet id so plug that into the wallet id field

## Roadmap
- Wallet Features
- Enable Browser to resolve handshake domains
- Bidding/Revealing/Redeeming TLDs

## Notable Technology
- React
- React Router
- Redux
- Redux Saga
- Redux Form
- Typescript
- Styled Components

## Tips
- HNS hs1q88duxnsagvqrdkqh38wupsa334gshkdwz09jvt
- BTC 3JJmpuDQoRMD12yJc1Vpi2WBubLeNXeuNw

## License
MIT License.
