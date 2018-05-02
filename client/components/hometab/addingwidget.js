import React from 'react';
import Displayiframeform from './displayiframeform';
import $ from 'jquery';

export default class AddingWidget extends React.Component {

    constructor() {
        super();
        this.slidemenu = this.slidemenu.bind(this);
        this.state = {
            'slideclass': 'slideleft',
            'slidebuttontext': 'Adding New Widgets (Slide Out)',
            'newwidgetdata': [{
                'type': '',
                'espotinternalid': '',
                'globalwidgetshow': true,
                'title': '',
                'data': [
                    {
                        'src': "",
                        'url': "",
                        'text': "",
                        'show': true
                    }
                ]
            }]
        }

    }

    slidemenu = () => {

        if (this.state.slideclass != 'slideleft') {
            this.setState({
                slideclass: 'slideleft',
                slidebuttontext: 'Adding New Widgets (Slide Out)'
            })
        }
        else {
            this.setState({
                slideclass: 'slideright',
                slidebuttontext: 'Adding New Widgets (Slide In)'
            })
        }

    }

    addingwidget = (event) => {
        var $targetdiv = $(event.target).closest("div");
        var widgetname = $targetdiv.attr("data-widgetname");
        var widgetid = $targetdiv.attr("data-id");
        var arrayforwidget = [];
        var findlengthofwidget = document.querySelectorAll(".widget-block");

        findlengthofwidget.forEach(function (element) {
            element = $(element).attr("data-widget");
            arrayforwidget.push(element);
        }, this);

        function countInArray(array, what) {
            return array.filter(item => item == what).length;
        }
        console.log(arrayforwidget,widgetname);
        var countlengthofwidget = countInArray(arrayforwidget, widgetname);
        countlengthofwidget = countlengthofwidget + 1;
        var widgethtml;
        var framebody = document.getElementById("mobileframe").contentWindow.document.body;

        var data = [], tilehtml = []; var temp;
        switch (widgetid) {
            case 'tile3':
                for (var t = 0; t < 3; t++) {
                    data.push({
                        'src': '',
                        'url': '',
                        'text': '',
                        'removebutton': true,
                        'show': true,
                    });
                }

                var titlehtmlstructure = `<div  class="row split new-widgetclass" >
            <div> <a> <img src='' />   </a>   </div>
            <div> <a> <img src='' />   </a> </div>
            <div> <a> <img src='' />   </a> </div> </div>`;
                break;

            case 'tile2':
                for (var s = 0; s < 2; s++) {
                    data.push({
                        'src': '',
                        'url': '',
                        'removebutton': true,
                        'text': '',
                        'show': true
                    })
                }
                var titlehtmlstructure = ` <div  class="row split new-widgetclass">
                <div> <a> <img src='' />   </a> </div>
                <div> <a> <img src='' />   </a> </div>
                </div>`;
                break;

            case 'tile3price':

                for (var r = 0; r < 3; r++) {
                    data.push({
                        'src': '',
                        'url': '',
                        'removebutton': true,
                        'textrow1': ' ',
                        'textrow2': ' ',
                        'show': true
                    })
                }
                var titlehtmlstructure = `
                    <div  class="row split new-widgetclass">
                    <div>
                     <a>
                        <img />
                                <div class="_snipe-price">
                                    <div class="_snipe-bg align-center">
                                        <div>
                                            <span class="row1"> </span>
                                            <span class="row2 bold"> </span>
                                        </div>
                                    </div>
                                </div>

                      </a>
                     </div>
                     <div>
                      <a>
                         <img />
                              <div class="_snipe-price">
                                  <div class="_snipe-bg align-center">
                                      <div>
                                          <span class="row1"></span>
                                          <span class="row2 bold"> </span>
                                      </div>
                                  </div>
                              </div>

                      </a>
                     </div>

                     <div>
                      <a>
                          <img />
                              <div class="_snipe-price">
                                  <div class="_snipe-bg align-center">
                                      <div>
                                          <span class="row1"> </span>
                                          <span class="row2 bold"> </span>
                                      </div>
                                  </div>
                              </div>

                      </a>
                     </div>
                    </div>`;

                break;


            case 'shopbycategory':
                for (var r = 0; r < 2; r++) {
                    data.push({
                        'src': '',
                        'url': '',
                        'text': 'lorem ipsum',
                        'show': true
                    })
                }
                temp = 'Shop by Category'
                var titlehtmlstructure = ` <h2 class="row"> Shop by Category </h2> <div  class="row split new-widgetclass"  >

            <div class="align-center">  <a> <img src='' />lorem ipsum</a>  </div>
            <div class="align-center"> <a> <img src='' />lorem ipsum</a>  </div>
            </div>`;
                break;

            case 'bestsellers':
                for (var r = 0; r < 2; r++) {
                    data.push({
                        'src': '',
                        'url': '',
                        'removebutton': true,
                        'text': 'lorem ipsum',
                        'show': true
                    })
                }
                temp = 'Best Sellers'
                var titlehtmlstructure = ` <h2 class="row"> Best Sellers </h2> <div  class="row split new-widgetclass"  >

            <div class="align-center">  <a> <img src='' />lorem ipsum</a>  </div>
            <div class="align-center"> <a> <img src='' />lorem ipsum</a>  </div>
            </div>`;
                break;

            case 'subfeaturex2':
                for (var r = 0; r < 2; r++) {
                    data.push({
                        'src': '',
                        'url': '',
                        'removebutton': true,
                        'text': '',
                        'show': true
                    })
                }

                var titlehtmlstructure = ` <div  class="row split new-widgetclass"  >   <div>  <a> <img src='' />   </a>  </div>
            <div> <a> <img src='' />   </a>  </div>
            </div>`;
                break;

            case 'featurebanner2tile':
                for (var r = 0; r < 2; r++) {
                    data.push({
                        'src': '',
                        'url': '',
                        'removebutton': true,
                        'text': '',
                        'show': true
                    })
                }

                var titlehtmlstructure = ` <div  class="row split new-widgetclass"  >   <div>  <a> <img src='' />   </a>  </div>
            <div> <a> <img src='' />   </a>  </div>
            </div>`;
                break;


            default:
                for (let r = 0; r < 1; r++) {
                    data.push({
                        'src': '',
                        'url': '',
                        'removebutton': true,
                        'text': '',
                        'show': true
                    })
                }
                var titlehtmlstructure = ` <div  class="split new-widgetclass">
            <div> <a> <img src='' /> </a> </div>
            </div>`;
                break;
        }
        var pricediv = " ";
        if (widgetid == 'tile3price') {
            pricediv = "prices"
        }
        var widgethtml = "<div data-widget=" + widgetname + " data-id='" + widgetid + countlengthofwidget + "' class='container " + pricediv + "' > " + titlehtmlstructure + " </div>"
        var firstdiv = $(framebody).find("main [data-widget]").first();
        var $goldbanner = $(framebody).find(".mw-gold-banner").last();
        let $breadcrumwrapper = $(framebody).find("main #breadcrumb-wrap");
        if(firstdiv.length) {
          $(widgethtml).insertBefore(firstdiv);
        }
        else if  ($breadcrumwrapper.length) {
          $(widgethtml).insertAfter($breadcrumwrapper)
        }
        else if ($goldbanner.length) {
          $(widgethtml).insertAfter($goldbanner);
        }
        else {
          $(framebody).find("main").prepend(widgethtml);
        }

        var addnewrowbuttonflag = false;
        if( widgetid == "shopbycategory" || widgetid == "bestsellers")
        {
            addnewrowbuttonflag = true;
        }

        this.state.newwidgetdata[0] = {
            'type': widgetname,
            'globalwidgetshow': true,
            'widgetdataid': widgetid,
            'title': temp,
            'dataorder': -1,
            'dataid': widgetid + countlengthofwidget,
            'customwidget': 'customwidget',
            'widgetupdated': true,
            'addnewrowbutton': addnewrowbuttonflag,
            'addremovebutton': true,
            'data': data
        }

        this.props.sendwidget(this.state.newwidgetdata[0]);
        data = [];
        findlengthofwidget = [];
        arrayforwidget = [];
        document.getElementById("demo").style.display = "none";
        this.slidemenu();
    }

