import React, { Component } from 'react';
import {
    BrowserRouter as Router, Route, Switch,
    Link, Redirect
} from 'react-router-dom';
import car from '../assets/logBack.jpg';
import '../css/login.css';
import { Grid, Typography, Button } from '@material-ui/core';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isloaded: false,
            logged: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        fetch("/Users.json", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isloaded: true,
                    items: json
                });
            });
    }

    emcheck = () => {
        if (this.email_box.value.includes(" ") == true) {
            document.getElementById('err_msg').style.display = 'block';
            document.getElementById('login_page').style.opacity = '0.5';
        }
    }
    reset_err = () => {
        document.getElementById('err_msg').style.display = 'none';
        document.getElementById('login_page').style.opacity = '1';
    }
    handleSubmit = (e) => {
        var { items } = this.state;
        var em = this.email_box.value.toString();
        var ps = this.pass_box.value.toString();
        var details = [];
        if (items) {
            details = items.map(item => item);
            for (var i = 0; i < details.length; i++) {
                if (details[i].email == em && details[i].password == ps) {
                    localStorage.setItem('userID', details[i].id);
                    this.setState({ logged: true });
                    break;
                }
                else {
                    document.getElementById('err_msg').style.display = 'block';
                    document.getElementById('login_page').style.opacity = '0.5';
                }
            }
        }
        e.preventDefault();
    }

    componentDidUpdate() {
        if (this.email_box.value && this.pass_box.value && this.state.logged == true) {
            console.log(localStorage.getItem('userID'));
        }
    }

    render() {
        var { logged, items } = this.state;
        if (items) {
            localStorage.setItem('Jarray', JSON.stringify(items));
        }
        return (
            <div>

                <div id='err_msg' >
                    <b> Please enter proper correct credentials.</b>

                </div>

                <div id='login_page' onMouseMove={this.reset_err}>
                    <Grid container direction='row' justify='center' alignItems='center' id='g1' style={{ width: '100%', height: '70px', backgroundColor: 'black' }}>
                        <Typography id='login_page_heading'>Welcome to iSQCDP </Typography>
                    </Grid>
                    <Grid container direction='row' justify='center' alignItems='center' id='g2' style={{ width: '100%', height: '805px', backgroundImage: `url(${car})`, backgroundSize: 'cover' }}>
                        <div id='login_base'>
                            <form id='form_css' onSubmit={this.handleSubmit} method='get'>

                                <Grid container direction='row' justify='space-around' alignItems='center' >
                                    <Typography style={{ color: 'black', fontSize: '20px', fontFamily: 'Helvetica' }}><i><b>Enter email :</b></i> </Typography>
                                    <input type='text' onChange={this.emcheck} autoComplete='off' id='ip1' ref={email_box => this.email_box = email_box} placeholder='.......' />
                                </Grid>
                                <br />
                                <Grid container direction='row' justify='space-evenly' alignItems='center' >
                                    <Typography style={{ color: 'black', fontSize: '20px', fontFamily: 'Helvetica' }}><i><b>Enter password :</b></i> </Typography>
                                    <input type='text' autoComplete='off' id='ip1' ref={pass_box => this.pass_box = pass_box} placeholder='......' />
                                </Grid>
                                <br />
                                <br />
                                <input type='submit' onClick={this.handleSubmit} value='Login' style={{ cursor: 'pointer', backgroundColor: 'transparent', textTransform: 'capitalize', color: 'white', fontSize: '20px', padding: '5px', outline: 'none', border: 'none' }} />

                                {logged && <Redirect to="/dashboard" />}


                            </form>
                        </div>
                    </Grid>

                </div>
                <div id='footer'>
                    <b>  © Rolls-Royce plc 2020. All rights reserved</b>
                </div>



            </div >
        );
    }
}

export default Login;
