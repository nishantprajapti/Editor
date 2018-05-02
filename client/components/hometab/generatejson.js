import React from 'react';
import $ from 'jquery'

export default class GenerateJson extends React.Component {


    constructor() {
        super();
        this.generatejson = this.Generatejson.bind(this);
        this.state = {
            url: '',
            pagename: '',
            widget: []
        }
    }

    //  This function is their to generate code for block

    Generatejson = (event) => {
        event.preventDefault();
        var geturl = document.getElementById("urls").value;
        var widget = []
        var framebody = document.getElementById("mobileframe").contentWindow.document.body;
        var pagename = $(framebody).find("#override-pagetype").attr("data-pagetype");
        if(!pagename){
            pagename = $(framebody).find("#pagetype").attr("data-pagetype");
            if(pagename == 'TopCategory'){
                pagename = 'Home'
            }
        }
        // if (pagename == 'TopCategory') {
        //     pagename = 'home';
        // }
        // event.preventDefault();
        var neworder, formjson = [], data = [], widgetvisibility;

        var widgetarr = document.querySelectorAll(".widget-block");
        widgetarr.forEach(function (value, index) {
            if ($(value).hasClass("widgetupdated")) {
                let header;
                if($(value).find(".header").length){
                    header =  value.querySelector(".header input").value;
                }
                let beforebrokendiv = '';
                if($(value).hasClass("beforebrokendiv")){
                  beforebrokendiv = true;
                }
                neworder = index + 1;
                var widgetidentifier = value.getAttribute("data-identifier");
                var widgetgacode = value.querySelector("input#widgetgacode").value;
                widgetvisibility = value.querySelector("h2 input[value='Show1']").checked;;
                var title = value.querySelector("div").getAttribute("data-widget");
                var oldorder = value.getAttribute("order");
                oldorder = parseFloat(oldorder)
                var iswidgetupdated = $(value).hasClass("widgetupdated");
                var box = value.querySelectorAll('.insidebox');
                var widgetdata = [];
                box.forEach(function (value, index) {
                    var temp = {};
                    let src = value.querySelector("input#src").value;
                    let url = value.querySelector("input#url").value;
                    let anchorgacode = value.querySelector("input#gacode").value;
                    temp['src'] = src;
                    temp['url'] = url;
                    temp['GAcode'] = anchorgacode;
                    var text;
                    if (value.querySelector("#text")) {
                        text = value.querySelector("input#text").value;
                        temp['text'] = text;
                    }
                    let anchorvisibility = value.querySelector('input[value="Show"]').checked;
                    temp['visible'] = anchorvisibility
                    if (value.querySelector("#text2")) {
                        temp['text2'] = value.querySelector("input#text2").value;
                    }
                    if (value.querySelector("#text1")) {
                        temp['text1'] = value.querySelector("input#text1").value;
                    }
                    widgetdata.push(temp);
                })
                widget.push({
                    'title': title,
                    'header':header,
                    'widgetupdate': iswidgetupdated,
                    'widget-identifier': widgetidentifier,
                    'old-order': oldorder,
                    'new-order': neworder,
                    'beforebrokendiv':beforebrokendiv,
                    'widgetGAcode': widgetgacode,
                    'widgetvisibility': widgetvisibility,
                    'data': widgetdata
                })
            }
        });

        this.setState({
            'url': geturl,
            'pagename': pagename,
            widget
        }, function () {
            var jsondata = JSON.stringify(this.state);
            var framebody = document.getElementById("mobileframe").contentWindow.document.body;
            var mwbrandid = $(framebody).attr("mw-brand-id");
            var mwsiteid = $(framebody).attr("mw-site-id");
            var fullgeneratedjson = '<noscript mw-site-id="' + mwsiteid + '" mw-brand-id="' + mwbrandid + '"  pagetype="' + this.state.pagename + '" id="wysiwyg-'+this.state.pagename+'">{ "pagetype":"' + this.state.pagename + '","type":"widget","content":' + jsondata + ' }</noscript>';
            var textboxval = document.getElementById("demo");
            textboxval.style.display = "block";
            textboxval.value = fullgeneratedjson;
            textboxval.select();
        })
    }

    render() {
        return (
            <div className="generatecode margin-bottom-double">
                <textarea id="demo" readOnly />
                <button className="btn btn-primary btn-ls js-convert-trigger btn-block" onClick={this.generatejson} >Generate Code </button>
            </div>
        )
    }

}

