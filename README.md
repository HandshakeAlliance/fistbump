# FistBump
An open source search for Handshake TLDs

## Purpose
It's [pretty well known](https://domains.google/learn/5-things-to-watch-out-for-when-buying-a-domain/#/) that you can't always trust a domain registrar to keep you data private. While registrars are a great service, they don't make a ton of money on registering domain names and so they look for other ways to monetize. Like your search queries, for instance. Consider this scenario:

Alice is looking to buy a domain and so she goes on Godaddy to search around for one that sounds good. She runs a bunch of searches and finds one that is short enough to remember but also clever and describes her business well. She needs to run it by her business partner so she doesn't buy it on the spot. I mean, if someone hasn't bought it for the first 2 decades of the internet they surely won't in the next 24 hours. After a day Alice comes back to purchase the domain only to find that it's been registered already by Bob. She emails Bob to ask about getting the domain, and Bob is happy to sell it back to her at 10-100x the original price. 

Who knows if Godaddy was actually selling your search logs to professional domain squatters like Bob, but why take the chance? With FistBump, all of your Handshake TLD searches happen on your own node and the FistBump code is open source so you never have to worry about someone using your own data against you!

## Install
### Prerequisites
- You will need to have an [HSD full-node](https://github.com/handshake-org/hsd) running and synced, FistBump connects to the node to run TLD searches.
- Nodejs and NPM

### Build from Source
```
$ git clone git@github.com:dylanbathurst/fistbump.git
$ cd fistbump
$ npm install
$ npm run build
```
### Add to Chrome
1. After the build has finished, open a new Chrome tab and go to `chrome://extensions`.
1. Toggle on "Developer mode" in the upper right corner of the tab.
1. Click "Load unpacked" in upper left corner of the tab and open the `PATH/TO/fistbump/dist` dir.

## Usage
The extension is ridiculously simple. There are two inputs. The first is for your HSD node's api endpoint. It'll most likely be something like `http://127.0.0.1:13037` for HSD's testnet. After that you type your search query into the second field and you'll see, in real time, if that TLD is [pre-reserved](https://handshake-org.github.io/api-docs/index.html#getnameinfo), already registered, or still available to claim. To do the actual claiming, I suggest using [Namebase](https://namebase.io/).

## License
MIT License.
