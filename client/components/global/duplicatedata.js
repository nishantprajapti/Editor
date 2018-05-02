import React from 'react';
import $ from 'jquery';
import ReactColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';


export default class DuplicateData extends React.Component {
    constructor() {
        super();
        this.getbannerdata = this.getbannerdata.bind(this);
        this.createClone = this.createClone.bind(this);
        this.changetext = this.changetext.bind(this);
        this.onDragbackcolor = this.onDragbackcolor.bind(this);
        this.onDragtextcolor = this.onDragtextcolor.bind(this);


        this.state = {
            'visibility': 'hidden',
            'bannerdata': [{
                'bannertext': 'UP TO 50% OFF',
                'bannerbackcolor': '#a94',
                'pagetypeofbanner': 'home',
                'usertype': 'guest',
                'redirecturl': '',
                'bannertextcolor': '#fff'
            }]
        }
    }

    changetext(id, event) {
        event.preventDefault();
        this.state.bannerdata[id].bannertext = event.target.value;
        this.setState({
            madechange: true
        })
    }


    changeurltext(id, event) {
        event.preventDefault();
        this.state.bannerdata[id].redirecturl = event.target.value;
        this.setState({
            madechange: true
        })
    }

    removedummydata() {
        this.state.bannerdata = []
    }


    componentDidMount() {
        this.props.onRef(this);
        $(document).on('click', function (e) {
            if ($(e.target).closest(".colorpickers").length == 0 && $(e.target).closest(".back-color").length == 0) {
                $(".colorpickers").removeClass("showit");
            }
            if ($(e.target).closest(".text-color").length == 0 && $(e.target).closest(".textcolorpickers").length == 0) {
                $(".textcolorpickers").removeClass("showit");
            }
        });
    }

    isError() {
        document.getElementById("demo-global").style.display = "none";
    }

    onDragbackcolor(id, color, c) {
        color = color.color;
        var index = id.slice(-1);
        this.state.bannerdata[index].bannerbackcolor = color;
        this.setState({
            madechange: true
        })
        document.querySelector("#demo-global").style.display = "none";
    }

    makeclosevisible() {
        if (this.state.bannerdata.length > 1) {
            this.setState({
                visibility: 'visible'
            })
        }
    }

    onDragtextcolor(id, color, c) {
        color = color.color;
        var index = id.slice(-1);
        this.state.bannerdata[index].bannertextcolor = color;
        this.setState({
            madechange: true
        })
    }

    colorpicker(id, event) {
        $(".colorpickers").removeClass("showit");
        $("#" + id + "").addClass("showit");
        document.querySelector("#demo-global").style.display = "none";
    }

    textcolorpicker(id, event) {
        $(".textcolorpickers").removeClass("showit");
        $("#" + id).addClass("showit");
        document.querySelector("showit");
        document.querySelector("#demo-global").style.display = "none";
    }

    changedropdownvalue(id, event) {
        var id = event.target.value;
        var index = event.target.id;
        index = index.slice(-1);
        this.state.bannerdata[index].pagetypeofbanner = id;
        this.setState({
            "madechange": true
        })
        document.querySelector("#demo-global").style.display = "none";
    }

    changecheckbox(event) {
        var id = event.target.id;
        var index = id.slice(-1);
        id = id.slice(0, -1);
        this.state.bannerdata[index].usertype = id;
        this.setState({
            "madechange": true
        })
        document.querySelector("#demo-global").style.display = "none";
    }

    createClone() {
        this.state.bannerdata.push({
            bannertext: 'UP TO 50% OFF',
            bannerbackcolor: '#a94',
            pagetypeofbanner: 'home',
            usertype: 'guest',
            redirecturl: '',
            bannertextcolor: '#fff'
        });
        if (this.state.bannerdata.length > 1) {
            this.setState({
                "visibility": 'visible'
            })
        }
        this.setState({
            'madechange': true
        })
        document.querySelector("#demo-global").style.display = "none";
    }

    removeClone(id, event) {
        event.preventDefault();
        var index = id;
        this.state.bannerdata.splice(id, 1);
        if (this.state.bannerdata.length == 1) {
            this.setState({
                "visibility": 'hidden'
            })
        }
        this.setState({
            madechange: true
        })
    }

