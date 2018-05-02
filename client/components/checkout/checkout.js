import React from 'react';
import $ from 'jquery'

export default class Checkout extends React.Component {
  constructor() {
    super();
    this.enableButton = this.enableButton.bind(this);
    this.generatecheckout = this.generatecheckout.bind(this);
    this.getcheckoutdetail = this.getcheckoutdetail.bind(this);
    this.changecheckoutoption = this.changecheckoutoption.bind(this);
    this.state = {
      'url': '',
      'addtocart': false,
      'checkoutrecipient': false,
      'expandpromo': false,
      'expandgiftcard': false,
    }
  }


  getcheckoutdetail(event) {
    event.preventDefault();
    document.getElementById("demo-checkout").style.display = "none";
    document.getElementById("checkoutbtn").innerText = 'Loading...';
    document.getElementById("checkoutbtn").setAttribute("disabled", "true");
    document.getElementById("error-message-checkout").style.display = 'none';

    var url = document.getElementById("checkouturl").value;
    fetch("/checkout?getcheckouturl=" + url).then(results => {
      return results.json()
    }).then(data => {
      if (data.status == 400) {
        document.getElementById("checkoutbtn").innerText = 'Go';
        document.getElementById("error-message-checkout").style.display = 'block';
        document.getElementById("error-message-checkout").innerText = data.message;
        document.getElementById("checkoutbtn").removeAttribute("disabled");
      } else {
        document.getElementById("error-message-checkout").style.display = 'none';
        document.getElementById("checkoutbtn").innerText = 'Go';
        document.getElementById("checkoutbtn").removeAttribute("disabled");
        this.setState({
          'addtocart': data[0].addtocart,
          'checkoutrecipient': data[1].checkoutrecipient,
          'expandpromo': data[2].expandpromo,
          'expandgiftcard': data[3].expandgiftcard
        })
      }
    })
  }

  changecheckoutoption(event) {
    var checkboolean = event.target.value == 'true' ? true : false;
    this.setState({
      [event.target.name]: checkboolean
    })
  }

  generatecheckout(event) {
    event.preventDefault();
    var jsondata = [];
    var checkoutoptions = document.querySelectorAll('.checkoutoptions');
    checkoutoptions.forEach(function (element, index) {
      let labeltext = element.querySelector("label").getAttribute("id");
      let radiobuttonvalue = element.querySelector('.radiolabel input').checked;
      jsondata.push({
        [labeltext]: radiobuttonvalue
      })
    })

    jsondata = JSON.stringify(jsondata);
    var fullgeneratedjson = '<noscript pagetype="Checkout" id="wysiwyg-Checkout">{ "pagetype":"Checkout","type":"Checkout","content":' + jsondata + ' }</noscript>';
    var textval = document.getElementById("demo-checkout");
    textval.value = fullgeneratedjson;
    textval.style.display = "block";
    textval.select();
  }

  // Enable Go button
  enableButton(event) {
    this.setState({
      url: event.target.value
    })
  }
  isError() {
    document.getElementById("demo-checkout").style.display = "none";
  }

  render() {
    return (
      <div className="ws-content checkout">
        <div className="container">
          <form className="form-horizontal" onSubmit={this.getcheckoutdetail} >
            <div className="form-group">

              <div className="col-sm-12 margin-bottom">
                <label className="control-label col-sm-3" >Enter the Checkout Page URL</label>
                <div className="col-sm-6 input-group">
                  <span className="input-group-addon">Starts with https://...</span>
                  <input type="text" onChange={this.enableButton} id="checkouturl" className="form-control" />
                  <div className="col-sm-2 text-right">
                    <button disabled={this.state.url.length ? false : true} type="submit" id="checkoutbtn" className="btn btn-primary btn-md"> Go </button>
                  </div>
                </div>
              </div>
              <div className="error-message" id="error-message-checkout"></div>

              <div className="col-md-12 margin-top">
                <h3 className="col-md-8 col-md-offset-4">Checkout Options</h3>
              </div>

              <div className="col-sm-12 margin-bottom">
                <div className="checkoutoptions col-md-12 margin-bottom-half">
                  <label className="control-label col-sm-4 margin-none" id="addtocart" >Show Added to Cart Modal</label>
                  <div className="col-sm-6">
                    <label className="radiolabel"> <input type="radio" name="addtocart" value="true" onClick={this.isError} onChange={this.changecheckoutoption.bind(this)} checked={(this.state.addtocart == true) ? true : false} />  Yes  </label>
                    <label className="radiolabel"> <input type="radio" name="addtocart" value="false" onClick={this.isError} onChange={this.changecheckoutoption.bind(this)} checked={(this.state.addtocart == false) ? true : false} /> No </label>
                  </div>
                </div>

                <div className="checkoutoptions col-md-12 margin-bottom-half">
                  <label className="control-label col-sm-4 margin-none" id="checkoutrecipient" >Show Guest Checkout page on Recipient</label>
                  <div className="col-sm-6">
                    <label className="radiolabel"> <input type="radio" name="checkoutrecipient" value="true" onClick={this.isError} onChange={this.changecheckoutoption.bind(this)} checked={(this.state.checkoutrecipient == true) ? true : false} />  Yes  </label>
                    <label className="radiolabel"> <input type="radio" name="checkoutrecipient" value="false" onClick={this.isError} onChange={this.changecheckoutoption.bind(this)} checked={(this.state.checkoutrecipient == false) ? true : false} /> No </label>
                  </div>
                </div>
                <div className="checkoutoptions col-md-12 margin-bottom-half">
                  <label className="control-label col-sm-4 margin-none" id="expandpromo" > Expand Promo </label>
                  <div className="col-sm-6">
                    <label className="radiolabel"> <input type="radio" name="expandpromo" value="true" onClick={this.isError} onChange={this.changecheckoutoption.bind(this)} checked={(this.state.expandpromo == true) ? true : false} />  Yes  </label>
                    <label className="radiolabel"> <input type="radio" name="expandpromo" value="false" onClick={this.isError} onChange={this.changecheckoutoption.bind(this)} checked={(this.state.expandpromo == false) ? true : false} /> No </label>
                  </div>
                </div>
                <div className="checkoutoptions col-md-12 margin-bottom-half" >
                  <label className="control-label col-sm-4 margin-none" id="expandgiftcard" >Expand Giftcard</label>
                  <div className="col-sm-6">
                    <label className="radiolabel"> <input type="radio" name="expandgiftcard" value="true" onClick={this.isError} onChange={this.changecheckoutoption.bind(this)} checked={(this.state.expandgiftcard == true) ? true : false} />  Yes  </label>
                    <label className="radiolabel"> <input type="radio" name="expandgiftcard" value="false" onClick={this.isError} onChange={this.changecheckoutoption.bind(this)} checked={(this.state.expandgiftcard == false) ? true : false} /> No </label>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="col-md-12 text-center margin-top">
            <textarea readOnly id="demo-checkout" />
            <button onClick={this.generatecheckout} className="btn btn-primary btn-md margin-top">Generate Code</button>
          </div>
        </div>
      </div>
    )
  }
}
