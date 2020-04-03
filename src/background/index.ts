import { browser, Runtime } from 'webextension-polyfill-ts'
import Api from '../app/data/api'
import { isNil } from 'ramda'

let api: any

browser.runtime.onMessage.addListener(async (message, sender) => {
  const { nodeData } = await browser.storage.local.get('nodeData')
  api = new Api(nodeData)
});

browser.omnibox.onInputChanged.addListener(
  async (text: string, suggest: any) => {
    const nodeInfo = await api.getInfo()
    const data = await api.getNameInfo(text)

    suggest([
      {
        content: `${text} `, // needs to have that damn extra space there...
        description: `${text} - start block: ${data.start.start} / current block: ${nodeInfo.chain.height} ${data.info && '/ state: ' + data.info.state || ''}`,
        deletable: false,
      },
    ]);
  });

browser.omnibox.onInputEntered.addListener(
  async (text: string) => {
    text = text.trim()
    const data = await api.getNameInfo(text)
    let { savedNames } = await browser.storage.local.get('savedNames')
    savedNames = savedNames || {}
    savedNames[text] = data
    savedNames[text]._fbName = text
    await browser.storage.local.set({ savedNames })
  });
