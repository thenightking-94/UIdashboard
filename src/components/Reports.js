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

class Reports extends Component {
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


    log_out = () => {
        document.getElementById('lg_out').style.display = 'block';
    }

    render() {
        var { items } = this.state;

        return (
            <div>

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
                            <Typography style={{ fontFamily: 'Helvetica', fontSize: '20px', color: 'white' }}>Welcome to iSQCDP dashboard</Typography>
                        </Grid>
                        <Grid container direction='row' justify='flex-end' alignItems='center' id='p3' style={{ display: 'flex' }}>
                            <Typography style={{ fontFamily: 'Helvetica', fontSize: '20px', color: 'white' }}><b>𝒍𝒐𝒈𝒈𝒆𝒅 𝒊𝒏 𝒂𝒔</b> </Typography>
                        &nbsp;&nbsp;&nbsp;
                            <Typography style={{ fontFamily: 'Helvetica', fontSize: '22px', color: 'green' }}><b>&#11044;</b> </Typography>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Typography onClick={this.log_out} title='click to log-out' style={{ cursor: 'pointer', fontFamily: 'Helvetica', fontSize: '20px', color: 'white' }}> {this.state.user_name}</Typography>
                        </Grid>
                    </div>

                    <Grid container spacing={24} style={{ padding: '20px', width: '100%', marginTop: '50px' }}>
                        <Grid item sm={3} md={3} xs={12} style={{ marginTop: '10px' }}>

                        </Grid>



                        <Grid item sm={9} md={9} xs={12}>

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
export default Reports;