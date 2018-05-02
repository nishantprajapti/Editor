import React from 'react';
import $ from 'jquery';
import DuplicateData from './duplicatedata'


export default class Product extends React.Component {
  constructor() {
    super();
    this.enableButton = this.enableButton.bind(this);
    this.getduplicatedata = this.getduplicatedata.bind(this);
    this.generatorglobalcode = this.generatorglobalcode.bind(this);
    this.getbannerdetails = this.getbannerdetails.bind(this);
    this.addhttps = this.addhttps.bind(this);
    this.state = {
      'url': ''
    }
  }

  getbannerdetails(event) {
    event.preventDefault();
    document.getElementById("demo-global").style.display = 'none';
    document.getElementById("globalbannerbtn").innerText = 'Loading...';
    document.getElementById("globalbannerbtn").setAttribute("disabled", "true");
    document.getElementById("error-message-globalurl").style.display = 'none';

    var url = document.getElementById("globalbannerurl").value;
    fetch("/globalbanner?getglobalbanners=" + url).then(results => {
      return results.json()
    }).then(data => {
      if (data.status == 400) {
        document.getElementById("globalbannerbtn").innerText = 'Go';
        document.getElementById("error-message-globalurl").style.display = 'block';
        document.getElementById("error-message-globalurl").innerText = data.message;
        document.getElementById("globalbannerbtn").removeAttribute("disabled");
      } else {
        this.child.removedummydata();
        document.getElementById("error-message-globalurl").style.display = 'none';
        document.getElementById("globalbannerbtn").innerText = 'Go';
        document.getElementById("globalbannerbtn").removeAttribute("disabled");
        this.child.getbannerdata(data);
        this.child.makeclosevisible();
      }
    })

  }

  generatorglobalcode(event) {
    event.preventDefault();
    var jsondata = [];
    var repetativedata = document.querySelectorAll("div.data-wrapper");

    repetativedata.forEach(function (element, index) {

      var bannertext = element.querySelector(".bannerprev").value;
      var bannerbackcolor = element.querySelector(".backcoloroftext").innerText;
      bannerbackcolor = bannerbackcolor.trim();
      var bannertextcolor = element.querySelector(".textcolorofbanner").innerText;
      bannertextcolor = bannertextcolor.trim();
      var pagetypeofbanner = element.querySelector("select").value;
      var usertype = $("input[name=usertype" + index + "]:checked").attr("id");
      usertype = usertype.slice(0, -1);
      var redirecturl = element.querySelector("#banner_redirect").value;

      jsondata.push({
        "bannertext": bannertext,
        "bannerbackcolor": bannerbackcolor,
        "bannertextcolor": bannertextcolor,
        "pagetypeofbanner": pagetypeofbanner,
        "usertype": usertype,
        "redirecturl": redirecturl,
      })
    });

    jsondata = JSON.stringify(jsondata);
    var fullgeneratedjson = '<noscript pagetype="Global" id="wysiwyg-Global">{ "pagetype":"Global","type":"Global","content":' + jsondata + ' }</noscript>';
    var textval = document.getElementById("demo-global");
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


  addhttps = (indexofdata, event) => {
 var checkurl = event.target.value;
    if (checkurl.indexOf("https://") !== -1) {
      this.setState({
        madechange: true
      })
    }
    else if (checkurl.indexOf("http://") !== -1) {
      checkurl = checkurl.replace("http://", "https://");
      event.target.value = checkurl;
      if (indexofdata != 'globalbannerurl') {
        var fullarray = this.child.state.bannerdata;
        fullarray[indexofdata].redirecturl = checkurl;
        this.setState({
          bannerdata: fullarray
        })
      }

    }
    else {
      event.target.value = 'https://' + checkurl;
      if (indexofdata != 'globalbannerurl') {
        var fullarray = this.child.state.bannerdata;
        fullarray[indexofdata].redirecturl = 'https://' + checkurl;
        this.setState({
          bannerdata: fullarray
        })
  }
    }
  }


  getduplicatedata(event) {
    event.preventDefault();
    this.child.createClone();
  }


  render() {
    return (
      <div className="ws-content global-banner">
        <div className="container">
          <form className="form-horizontal" onSubmit={this.getbannerdetails} >
            <div className="form-group">
              <div className="col-sm-12 margin-bottom">
                <label className="control-label col-sm-3" >Enter the URL</label>
                <div className="col-sm-6 input-group">
                  <span className="input-group-addon">Starts with https://...</span>
                  <input type="text" onChange={this.enableButton} onBlur={this.addhttps.bind(this, "globalbannerurl")} id="globalbannerurl" className="form-control" />
                  <div className="col-sm-2">
                    <button type="submit" disabled={this.state.url.length ? false : true} id="globalbannerbtn" className="btn btn-primary btn-md"> Go </button>
                  </div>
                </div>
              </div>

              <div className="error-message" id="error-message-globalurl"></div>
              <div className="col-md-12 margin-top">
                <h3 className="col-md-9 col-md-offset-2 paddingzero">Gold Banner</h3>
              </div>

              <div className="col-md-12 global-data repetative-data paddingzero">
                <DuplicateData sendblurevent={this.addhttps} onRef={ref => this.child = ref} />
              </div>


              <div className="col-md-12 addnewbtn margin-top text-right">
                <input type="button" onClick={this.getduplicatedata} className="btn btn-primary btn-sm btn-info js-add-row-trigger pull-right" value="+ Add New" />
              </div>

              <div className="col-md-12 globalbtn margin-top text-center">
                <textarea readOnly id="demo-global" />
                <input type="button" className="btn btn-primary btn-md margin-top margin-bottom" onClick={this.generatorglobalcode} value="Generate Code" />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
