import React from 'react';
import $ from 'jquery';

export default class DisplayUrlform extends React.Component {
  constructor() {
    super();
    this.fetchapidata = this.fetchapidata.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.state = {
      url: '',
      previewcontent:false
    }
  }

  // Enable Go button
  enableButton(event) {
    this.setState({
      url: event.target.value
    })
  }

  // Fetch API data
  fetchapidata(event) {
    event.preventDefault();
    this.props.geturl(this.state.url);
  }

  enablepreview = ()  => {
  $("#demo").css("display","none");
   if(this.state.previewcontent) {
     this.setState({
       previewcontent:false
     })
   }
   else {
    this.setState({
      previewcontent:true
    })
   }
  }

  loadPreviewContent = () => {
    var testingcontent = document.getElementById("jsoncontent").value;
    this.props.geturl(this.state.url,testingcontent);
  }

  render() {
    return (
      <div className="ws-content">
        <div className="container">
          <form className="form-horizontal" onSubmit={this.fetchapidata}>
            <div className="form-group">
              <label htmlFor="url" className="control-label col-sm-3">Enter the URL</label>
              <div className="col-sm-6 input-group">
                <span className="input-group-addon">Starts with https://...</span>
                <input type="text" className="form-control widgeturl" id="urls" value={this.state.url}
                  onChange={this.enableButton} />
                <div className="col-sm-2">
                  <button id="fetchdatabtn" disabled={this.state.url.length ? false : true} type="submit" className="btn btn-primary btn-md">Go</button>
                </div>
              </div>
            </div>
            <label className={ (this.props.showpreview) ?  'col-sm-5 col-sm-offset-3 paddingzero' : 'hidedefault hide' } >  <input type="checkbox" onChange={this.enablepreview} /> Preview content (The content changes will only be displayed in the frame on the left side) </label>
            <div  className={(this.state.previewcontent) ? "form-group showit" : "hidedefault"}>
              <div className="col-sm-6 col-sm-offset-3 paddingzero">
                <textarea type="text" className="form-control widgetJSON" id="jsoncontent" />
              </div>
              <div className="col-sm-2" >
                <button id='loadcontent' className="btn btn-primary btn-md" onClick={this.loadPreviewContent} type="button"> Preview Content </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
