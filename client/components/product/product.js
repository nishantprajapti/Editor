import React from 'react';
import $ from 'jquery'

export default class Product extends React.Component {
  constructor() {
    super();
    this.enableButton = this.enableButton.bind(this);
    this.generateproductcode = this.generateproductcode.bind(this);
    this.getproductdetail = this.getproductdetail.bind(this);
    this.isError = this.isError.bind(this);
    this.changeproductoption = this.changeproductoption.bind(this);
    this.state = {
      'url': '',
      'skipcart': false,
      'bestsellers': false,
      'showrelated': false,
      'showratings': false,
      'showreviews': false
    }
  }


  getproductdetail(event) {
    event.preventDefault();
    document.getElementById("demo-product").style.display = 'none';
    document.getElementById("productbtn").innerText = 'Loading...';
    document.getElementById("productbtn").setAttribute("disabled", "true");
    document.getElementById("error-message-product").style.display = 'none';

    var url = document.getElementById("producturl").value;
    fetch("/product?getproducturl=" + url).then(results => {
      return results.json()
    }).then(data => {
      if (data.status == 400) {
        document.getElementById("productbtn").innerText = 'Go';
        document.getElementById("error-message-product").style.display = 'block';
        document.getElementById("error-message-product").innerText = data.message;
        document.getElementById("productbtn").removeAttribute("disabled");
      } else {

        document.getElementById("error-message-product").style.display = 'none';
        document.getElementById("productbtn").innerText = 'Go';
        document.getElementById("productbtn").removeAttribute("disabled");
        this.setState({
          'skipcart': data[0].skipcart,
          'bestsellers': data[1].bestsellers,
          'showrelated': data[2].showrelated,
          'showratings': data[3].showratings,
          'showreviews': data[4].showreviews,
        })
      }
    })
  }

  changeproductoption(event) {
    var checkboolean = event.target.value == 'true' ? true : false;
    this.setState({
      [event.target.name]: checkboolean
    })
  }


  generateproductcode(event) {
    event.preventDefault();
    var jsondata = [];
    var productoptions = document.querySelectorAll('.productoptions');
    productoptions.forEach(function (element, index) {
      let labeltext = element.querySelector("label").getAttribute("id");
      let radiobuttonvalue = element.querySelector('.radiolabel input').checked;
      jsondata.push({
        [labeltext]: radiobuttonvalue
      })
    })

    jsondata = JSON.stringify(jsondata);
    var fullgeneratedjson = '<noscript pagetype="Product" id="wysiwyg-Product">{ "pagetype":"Product","type":"Product","content":' + jsondata + ' }</noscript>';
    var textval = document.getElementById("demo-product");
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
  isError(event) {
    document.getElementById("demo-product").style.display = "none";
  }

  render() {
    return (
      <div className="ws-content product">
        <div className="container">
          <form className="form-horizontal"  >
            <div className="form-group">
              <div className="col-sm-12 margin-bottom">
                <label className="control-label col-sm-3" >Enter the URL</label>
                <div className="col-sm-6 input-group">
                  <span className="input-group-addon">Starts with https://...</span>
                  <input type="text" onChange={this.enableButton} id="producturl" className="form-control" />
                  <div className="col-sm-2 text-right">
                    <button disabled={this.state.url.length ? false : true} type="button" onClick={this.getproductdetail} id="productbtn" className="btn btn-primary btn-md"> Go </button>
                  </div>
                </div>
              </div>
              <div className="error-message" id="error-message-product"></div>
              <div className="col-md-12 margin-top margin-bottom">
                <h3 className="col-md-9 col-md-offset-3">Product Options</h3>
              </div>
              <div className="col-sm-12 margin-bottom">
                <div className="productoptions col-md-12 margin-bottom-half">
                  <label className="control-label col-sm-3 margin-none" id="skipcart" >Skip cart</label>
                  <div className="col-sm-6">
                    <label className="radiolabel"> <input type="radio" name='skipcart' value='true' onClick={this.isError} onChange={this.changeproductoption.bind(this)} checked={(this.state.skipcart == true) ? true : false} />  Yes  </label>
                    <label className="radiolabel"> <input type="radio" name='skipcart' value='false' onClick={this.isError} onChange={this.changeproductoption.bind(this)} checked={(this.state.skipcart == false) ? true : false} /> No </label>
                  </div>
                </div>

                <div className="productoptions col-md-12 margin-bottom-half">
                  <label className="control-label col-sm-3 margin-none" id="bestsellers" >Show Best Sellers</label>
                  <div className="col-sm-6">
                    <label className="radiolabel"> <input type="radio" name='bestsellers' value='true' onClick={this.isError} onChange={this.changeproductoption.bind(this)} checked={(this.state.bestsellers == true) ? true : false} />  Yes  </label>
                    <label className="radiolabel"> <input type="radio" name='bestsellers' value='false' onClick={this.isError} onChange={this.changeproductoption.bind(this)} checked={(this.state.bestsellers == false) ? true : false} /> No </label>
                  </div>
                </div>
                <div className="productoptions col-md-12 margin-bottom-half">
                  <label className="control-label col-sm-3 margin-none" id="showrelated" >Show Related</label>
                  <div className="col-sm-6">
                    <label className="radiolabel"> <input type="radio" name='showrelated' value='true' onClick={this.isError} onChange={this.changeproductoption.bind(this)} checked={(this.state.showrelated == true) ? true : false} />  Yes  </label>
                    <label className="radiolabel"> <input type="radio" name='showrelated' value='false' onClick={this.isError} onChange={this.changeproductoption.bind(this)} checked={(this.state.showrelated == false) ? true : false} /> No </label>
                  </div>
                </div>
                <div className="productoptions col-md-12 margin-bottom-half" >
                  <label className="control-label col-sm-3 margin-none" id="showratings" >Show Ratings</label>
                  <div className="col-sm-6">
                    <label className="radiolabel"> <input type="radio" name='showratings' value='true' onClick={this.isError} onChange={this.changeproductoption.bind(this)} checked={(this.state.showratings == true) ? true : false} />  Yes  </label>
                    <label className="radiolabel"> <input type="radio" name='showratings' value='false' onClick={this.isError} onChange={this.changeproductoption.bind(this)} checked={(this.state.showratings == false) ? true : false} /> No </label>
                  </div>
                </div>
                <div className="productoptions col-md-12 margin-bottom-half">
                  <label className="control-label col-sm-3 margin-none" id="showreviews" >Show Reviews</label>
                  <div className="col-sm-6">
                    <label className="radiolabel"> <input type="radio" name='showreviews' value='true' onClick={this.isError} onChange={this.changeproductoption.bind(this)} checked={(this.state.showreviews == true) ? true : false} />  Yes  </label>
                    <label className="radiolabel"> <input type="radio" name='showreviews' value='false' onClick={this.isError} onChange={this.changeproductoption.bind(this)} checked={(this.state.showreviews == false) ? true : false} /> No </label>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="col-md-12 text-center margin-top">
            <textarea readOnly id="demo-product" />
            <button onClick={this.generateproductcode} className="btn btn-primary btn-md margin-top">Generate Code</button>
          </div>
        </div>
      </div>
    )
  }
}
