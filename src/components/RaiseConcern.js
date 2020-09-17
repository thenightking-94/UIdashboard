import React, { Component } from 'react';
import {
    BrowserRouter as Router, Route, Switch,
    Link, Redirect
} from 'react-router-dom';
import '../css/login.css';
import '../css/comp.css';
import '../css/calendar.css';
import $ from 'jquery';
import { Grid, Typography, Button } from '@material-ui/core';
import dashB from '../assets/raiseconcern.jpg';

class RaiseConcern extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            items: [],
            def_id: '',
            switcher: false,
            defDisplay: ''
        };
    }
    componentDidMount() {
        var ar = JSON.parse(localStorage.getItem('Jarray'));
        this.setState({ items: ar });
        var uid = localStorage.getItem('userID');
        for (var i = 0; i < ar.length; i++) {
            if (ar[i].id == uid) { this.setState({ def_id: ar[i].id }); this.setState({ user_name: ar[i].name }); break; }
        }
    }

    componentDidUpdate() {
        if (this.state.switcher == true) {
            $('#Closebtn').on('click', () => {
                document.getElementById('open_menu').style.width = '0px';
                document.getElementById('open_menu').style.left = '-400px';
                document.getElementById('open_menu').style.transition = '1.3s';
                this.setState({ switcher: false });
            });
        }
    }

    raise_request = () => {
        if (document.getElementById('irsafety').checked)
            var radio_val = 'userSafety';
        if (document.getElementById('ircost').checked)
            var radio_val = 'userCost';
        if (document.getElementById('irdelivery').checked)
            var radio_val = 'userDelivery';
        if (document.getElementById('irpeople').checked)
            var radio_val = 'userPeople';
        if (document.getElementById('irquality').checked)
            var radio_val = 'userQuality';

        var duedate = this.fdate.value;
        var category = this.fcat.value;
        var dep = this.fdep.value;
        var concern = this.con.value;
        var desc = this.fdes.value;
        var cause = this.fca.value;
        var str;
        //storing all raised request in localstorage
        if (radio_val == 'userSafety') {
            str = 'safetyDigital' + " " + 'September/10/2020' + " " + duedate + " " + category + " " + dep + " " + concern + " " + desc + " " + cause;
            localStorage.setItem('rsafety', str);
        }
        if (radio_val == 'userCost') {
            str = 'CostFinance' + " " + 'September/10/2020' + " " + duedate + " " + category + " " + dep + " " + concern + " " + desc + " " + cause;
            localStorage.setItem('rcost', str);
        }
        if (radio_val == 'userDelivery') {
            str = 'deliveryDigital' + " " + 'September/10/2020' + " " + duedate + " " + category + " " + dep + " " + concern + " " + desc + " " + cause;
            localStorage.setItem('rdelivery', str);
        }
        if (radio_val == 'userPeople') {
            str = 'People-centric' + " " + 'September/10/2020' + " " + duedate + " " + category + " " + dep + " " + concern + " " + desc + " " + cause;
            localStorage.setItem('rpeople', str);
        }
        if (radio_val == 'userQuality') {
            str = 'qualityDigital' + " " + 'September/10/2020' + " " + duedate + " " + category + " " + dep + " " + concern + " " + desc + " " + cause;
            localStorage.setItem('rquality', str);
        }
        if (str.split(" ").length != 8 || str == null) {
            document.getElementById('err_msg2').style.display = 'block';
            document.getElementById('body_section').style.opacity = '0.5';
        }
        document.getElementById('err_msg').style.display = 'block';
        document.getElementById('body_section').style.opacity = '0.5';
        window.location.assign('/inbox');
    }

    openMenu = () => {
        document.getElementById('open_menu').style.width = '400px';
        document.getElementById('open_menu').style.left = '0px';
        document.getElementById('open_menu').style.transition = '1.3s';
        this.setState({ switcher: true });

    }


    log_out = () => {
        document.getElementById('lg_out').style.display = 'block';
    }

    render() {
        var { items } = this.state;

        return (
            <div>
                <div id='err_msg' >
                    <b> Your request has been raised successfully. Redirecting you to your mail</b>
                </div>
                <div id='err_msg2' >
                    <b> Please check your responses for errors.</b>
                </div>

                <div id='lg_out' onMouseLeave={() => { document.getElementById('lg_out').style.display = 'none'; }} style={{ top: '70px', right: '10px', display: 'none' }}> <a href='/' style={{ fontFamily: 'ITC Charter', fontSize: '17px', textDecoration: 'none' }}>Log out</a></div>
                <div id='open_menu'>
                    <Grid style={{ width: '100%' }} container direction="row" justify="flex-end" alignItems="center" >
                        <Button id='Closebtn'>X</Button></Grid>
                    <Grid style={{ padding: '20px', width: '100%' }} container direction="row" justify="flex-start" alignItems="center" >
                        <ul>
                        <Link to='/dashboard' id='dummy_list'>Dashboard</Link>
                            <br /><br /><br />
                            <Link to='/raiseconcern' id='dummy_list'>Raise Concern</Link>
                            <br /><br /><br />
                            
                            <Link to='/inbox' id='dummy_list'>Inbox</Link>
                        </ul></Grid>
                    <br />

                </div>

                <div id='body_section' onMouseMove={() => { document.getElementById('err_msg2').style.display = 'none'; }} style={{ backgroundImage: `url(${dashB})`, backgroundSize: 'cover', height: '900px' }}>

                    <div style={{ width: '100%', display: 'flex', position: 'fixed' }} id='header_part'>
                        <Grid container direction='row' justify='flex-start' alignItems='center' id='p1'>
                            <a title='click to open menu' onClick={this.openMenu} style={{ cursor: 'pointer', fontFamily: 'Helvetica', fontSize: '40px', color: 'white', paddingLeft: '20px' }}><b>≡</b></a>
                        </Grid>
                        <Grid container direction='row' justify='flex-end' alignItems='center' id='p2'>
                            <Typography id='hname' style={{ fontFamily: 'Helvetica', fontSize: '20px', color: 'white' }}>Welcome to iSQCDP Raise Concern Portal</Typography>
                        </Grid>
                        <Grid container direction='row' justify='flex-end' alignItems='center' id='p3' style={{ display: 'flex' }}>
                            <Typography id='hname' style={{ fontFamily: 'Helvetica', fontSize: '20px', color: 'white' }}><b>𝒍𝒐𝒈𝒈𝒆𝒅 𝒊𝒏 𝒂𝒔</b> </Typography>
                        &nbsp;&nbsp;&nbsp;
                            <Typography style={{ fontFamily: 'Helvetica', fontSize: '22px', color: 'green' }}><b>&#11044;</b> </Typography>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Typography onClick={this.log_out} title='click to log-out' style={{ cursor: 'pointer', fontFamily: 'Helvetica', fontSize: '20px', color: 'white' }}> {this.state.user_name}</Typography>
                        </Grid>
                    </div>

                    <Grid container spacing={24} style={{ padding: '20px', width: '100%', marginTop: '50px' }}>
                        <Grid item sm={2} md={2} xs={12} style={{ marginTop: '10px', paddingLeft: '20px' }}>
                            <Grid container direction='column' justify='space-around' alignItems='center' id='rc1' style={{ height: '700px', marginTop: '50px', backgroundColor: 'white', borderRadius: '10px', opacity: '0.65' }}>
                                <p style={{ color: 'white', backgroundColor: 'black', fontSize: '20px', borderRadius: '10px', opacity: '1 !important', fontFamily: 'Helvetica', padding: '13px' }}>Raise Concern</p>
                                <div className='rb'><input type="radio" id="irsafety" name="typeR" value="safety" />
                                &nbsp;&nbsp;&nbsp;&nbsp;<label id='rl' for="safety">Safety</label></div>
                                <div className='rb'><input type="radio" id="irquality" name="typeR" value="quality" />
                                &nbsp;&nbsp;&nbsp;&nbsp;<label id='rl' for="quality">Quality</label></div>
                                <div className='rb'><input type="radio" id="irdelivery" name="typeR" value="delivery" />
                                &nbsp;&nbsp;&nbsp;&nbsp;  <label id='rl' for="delivery">Delivery</label></div>
                                <div className='rb'><input type="radio" id="ircost" name="typeR" value="cost" />
                                &nbsp;&nbsp;&nbsp;&nbsp;  <label id='rl' for="cost">Cost</label></div>
                                <div className='rb'><input type="radio" id="irpeople" name="typeR" value="people" />
                                &nbsp;&nbsp;&nbsp;&nbsp;  <label id='rl' for="people">People</label></div>
                            </Grid>
                        </Grid>



                        <Grid item sm={10} md={10} xs={12} style={{ marginTop: '25px' }}>
                            <Grid container direction='row' justfy='flex-end' alignItems='center'>
                                <div id='frmgrid' style={{ width: '70%' }}>
                                    <Grid container direction='row' justify='space-between' alignItems='center'>
                                        <p id='text_frm'>Stream</p>
                                        <div style={{ display: 'flex' }}><p id='text_frm'>Sub-Stream</p>  &nbsp;&nbsp;&nbsp;<p id='text_frm'><b>Digital</b></p></div>
                                    </Grid>
                                    <br />
                                    <Grid container direction='row' justify='space-between' alignItems='center'>
                                        <p id='text_frm'>RaisedE</p>
                                        <div style={{ display: 'flex' }}><p id='text_frm'>RaisedDate (mm/dd/yyyy) :</p> &nbsp;&nbsp;&nbsp;<p id='text_frm'><b>September/10/2020</b></p></div>
                                    </Grid>
                                    <br />
                                    <Grid container direction='row' justify='space-between' alignItems='center'>
                                        <div> <p id='text_frm'>DueDate(mm/dd/yyyy)</p> <br /><input type='text' className='fdate' placeholder='....' ref={fdate => this.fdate = fdate} /></div>
                                        <div> <p id='text_frm'>Category</p> <br /><input type='text' className='fcat' placeholder='....' ref={fcat => this.fcat = fcat} /></div>
                                    </Grid>
                                    <br />
                                    <p style={{ width: '20%' }} id='text_frm'>Department</p>
                                    <br />
                                    <input type='text' className='fdep' placeholder='....' ref={fdep => this.fdep = fdep} />
                                    <br />
                                    <br />
                                    <p style={{ width: '20%' }} id='text_frm'>Concern</p>
                                    <br />
                                    <input type='text' className='fdep' placeholder='....' ref={con => this.con = con} />
                                    <br /><br />
                                    <p style={{ width: '20%' }} id='text_frm'>Description</p>
                                    <br />
                                    <input type='text' className='fdep' placeholder='....' ref={fdes => this.fdes = fdes} />
                                    <br /><br />
                                    <p style={{ width: '20%' }} id='text_frm'>Cause</p>
                                    <br />
                                    <input type='text' className='fdep' placeholder='....' ref={fca => this.fca = fca} />
                                    <br /><br />
                                    <div id='upl' style={{ background: 'white', padding: '10px', width: '30%', borderRadius: '10px' }}><input type="file" id="myFile" multiple size="50" onChange={this.fileupload} /></div>
                                    <Grid container direction='row' justify='center' alignItems='center'><Button id='reqbtn' onClick={this.raise_request}>Raise</Button></Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>

                <div id='footer_dash'>
                    <b>  © Rolls-Royce plc 2020. All rights reserved</b>
                </div>
            </div >
        )
    }

}
export default RaiseConcern;