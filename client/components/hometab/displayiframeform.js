import React from 'react';
import $ from 'jquery';
import { render } from 'react-dom';
import { SortableContainer, SortableElement, arrayMove, SortableHandle } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <span className="glyphicon glyphicon-move my-handle"> </span>); // This can be any component you want

// display heading in form like H2
const Header = (value) => {
  return (<div className="headerouterdiv">
    {(value.wholenode.title) ? <div className="header"   > <h5>H2</h5> <input type="text" onFocus={value.wholeclass.addborder.bind(this, value.wholenode.dataid)} onBlur={(event) => { value.wholeclass.updateiframe("title", value.wholenode.type, value.sendindex, value.wholenode.dataid, event) }} onChange={value.wholeclass.addclasstowidget.bind(this, value.wholenode.dataid, value.sendindex, value.sendindex, "title")} value={value.wholenode.title} /> </div> : ''}
  </div>
  )
}


// display datawidget section.
const Displaywidgetsection = (value) => {
  var indexofwidget = value.indexofwidget;
  var nodedataid = value.nodedataid;
  var nodetype = value.nodetype;
  var rawdata = value.wholestate['data'];

  return (
    <div className={"sectionouterdiv"}>
      {rawdata.map((node, index) => {

        var keyindex = indexofwidget + '' + index;
        var nodewidgetclassdata = "normal";
        if (node.newrowadded == true) {
          nodewidgetclassdata = value.wholestate.widgetdataid
        }


        return (
          <div id={'widgetsec' + keyindex} className={"col-md-6 col-sm-6 col-xs-12 insidebox " + value.wholestate.customwidget + " " + nodewidgetclassdata} key={keyindex}>
            <span className="col-md-12 internalradiobutton">
              <span className="col-md-12 internalradiobuttonspan">
                <label> <input type="radio" value="Show" name={'internal' + keyindex} onChange={value.sendclasstosection.toggleinternalradiobutton.bind(this, nodedataid, index, indexofwidget)} checked={(node.show == true) ? true : false} /> Show </label>
                <label> <input type="radio" value="Hide" name={'internal' + keyindex} onChange={value.sendclasstosection.toggleinternalradiobutton.bind(this, nodedataid, index, indexofwidget)} checked={(node.show == true) ? false : true} /> Hide </label>
              </span>
              {/* {(node.removebutton == true) ?
                <button type="button" onClick={value.sendclasstosection.removerowtile.bind(this, index, nodedataid, indexofwidget)} className="close close-icon" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button> : null} */}
            </span>
            <label className="control-label">src </label> <input type="text" id="src" className="form-control" onFocus={value.sendclasstosection.addborder.bind(this, nodedataid)} onChange={value.sendclasstosection.addclasstowidget.bind(this, nodedataid, index, indexofwidget, "src")} onClick={value.sendclasstosection.hidetextarea()} onBlur={(event) => { value.sendclasstosection.updateiframe("src", nodetype, index, nodedataid, event) }} value={node.src} />
            <label className="control-label">url </label> <input type="text" id="url" className="form-control" onFocus={value.sendclasstosection.addborder.bind(this, nodedataid)} onChange={value.sendclasstosection.addclasstowidget.bind(this, nodedataid, index, indexofwidget, "url")} onClick={value.sendclasstosection.hidetextarea()} onBlur={(event) => { value.sendclasstosection.updateiframe("url", nodetype, index, nodedataid, event) }} value={node.url} />
            {(!node.textrow1) ?
              <span>
                <label className="control-label">text </label> <input type="text" id="text" className="form-control" onFocus={value.sendclasstosection.addborder.bind(this, nodedataid)} onChange={value.sendclasstosection.addclasstowidget.bind(this, nodedataid, index, indexofwidget, "text")} onClick={value.sendclasstosection.hidetextarea()} onBlur={(event) => { value.sendclasstosection.updateiframe("text", nodetype, index, nodedataid, event) }} value={node.text} />
              </span> :
              <span>
                <label className="control-label">text row1 </label> <input type="text" id="text1" className="form-control" onFocus={value.sendclasstosection.addborder.bind(this, nodedataid)} onChange={value.sendclasstosection.addclasstowidget.bind(this, nodedataid, index, indexofwidget, "textrow1")} onClick={value.sendclasstosection.hidetextarea()} onBlur={(event) => { value.sendclasstosection.updateiframe("textrow1", nodetype, index, nodedataid, event) }} value={node.textrow1} />
                <label className="control-label">text row2 </label> <input type="text" id="text2" className="form-control" onFocus={value.sendclasstosection.addborder.bind(this, nodedataid)} onChange={value.sendclasstosection.addclasstowidget.bind(this, nodedataid, index, indexofwidget, "textrow2")} onClick={value.sendclasstosection.hidetextarea()} onBlur={(event) => { value.sendclasstosection.updateiframe("textrow2", nodetype, index, nodedataid, event) }} value={node.textrow2} />
              </span>
            }

            <label className="control-label">GA Code </label> <input type="text" className="form-control" onFocus={value.sendclasstosection.addborder.bind(this, nodedataid)} onChange={value.sendclasstosection.addclasstowidget.bind(this, nodedataid, index, indexofwidget, "anchorGACode")} onClick={value.sendclasstosection.hidetextarea()} id="gacode" value={(node.anchorGACode == undefined) ? "" : node.anchorGACode} />

          </div>
        )
      })}
    </div>
  )
}



