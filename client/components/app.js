import React from 'react';
import Home from './hometab/home';
import Product from './product/product';
import Redirect from './Redirect/redirect';
import Checkout from './checkout/checkout';
import Global from './global/global.js';
import $ from 'jquery';
import { Tab, TabList, Tabs, PersistentTabPanel } from 'react-context-tabs';


function getHash() {
  return window.location.hash.slice(1)
}

export default class App extends React.Component {
  constructor() {
    super();
    let getdefault = getHash().length == 0 ? 'home' : getHash();
    this.state = { selectedTabId: getdefault }
    this.handleHashChange = this.handleHashChange.bind(this)
    this.handleTabChange = this.handleTabChange.bind(this)
  }

  componentDidMount() {
    window.onhashchange = this.handleHashChange
  }

  componentWillUnmount() {
    window.onhashchange = null
  }

  handleHashChange(event) {
    this.setState({ selectedTabId: getHash() })
  }

  handleTabChange(nextTab, prevTab) {
    window.location.hash = nextTab
  }

  render() {

    const { selectedTabId } = this.state
    return (
      <div className="container-fluid ws-body">
        <div className="row">
          <div className="page-header ws-header">
            <h1>Wysiwyg Editor 1.0 </h1>
          </div>


          <Tabs selectedTabId={selectedTabId} onTabChange={this.handleTabChange} >
            <TabList>
              <Tab tabId='home'>Widgets</Tab>
              <Tab tabId='product'>Product</Tab>
              <Tab tabId='checkout'>Checkout</Tab>
              <Tab tabId='global'>Global</Tab>
              <Tab tabId='redirect'>Redirect</Tab>
            </TabList>

            <PersistentTabPanel tabId='home'>
              <Home />
            </PersistentTabPanel>

            <PersistentTabPanel tabId='product'>
              <Product />
            </PersistentTabPanel>

            <PersistentTabPanel tabId='checkout'>
              <Checkout />
            </PersistentTabPanel>

            <PersistentTabPanel tabId='global'>
              <Global />
            </PersistentTabPanel>

            <PersistentTabPanel tabId='redirect'>
              <Redirect />
            </PersistentTabPanel>

          </Tabs>
        </div>
      </div>
    )
  }
}
