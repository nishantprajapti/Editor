import React from 'react';

export default class Redirect extends React.Component {
  constructor() {
    super();
  }

  generateredirect(event) {
    event.preventDefault();
    var fromurl = document.getElementById("fromurl").value;
    var tourl = document.getElementById("redirectto").value;
    if (fromurl && tourl) {
      var fromurlindex = fromurl.indexOf("https:");
      var tourlindex = tourl.indexOf("https:");
      if (fromurlindex >= 0 && tourlindex >= 0) {
        document.getElementById("fromurl").value = fromurl;
        document.getElementById("redirectto").value = tourl;
        console.log(fromurl, tourl);
        var jsondata = [];
        jsondata.push({
          'data-from-url': fromurl,
          'data-to-url': tourl
        });
        var menuname = document.querySelector("li.isSelected").innerText;
        jsondata = JSON.stringify(jsondata);
        var fullgeneratedjson = '<noscript pagetype="Redirect" id="wysiwyg-Redirect">{"pagetype":"Redirect","type":"' + menuname + '","content":' + jsondata + '}</noscript>';
        var textboxval = document.getElementById("demo-redirect");
        textboxval.style.display = "block";
        textboxval.value = fullgeneratedjson;
        textboxval.select();
      } else {
        document.getElementById("error-message-redirect").innerHTML = "Please include the https:// in both fields.";
        document.getElementById("error-message-redirect").style.display = "block";
      }
    }
    else {
      document.getElementById("error-message-redirect").innerHTML = "Please enter both from and to URL before generating code.";
      document.getElementById("error-message-redirect").style.display = "block";
    }

  }

  isError(event) {
    document.getElementById("demo-redirect").style.display = "none";
    document.getElementById("error-message-redirect").style.display = "none";
  }



  render() {
    return (
      <div className="ws-content redirect">
        <div className="container">
          <form className="form-horizontal" onSubmit={this.generateredirect}>
            <div className="form-group">
              <h3 className="text-center"> Page Redirect </h3>
              <div className="col-sm-12 margin-bottom">
                <label className="control-label col-sm-2" >From URL</label>
                <div className="col-sm-10 input-group">
                  <span className="input-group-addon">Starts with https://...</span><input type="text" onChange={this.isError} id="fromurl" className="form-control" />
                </div>
              </div>

              <div className="col-sm-12 margin-bottom">
                <label className="control-label col-sm-2" >Redirect to</label>
                <div className="col-sm-10 input-group">
                  <span className="input-group-addon">Starts with https://...</span><input type="text" onChange={this.isError} id="redirectto" className="form-control" />
                </div>
              </div>
              <div className="col-md-12 text-center margin-top">
                <div className="hidedefault" className="error-message" id="error-message-redirect"></div>
                <textarea className="hidedefault" readOnly id="demo-redirect" />
                <button type="submit" className="btn btn-primary btn-md margin-top">Generate Code</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