const RenderWidget = SortableElement((value) => {

  var prefixofclass = value.sendclass.sendwholeclass;
  var node = value.value;
  var index = value.sendindex;
  var indexparam = index + 1;
  var newcustomwidget;
  let rawdataarray = node['data'];
  var brokerdiv = '';
  var beforebrokendiv = '';
  if (rawdataarray.length < 1) {
    brokerdiv = 'brokendiv';
  }
  if(node['beforebrokendiv']){
    beforebrokendiv = 'beforebrokendiv'
  }
  if (node.customwidget == 'customwidget') {
    newcustomwidget = 'customwidget'
  }

  return (
    <div className={(node.widgetupdated == true) ? 'widget-block widgetupdated  ' + brokerdiv + ' '+beforebrokendiv +' ' : 'widget-block ' + brokerdiv + ''} key={indexparam} id={node.widgetdataid} data-customwidget={newcustomwidget} data-widget={node.type} order={node.dataorder} data-id={index} data-identifier={node.dataid}  >
      <h2>
        <span>  Widget #{indexparam} - Type: {node['type']} </span>
        <span className="globalradiobutton">
          <label> <input type="radio" name={"global" + node.dataid} value="Show1" onChange={prefixofclass.toggleglobalradio.bind(this, node.dataid, index)} checked={(node.globalwidgetshow == true) ? true : false} /> Show </label>
          <label> <input type="radio" name={"global" + node.dataid} value="Hide1" onChange={prefixofclass.toggleglobalradio.bind(this, node.dataid, index)} checked={(node.globalwidgetshow == true) ? false : true} /> Hide </label>
        </span>
        <DragHandle />
      </h2>
      <div className={"box col-md-12 col-sm-12 col-xs-12 box" + node.customwidget} data-widget={node.type}>

        {(node.addremovebutton == true) ? <span className="entire-widget-remove-button">
          <button type="button" onClick={prefixofclass.removewholewidget.bind(this, index, node.dataid)} className="close close-icon" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </span> : ""}

        <span className="gacode">
          <label className="control-label gacode"> Widget GA Code </label>
          <input type="text" className="control-label gacode" id="widgetgacode" onChange={prefixofclass.addclasstowidget.bind(this, node.dataid, index, index, "widgetgacode")} onFocus={prefixofclass.addborder.bind(this, node.dataid)} value={(node.widgetgacode == undefined) ? "" : node.widgetgacode} onBlur={prefixofclass.removeborder(node.dataid)} />
        </span>
        <Header wholenode={node} wholeclass={prefixofclass} sendindex={indexparam} />
        <Displaywidgetsection nodetype={node.type} wholestate={node} indexofwidget={indexparam} nodedataid={node.dataid} sendclasstosection={prefixofclass} />


        {(node.addnewrowbutton == true) ?
          <span className="addingnewlabel btn btn-info new-widgetbtn" onClick={prefixofclass.addnewrow.bind(this, node.dataid, index, node.widgetdataid)} >  Add new row </span> : false
        }

      </div>
    </div>

  )
})

const Renderform = SortableContainer((sendwholeclass) => {
  var widarray = sendwholeclass.sendwholeclass.state.datawidgetarr;

  if (widarray.length > 0) {
    return (
      <div id="Fullform" >
        {widarray.map((value, index) => {
          var getindex = index;
          return <RenderWidget value={value} sendindex={getindex} sendclass={sendwholeclass} key={`item-${index}`} index={index} />
        })}

      </div>)
  }
  else {
    return (
      <div id="Fullform">

      </div>
    )
  }
})

