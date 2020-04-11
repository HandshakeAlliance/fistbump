const { NodeClient, WalletClient } = require('hs-client')
import { NodeInfoType } from '../store/actions'
import { defaultTo } from 'ramda'

class Api {
  client: any;
  wallet: any;

  constructor(nodeInfo: NodeInfoType) {
    const { nodeUrl, apiKey, walletId } = nodeInfo
    const parsed = new URL(nodeUrl)
    const clientOptions = {
      network: 'main',
      url: `${parsed.protocol}//${parsed.hostname}`,
      port: 12037,
      apiKey,
    }

    const walletOptions = {
      network: 'main',
      url: `${parsed.protocol}//${parsed.hostname}`,
      port: 12039,
      apiKey,
    }

    this.client = new NodeClient(clientOptions);
    const walletClient = new WalletClient(walletOptions);
    this.wallet = walletClient.wallet(defaultTo('primary')(walletId));
  }

  getInfo = () => {
    return this.client
      .getInfo()
      .catch((e: Error) => {
        return { error: e.message }
      })
  }
  getWalletInfo = () => {
    return this.wallet
      .getInfo()
      .catch((e: Error) => {
        return { error: e.message }
      })
  }
  getNameInfo = (name: string) => this.client.execute('getnameinfo', [ name ])
  getNameByHash = (hash: string) => {
    return this.client.execute('getnamebyhash', [ hash ])
  }
  getTransactions = () => this.wallet.getHistory('default')
}

export default Api
