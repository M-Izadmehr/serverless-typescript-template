const launchChrome = require('@serverless-chrome/lambda')
import puppeteer from 'puppeteer-core'
import axios from 'axios'

const getPuppeteer = async () => {
    const chrome = await launchChrome()

    const response = await axios.get(`${chrome.url}/json/version`, {
        headers: { 'Content-Type': 'application/json' },
    })

    const endpoint = response.data.webSocketDebuggerUrl

    const browser = await puppeteer.connect({
        browserWSEndpoint: endpoint,
    })

    return browser
}

export default getPuppeteer