    render() {
        return (
            <div className="sidemenu">
                <button className="btn btn-info new-widgetbtn" onClick={this.slidemenu.bind(this)} > {this.state.slidebuttontext} </button>
                <div className={"leftslider " + this.state.slideclass}>
                    <div onClick={this.addingwidget.bind(this)} data-widgetname="Feature" data-id="featurebanner"> <span className="rectangle"></span>   <span className="data-widgets sliders" >   Feature    </span> </div>
                    <div onClick={this.addingwidget.bind(this)} data-widgetname="Feature" data-id="featurebanner2tile" > <span className="data-widgets tileouter" > <span className="tile">  </span> <span className="tile">  </span>  </span>  <span className="data-widgets sliders" > Feature with 2 tile  </span> </div>
                    <div onClick={this.addingwidget.bind(this)} data-widgetname="3Tile" data-id="tile3" >  <span className="data-widgets tileouter" > <span className="tile">  </span> <span className="tile">  </span> <span className="tile">  </span> </span> <span className="data-widgets sliders" > 3 Tile  </span> </div>
                    <div onClick={this.addingwidget.bind(this)} data-widgetname="3Tile" data-id="tile3price" > <span className="data-widgets tileouter" > <span className="tile price"> <span> $ </span>  </span> <span className="tile price"> <span> $ </span>  </span> <span className="tile price"> <span> $ </span> </span> </span> <span className="data-widgets sliders"> 3 Tile  Price </span> </div>
                    <div onClick={this.addingwidget.bind(this)} data-widgetname="2Tile" data-id="tile2" >  <span className="data-widgets tileouter" > <span className="tile">  </span> <span className="tile">  </span>  </span>         <span className="data-widgets sliders" > 2Tile  </span> </div>
                    <div onClick={this.addingwidget.bind(this)} data-widgetname="Shop By Category" data-id="shopbycategory" > <span className="tile shopbycategory">  </span> <span className="tile shopbycategory">  </span>  <span className="data-widgets sliders"> Shop by Category   </span> </div>
                    <div onClick={this.addingwidget.bind(this)} data-widgetname="SubFeaturex2" data-id="subfeaturex2" >   <span className="data-widgets tileouter x2" > <span className="tile">  </span> <span className="tile">  </span>  </span>     <span className="data-widgets sliders" > SubFeaturex2  </span> </div>
                    <div onClick={this.addingwidget.bind(this)} data-widgetname="Best Sellers" data-id="bestsellers" > <span className="tile shopbycategory">  </span> <span className="tile shopbycategory">  </span>  <span className="data-widgets sliders"> Best Sellers   </span> </div>
                </div>
            </div>
        )
    }

}
