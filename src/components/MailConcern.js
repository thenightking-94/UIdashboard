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
import PersonIcon from '@material-ui/icons/Person';
import dashB from '../assets/dash_board.jpg';

class MailConcern extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            items: [],
            def_id: '',
            switcher: false,
            defDisplay: '',
            mailrep: []
        };
    }
    componentDidMount() {
        var desp;
        var ar = JSON.parse(localStorage.getItem('Jarray'));
        this.setState({ items: ar });
        var uid = localStorage.getItem('userID');
        for (var i = 0; i < ar.length; i++) {
            if (ar[i].id == uid) { desp = ar[i].des; this.setState({ def_id: ar[i].id }); this.setState({ user_name: ar[i].name }); break; }
        }
        var str;
        if (uid == 'userSafety')
            str = localStorage.getItem('rsafety');
        if (uid == 'userQuality')
            str = localStorage.getItem('rquality');
        if (uid == 'userDelivery')
            str = localStorage.getItem('rdelivery');
        if (uid == 'userCost')
            str = localStorage.getItem('rcost');
        if (uid == 'userPeople')
            str = localStorage.getItem('rpeople');
        var mailar = [];
        mailar[0] = desp;
        if (str)
            mailar[1] = str;

        this.setState({ mailrep: mailar });
        window.addEventListener('scroll', this.removemail);

    }
    removemail = () => { document.getElementById('showmail').style.display = 'none'; document.getElementById('body_section').style.opacity = '1'; }


    componentDidUpdate() {
        var { items, def_id } = this.state;

        if (this.state.switcher == true) {
            $('#Closebtn').on('click', () => {
                document.getElementById('open_menu').style.width = '0px';
                document.getElementById('open_menu').style.left = '-400px';
                document.getElementById('open_menu').style.transition = '1.3s';
                this.setState({ switcher: false });

            });
        }
    }

    openMenu = () => {
        document.getElementById('open_menu').style.width = '400px';
        document.getElementById('open_menu').style.left = '0px';
        document.getElementById('open_menu').style.transition = '1.3s';
        this.setState({ switcher: true });

    }
    viewreport = (e) => {
        var el = e.target.innerHTML;
        var str = (el.split(" "));
        var deta = "You have a request based on" + " " + str[0] + " " + "raised on the day" + " " + str[1] + " " + "of " + " " + str[3] + " " + "of department" + " " + str[4] + " " + "concerned with" + " " + str[5] + " " + "described by as " + " " + str[6] + " " + "caused by" + " " + str[7] + " " + ",which has its due date on" + " " + str[2];
        document.getElementById('showmail').innerHTML = deta;
        document.getElementById('showmail').style.display = 'block';
        document.getElementById('body_section').style.opacity = '0.5';
    }

    log_out = () => {
        document.getElementById('lg_out').style.display = 'block';
    }

    render() {
        var { mailrep } = this.state;
        if (mailrep) {
            var len = mailrep.length;
        }
        return (
            <div>
                <p id='showmail'  >

                </p>
                <div id='lg_out' onMouseLeave={() => { document.getElementById('lg_out').style.display = 'none'; }} style={{ top: '70px', right: '10px', display: 'none' }}> <a href='/' style={{ fontFamily: 'ITC Charter', fontSize: '17px', textDecoration: 'none' }}>Log out</a></div>
                <div id='open_menu'>
                    <Grid style={{ width: '100%' }} container direction="row" justify="flex-end" alignItems="center" >
                        <Button id='Closebtn'>X</Button></Grid>
                    <Grid style={{ padding: '20px', width: '100%' }} container direction="row" justify="flex-start" alignItems="center" >
                        <ul>
                            <Link to='/dashboard' id='dummy_list'>Dashboard</Link>
                            <br />
                            <Link to='/raiseconcern' id='dummy_list'>Raise Concern</Link>
                            <br />
                            <Link to='/reports' id='dummy_list'>Reports</Link>
                            <br />
                            <Link to='/inbox' id='dummy_list'>Inbox</Link>
                        </ul></Grid>
                    <br />

                </div>

                <div id='body_section' style={{ backgroundImage: `url(${dashB})`, backgroundSize: 'cover', height: '900px' }}>

                    <div style={{ width: '100%', display: 'flex', position: 'fixed' }} id='header_part'>
                        <Grid container direction='row' justify='flex-start' alignItems='center' id='p1'>
                            <a title='click to open menu' onClick={this.openMenu} style={{ cursor: 'pointer', fontFamily: 'Helvetica', fontSize: '40px', color: 'white', paddingLeft: '20px' }}><b>≡</b></a>
                        </Grid>
                        <Grid container direction='row' justify='flex-end' alignItems='center' id='p2'>
                            <Typography id='hname' style={{ fontFamily: 'Helvetica', fontSize: '20px', color: 'white' }}>Welcome to iSQCDP Inbox Reports</Typography>
                        </Grid>
                        <Grid container direction='row' justify='flex-end' alignItems='center' id='p3' style={{ display: 'flex' }}>
                            <Typography id='hname' style={{ fontFamily: 'Helvetica', fontSize: '20px', color: 'white' }}><b>𝒍𝒐𝒈𝒈𝒆𝒅 𝒊𝒏 𝒂𝒔</b> </Typography>
                        &nbsp;&nbsp;&nbsp;
                            <Typography style={{ fontFamily: 'Helvetica', fontSize: '22px', color: 'green' }}><b>&#11044;</b> </Typography>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Typography onClick={this.log_out} title='click to log-out' style={{ cursor: 'pointer', fontFamily: 'Helvetica', fontSize: '20px', color: 'white' }}> {this.state.user_name}</Typography>
                        </Grid>
                    </div>

                    <Grid container spacing={24} id='mailpage' style={{ width: '100%', marginTop: '50px' }}>
                        <Grid container direction='row' justify='center' alignItems='center' id='header_mail'>
                            <div style={{ display: 'flex' }}>
                                <p>Inbox Reports</p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <p style={{ backgroundColor: 'red', padding: '3px', color: 'white', fontSize: '15px', borderRadius: '3px' }}>{len}</p></div>
                        </Grid>
                        <br /><br />
                        <Grid container direction='row' justify='center' alignItems='center' id='reports_links'>

                            {mailrep &&
                                <div id='m_mobile' style={{ width: '100%', marginTop: '40px' }}>
                                    {mailrep.map(item =>
                                        <div key={item}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <a onClick={this.viewreport} id='reports_href' >{item}</a>
                                                <a title='Share email' href={"mailto:?subjects=" + "Sharing a request detail with you!&body=Hi,%0D%0A%0D%0AI am sharing this request with you " + item} style={{ background: '#008529', color: 'white', textDecoration: 'none', borderRadius: '5px', padding: '5px', fontFamily: 'Helvetica' }}>Click to share by email</a>
                                            </div>
                                            <br /><br />
                                        </div>

                                    )}
                                </div>
                            }

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
export default MailConcern;