var placeholder = document.createElement("div");
placeholder.className = "placeholder";

export default class Displayiframeform extends React.Component {
  constructor() {
    super();
    this.state = {
      widgethide: false,
      datawidgetarr: [],
      dataindex: 0,
      copydatawidgetarr: [],
      saveprevURL: []
    }

    this.removeborder = this.removeborder.bind(this);
    this.getdata = this.getdata.bind(this);
    this.addnewwidget = this.addnewwidget.bind(this);
    this.cleardata = this.cleardata.bind(this);
    this.checkwidgetlength = this.checkwidgetlength.bind(this);
    this.updateiframe = this.updateiframe.bind(this);
    this.addborder = this.addborder.bind(this);
    this.getDraggedId = this.getDraggedId.bind(this);
    this.toggleglobalradio = this.toggleglobalradio.bind(this);
    this.addclasstowidget = this.addclasstowidget.bind(this);
    this.addnewrow = this.addnewrow.bind(this);
    this.removewholewidget = this.removewholewidget.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  //toggle of radio button inside widgets
  toggleinternalradiobutton = (widgetid, txtindex, indexparam, event) => {
    indexparam = indexparam - 1;
    var framebody = document.getElementById("mobileframe").contentWindow.document.body;
    var widgetarr = $(framebody).find("[data-id=" + widgetid + "]");
    widgetarr = $(widgetarr).find('a:has(img)');
    var fullarray = this.state.datawidgetarr;
    $(widgetarr).map((index, value) => {
      if (txtindex == index) {
        if (event.target.value == "Show") {
          $(value).removeClass("mw-hide");
          fullarray[indexparam]['widgetupdated'] = true
          fullarray[indexparam].data[txtindex].show = true;
        }
        else {
          $(value).addClass("mw-hide");
          fullarray[indexparam]['widgetupdated'] = true
          fullarray[indexparam].data[txtindex].show = false;
        }
      }
    })

    this.setState({
      datawidgetarr: fullarray
    })
    document.getElementById("demo").style.display = "none";

  }

  hidetextarea = () => {
    document.getElementById("demo").style.display = "none";
  }

  removerowtile = (indexanchor, dataidentifier, indexparam) => {
    //2 "tile33" 1
    var framebody = document.getElementById("mobileframe").contentWindow.document.body;
    var datawidgetname = $(framebody).find("[data-id=" + dataidentifier + "]");
    $(datawidgetname).find("a:has(img)").each((index, value) => {
      if (index == indexanchor) {
        $(value).remove();
      }
    })

    var fullarray = this.state.datawidgetarr;
    indexparam = indexparam - 1;
    fullarray[indexparam].data.splice([indexanchor], 1);
    this.setState({
      datawidgetarr: fullarray
    })

  }

  removewholewidget = (index, widgetname) => {
    var framebody = document.getElementById("mobileframe").contentWindow.document.body;
    var framewidget = $(framebody).find("[data-id=" + widgetname + "]");
    $(framewidget).remove();
    var fullarray = this.state.datawidgetarr;
    fullarray.splice([index], 1);
    this.setState({
      datawidgetarr: fullarray
    })
  }

  elementupdate = (name, widgettype, txtindex, dataidentifier, e) => {
    var framebody = document.getElementById("mobileframe").contentWindow.document.body;
    var arrwidget = $(framebody).find("[data-id=" + dataidentifier + "]");
    $(arrwidget).removeClass("mw-wysiwyg-selected-border");
    if (name == 'title') {
      arrwidget = $(arrwidget).find("h2");
      $(arrwidget).text(e.target.value);
    }
    else {
      var anchorarr = $(arrwidget).find('a:has(img)');
      anchorarr.each((ind, value) => {
        if (txtindex == ind) {
          if (name == 'src') {
            value.querySelector("img:first-child").setAttribute("src", e.target.value);
          }
          else if (name == 'url') {
            value.setAttribute("href", e.target.value);
          }
          else if (name == 'text') {
            var imganc = value.querySelectorAll('img');
            var check = value.querySelector("div.snipe-text");
            var anchortext = value.text;
            anchortext = anchortext.trim();
            if (check) {
              if (e.target.value != "") {
                check.innerHTML = e.target.value;
              }
              else {
                $(value).find(".snipe-holder").remove();
              }
            }
            else if (!anchortext && check == null) {
              if (e.target.value != "") {
                value.innerHTML = "<div class='snipe-holder'><div class='snipe-text'>" + e.target.value + "</div></div>";
                $(value).prepend(imganc);
                value.removeAttribute("style");
                value.style.position = "relative";
              }
            }
            else {
              value.removeAttribute("style");
              value.innerHTML = e.target.value;
              $(value).prepend(imganc);
            }
          }
          else if (name == 'textrow1') {
            var rowtext1 = value.querySelector("span.row1");
            rowtext1.innerHTML = e.target.value;
          }
          else if (name == 'textrow2') {
            var rowtext2 = value.querySelector("span.row2");
            rowtext2.innerHTML = e.target.value;
          }
          return false
        }
      })
    }
  }


  // Update Iframe
  updateiframe(name, widgettype, txtindex, dataidentifier, e) {
    this.elementupdate(name, widgettype, txtindex, dataidentifier, e);
  }


  addclasstowidget = (widgetid, index, indexparam, name, event) => {
    var arrayindexofstate = indexparam - 1;
    var arrayindexofstatedata = index;
    var nameofvariable = name;
    var fullarray = this.state.datawidgetarr;
    if (name == 'title') {
      fullarray[arrayindexofstate][nameofvariable] = event.target.value;
      fullarray[arrayindexofstate]['widgetupdated'] = true
    }
    else if (name == 'widgetgacode') {
      fullarray[indexparam][nameofvariable] = event.target.value;
      fullarray[indexparam]['widgetupdated'] = true
    }
    else {
      fullarray[arrayindexofstate].data[arrayindexofstatedata][nameofvariable] = event.target.value;
      fullarray[arrayindexofstate]['widgetupdated'] = true
    }

    this.setState({
      datawidgetarr: fullarray
    });

  }

  checkwidgetlength = () => {
    let widgetblock = document.querySelectorAll(".widget-block");
    widgetblock.forEach((value, index) => {
      let anchorbox = value.querySelectorAll(".insidebox");
      if (anchorbox.length == 1) {
        var hiding = value.querySelector(".internalradiobutton .internalradiobuttonspan");
        if (hiding) {
          hiding.style.display = "none";
        }
      }
      else if (anchorbox.length > 1) {
        var hiding = value.querySelector(".internalradiobutton .internalradiobuttonspan");
        if (hiding) {
          hiding.style.display = "block";
        }
      }
    })
  }

  addnewrow = (dataidentifier, indexparam, nameofwidget) => {
    var fullstatearray = this.state.datawidgetarr;
    indexparam = indexparam;
    var widgethtml,titlehtmlstructure;
    var framebody = document.getElementById("mobileframe").contentWindow.document.body;
    switch (nameofwidget) {
      case 'shopbycategory':
        for (var r = 0; r < 2; r++) {
          fullstatearray[indexparam].data.push({
            'src': '',
            'url': '',
            'text': 'lorem ipsum',
            'show': true,
            'removebutton': true
          })
        }
        titlehtmlstructure = ` <div  class="row split new-widgetclass">
        <div class="align-center"> <a> <img src='' />lorem ipsum</a>  </div>
        <div class="align-center"> <a> <img src='' />lorem ipsum</a>  </div>
        </div>`;
        break;


      case 'bestsellers':
        for (var r = 0; r < 2; r++) {
          fullstatearray[indexparam].data.push({
            'src': '',
            'url': '',
            'text': 'lorem ipsum',
            'show': true,
            'removebutton': true
          })
        }
        titlehtmlstructure = ` <div  class="row split new-widgetclass"  >
        <div class="align-center">  <a> <img src='' />lorem ipsum</a>  </div>
        <div class="align-center"> <a> <img src='' />lorem ipsum</a>  </div>
        </div>`;
        break;
    }
    var rowvalue = $(framebody).find("[data-id=" + dataidentifier + "] .new-widgetclass").last();
    $(titlehtmlstructure).insertAfter(rowvalue);
    this.setState({
      datawidgetarr: fullstatearray
    })
  }

  addborder = (widgetid) => {
    var framebody = document.getElementById("mobileframe").contentWindow.document.body;
    var arrwidget = $(framebody).find("div[data-id=" + widgetid + "]");
    $(arrwidget).addClass("mw-wysiwyg-selected-border");
  }

  removeborder = (widgetid) => {
    var framebody = document.getElementById("mobileframe").contentWindow.document.body;
    var arrwidget = $(framebody).find("div[data-id=" + widgetid + "]");
    $(arrwidget).removeClass("mw-wysiwyg-selected-border");
  }

  //updating widget

  addnewwidget(data) {
    var alldata = [];
    alldata = this.state.datawidgetarr;
    alldata.unshift(data);
    alldata[0].widgetupdated = true;
    this.setState({
      datawidgetarr: []
    }, function() {
      this.setState({
        datawidgetarr: alldata
      })
    })
  }

  // get data from API and save in array and toggle the widget type.
  getdata(data) {
    this.setState({
      datawidgetarr: data
    })
  }

  cleardata() {
    this.setState({
      datawidgetarr: []
    })
  }


  //global radio button

  toggleglobalradio(widgetid, index, event) {
    var framebody = document.getElementById("mobileframe").contentWindow.document.body;
    var widgetarr = $(framebody).find("[data-id=" + widgetid + "]");
    document.getElementById("demo").style.display = "none";
    var fullarray = [];
    fullarray = this.state.datawidgetarr;
    if (event.target.value == 'Show1') {

      $(widgetarr).removeClass("mw-hide");
      fullarray[index]['widgetupdated'] = true;
      fullarray[index].globalwidgetshow = true;
    }
    else {
      $(widgetarr).addClass("mw-hide");
      fullarray[index]['widgetupdated'] = true;
      fullarray[index].globalwidgetshow = false;
    }

    this.setState({
      datawidgetarr: fullarray
    })
  }

  //updating iframe after swapping function
  getDraggedId = (dragid, newIndex) => {
    var id = $(dragid).attr("data-identifier");
    var alldata = this.state.datawidgetarr;
    alldata[newIndex].widgetupdated = true;
    var framebody = document.getElementById("mobileframe").contentWindow.document.body;
    var nextid = $(dragid).next();
    if (nextid.length) {
      if (nextid.hasClass("brokendiv")) {
        nextid = $(dragid).prev();
        nextid = $(nextid).attr("data-identifier");
        dragid = $(framebody).find("div[data-id=" + id + "]");
        nextid = $(framebody).find("div[data-id=" + nextid + "]");
        $(dragid).insertAfter(nextid);
        alldata[newIndex].beforebrokendiv = true;
          this.setState({
            datawidgetarr: alldata
          })

      }
      else {
        nextid = $(nextid).attr("data-identifier");
        dragid = $(framebody).find("div[data-id=" + id + "]");
        nextid = $(framebody).find("div[data-id=" + nextid + "]");
        $(dragid).insertBefore(nextid);
        alldata[newIndex].beforebrokendiv = false;
          this.setState({
            datawidgetarr: alldata
          })
      }
    }
    else {
      var previd = dragid.prev();
      previd = $(previd).attr("data-identifier");
      dragid = $(framebody).find("div[data-id=" + id + "]");
      previd = $(framebody).find("div[data-id=" + previd + "]");
      $(dragid).insertAfter(previd);
      alldata[newIndex].beforebrokendiv = false;
       this.setState({
         datawidgetarr: alldata
      })
    }
    document.getElementById("demo").style.display = "none";
  }

  //  this functions are for drop and drop
  componentDidUpdate() {
    $(window).on('scroll', function() {
      var currentwidget;
      var ScrollTop = $(this).scrollTop();
      $('.widget-block h2').each(function(index) {
        var topDistance = $(this).offset().top;
        if ((topDistance) < ScrollTop) {
          currentwidget = $(this).parent(".widget-block").attr('data-identifier');
        }
      });
      if (currentwidget) {
        var framebody = document.getElementById("mobileframe").contentWindow.document.body;
        var framewidget = $(framebody).find("[data-id=" + currentwidget + "]");
        var distancefromtop = $(framewidget).offset().top;
        var myIframe = document.getElementById('mobileframe');
        $(myIframe).contents().children().animate({ scrollTop: distancefromtop }, 0);
      }
    });
    this.checkwidgetlength();
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      datawidgetarr: arrayMove(this.state.datawidgetarr, oldIndex, newIndex),
    }, () => {
      var widgetdata = this.state.datawidgetarr[newIndex].dataid;
      var draggedid = $(document).find("div[data-identifier=" + widgetdata + "]");
      this.getDraggedId(draggedid, newIndex);
    });
  };

  render() {
    return (
      <Renderform sendwholeclass={this} useDragHandle={true} onSortEnd={this.onSortEnd} />
    )
  }
}