    getbannerdata(data) {
        document.querySelector("#demo-global").style.display = "none";
        this.setState({
            bannerdata: data
        })
    }

    repeatativedata = (data) => {
        return (<div className="col-md-12 paddingzero">
            {
                data.map((element, index) => {
                    return (<div key={index} className="col-md-12 data-wrapper paddingzero margin-bottom">
                        <button type="button" onClick={this.removeClone.bind(this, index)} className="close close-icon" aria-label="Close"
                            style={{
                                visibility: this.state.visibility
                            }}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div className="col-md-2 paddingzero">
                            <label className="control-label"> Banner Text </label>
                       </div>
                        <div className="col-md-4 banner-area paddingzero" id={'colorpicker' + index}>
                            <input className="bannerprev text-center col-md-12 paddingzero" onClick={this.isError} onChange={this.changetext.bind(this, index)} type="text" placeholder="Please enter the banner text here" value={element.bannertext} style={{
                                color: element.bannertextcolor,
                                background: element.bannerbackcolor
                            }} />
                            <span className="back-color paddingzero border" onClick={this.colorpicker.bind(this, 'currpick' + index)}>
                                <ReactColorPicker color={element.bannerbackcolor} onChange={this.onDragbackcolor.bind(this, 'colorpicker' + index)} placement={'bottomLeft'} className="colorpickers" id={'currpick' + index} />
                                <span className="backcoloroftext"  >  <span className="glyphicon glyphicon-text-background"></span>  {element.bannerbackcolor} </span>
                            </span>
                            <span className="text-color  border " onClick={this.textcolorpicker.bind(this, 'currtextpick' + index)}>
                                <ReactColorPicker color={element.bannertextcolor} onChange={this.onDragtextcolor.bind(this, 'textcolorpicker' + index)} placement={'bottomLeft'} className="textcolorpickers" id={'currtextpick' + index} />
                                <span className="textcolorofbanner"> <span className="glyphicon glyphicon-text-color"></span>{element.bannertextcolor} </span>
                            </span>
                        </div>
                        <div className="col-md-3 paddingzero">
                            <label className="control-label" > Page </label>
                            <span className="banner-dropdown" id={"dropdown" + index}>
                                <select id={"select" + index} onChange={this.changedropdownvalue.bind(this, 'dropdown' + index)} value={element.pagetypeofbanner}>
                                    <option value="home">Home</option>
                                    <option value="category">Category</option>
                                    <option value="shoppingcart">Shopping Cart</option>
                                    <option value="recipient">Recipient</option>
                                    <option value="deliveryandgreeting">Delivery & Greeting</option>
                                    <option value="placeorder">Place Order</option>
                                    <option value="confirmation">Confirmation</option>
                                    <option value="account_signin">Sign In</option>
                                    <option value="others">Others</option>
                                </select>
                            </span>
                        </div>
                        <div className="col-md-3 paddingzero">
                            <label className="control-label" > User Type</label>
                            <span className="user_type">
                                <label> <input type="radio" id={"guest" + index} name={"usertype" + index} onChange={this.changecheckbox.bind(this)} checked={(element.usertype == 'guest') ? true : false} /> Guest </label>
                                <label> <input type="radio" id={"member" + index} name={"usertype" + index} onChange={this.changecheckbox.bind(this)} checked={(element.usertype == 'member') ? true : false} /> Member </label>
                                <label> <input type="radio" id={"passport" + index} name={"usertype" + index} onChange={this.changecheckbox.bind(this)} checked={(element.usertype == 'passport') ? true : false} /> Passport </label>
                            </span>
                        </div>
                        <div className="col-md-12 margin-top paddingzero margin-bottom">
                            <div className="col-md-2 paddingzero text-left "> <label className="control-label"> Banner URL </label> </div>
                            <div className="col-md-8 paddingzero input-group"> <span className="input-group-addon">Starts with https://...</span> <input type="text" id="banner_redirect" onBlur={this.props.sendblurevent.bind(this, index)} onClick={this.isError} onChange={this.changeurltext.bind(this, index)} className="form-control" value={element.redirecturl} /> </div>
                        </div>
                    </div>
                    )
                })
            }
        </div>)
    }


    render() {
        return (
            this.repeatativedata(this.state.bannerdata)
        )
    }
}
