import React from 'react';
import {  BrowserRouter as Router,Route,Link } from 'react-router-dom'
import DisplayUrlform from './displayurlform';
import Displayiframeform from './displayiframeform';
import GenerateJson from './generatejson';
import AddingWidget from './addingwidget';
import $ from 'jquery';


export default class Home extends React.Component {
  constructor() {
    super();
    this.getapidata = this.getapidata.bind(this);
    this.senddata = this.senddata.bind(this);
    this.changeWidth = this.changeWidth.bind(this);
    this.state = {
      'formdata': '',
      'selectValue':'iPhone6',
      'showpreview':false
    }
    var errormessage,dynamicwrapper;
  }

  senddata = (data) => {
      this.child.addnewwidget(data);
  }

  componentDidMount(){

    var heightfromtop = $(".framewrapper").offset().top;
    document.querySelector(".dynamic-wrapper").style.display = 'none';

    $.fn.followTo = function ( pos ) {
        var $this = this,
            $window = $(window);

        $window.scroll(function(e){
            if ($window.scrollTop() > pos) {
                $(".sidemenu").css({
                  position:'fixed',
                  top:0,
                  'z-index':'1',
                  right:'40px;'
                })
                $(".dropdown").css({
                  position:'fixed',
                  top:'40px'
                })
                $this.css({
                    position: 'fixed',
                    top: '100px'
                });
            } else {
              $(".sidemenu").css({
                position:'relative',
                top:0
              })
              $(".dropdown").css({
                position:'relative',
                top:0
              })
                $this.css({
                    position: 'relative',
                    top: 0
                });
            }
        });
    };

    $('#mobileframe').followTo(heightfromtop);
  }

  changeWidth = (e) =>{
    this.setState({
      selectValue:e.target.value
    })
  }

  getapidata(id,previewcontent)
  {
    document.getElementById("fetchdatabtn").innerText = 'Loading...';
    document.getElementById("fetchdatabtn").setAttribute("disabled","true");
    document.getElementById("error-message").style.display = 'none';
    document.getElementById("loadcontent").innerText = 'Loading ...';
    document.getElementById("loadcontent").setAttribute("disabled","true");
    var opts = {
      'id': id,
      'previewcontent': previewcontent
    };

    fetch('/scrape',{
      method: 'POST',
      body: JSON.stringify(opts),
      headers: {"Content-Type": "application/json"}
    }).then(results => {
        return results.json();
      }).then(data => {
        if(data.status == 400){
          document.getElementById("fetchdatabtn").innerText = 'Go';
          document.getElementById("error-message").style.display = 'block';
          document.getElementsByClassName("dynamic-wrapper")[0].style.display = 'none';
          document.getElementById("error-message").innerText = data.message;
          this.setState({
            showpreview:false
          })
          document.getElementById("fetchdatabtn").removeAttribute("disabled");
          document.getElementById("loadcontent").innerText = 'Preview Content';
          document.getElementById("loadcontent").removeAttribute("disabled");
        }else{
          document.getElementById("error-message").style.display = 'none';
          document.getElementsByClassName("dynamic-wrapper")[0].style.display = 'block';
          document.getElementById("mobileframe").setAttribute("src", "./temp/" + data[1].tempfilename + "");
          //this.child.cleardata();
          document.getElementById("loadcontent").innerText = 'Preview Content';
          document.getElementById("loadcontent").removeAttribute("disabled");
          this.child.getdata(data[0].MobileWidget);
          this.setState({
            showpreview:true
          })
          setTimeout(function() {
            var framebody = document.getElementById("mobileframe").contentWindow.document.body;
            document.getElementById("fetchdatabtn").innerText = 'Go';
            document.getElementById("fetchdatabtn").removeAttribute("disabled");
            framebody.querySelector("#mw-overlay").style.display = "block";
          }, 2000);
        }
      })
  }

  render() {
    return (
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <DisplayUrlform geturl={this.getapidata} showpreview={this.state.showpreview} />
          <div id="error-message"></div>
            <div className="dynamic-wrapper col-md-12">
              <AddingWidget sendwidget={this.senddata}/>
              <div className="col-md-12 dropdown margin-top">
                <label className="control-label">Preview on</label>
                <select defaultValue={this.state.selectValue} onChange={this.changeWidth} >
                  <option value="iPhone5">iPhone 5</option>
                  <option value="iPhone6">iPhone 6</option>
                  <option value="iPhone6Plus">iPhone 6 Plus</option>
                </select>
              </div>
              <div className={'col-lg-6 framewrapper '+ this.state.selectValue} >
                 <iframe src="" id="mobileframe"  className={'Iframe '+ this.state.selectValue}  sandbox="allow-same-origin allow-forms allow-pointer-lock allow-top-navigation-by-user-activation allow-scripts" height="1500px"></iframe>
              </div>
              <div className={'col-lg-6 col-md-6 col-sm-6 col-xs-12 widgetform'+ this.state.selectValue }>
                <form className="form-horizontal">
                  <div className="form-group displayform col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <Displayiframeform onRef={ref => this.child = ref} />
                    <GenerateJson />
                  </div>
                </form>
              </div>
          </div>
        </div>

    )
  }
}
