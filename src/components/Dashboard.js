import React, { Component } from 'react';
import {
    BrowserRouter as Router, Route, Switch,
    Link, Redirect
} from 'react-router-dom';
import RaiseConcern from './RaiseConcern.js';
import MailConcern from './MailConcern';
import '../css/login.css';
import '../css/comp.css';
import '../css/calendar.css';
import $ from 'jquery';
import { Grid, Typography, Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import dashB from '../assets/dash_board.jpg';

class Dashboard extends Component {
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
        if (this.state.defDisplay == '') {
            //applying default changes after login and refreshing new chnages with refreshed state changed id
            if (items && def_id) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].id == def_id) {
                        var el = document.querySelector("p[id=" + CSS.escape(items[i].name) + "]");
                        var carel = document.querySelector("div[class=" + CSS.escape(items[i].name) + "]");
                        var ino = this.def_in1;
                        var inc = this.def_in2;
                        if (el && carel) {
                            el.style.backgroundColor = '#008529';
                            carel.style.backgroundColor = '#008529';
                            ino.value = (items[i].des.split(" "))[4].toString();
                            inc.value = (items[i].des.split(" "))[5].toString();
                        }
                        var raiseD = parseInt(((items[i].des.split(" "))[1].toString().split('/'))[1]);
                        var dueD = parseInt(((items[i].des.split(" "))[2].toString().split('/'))[1]);
                        for (var i = raiseD; i <= dueD; i++) {
                            var elem = document.querySelector("p[id=" + CSS.escape(i.toString()) + "]");
                            if (elem) {
                                elem.style.backgroundColor = '#e88d14';
                                elem.style.width = '35px';
                                elem.style.height = '35px';
                                elem.style.color = 'white';
                                elem.style.borderRadius = '5px';
                                elem.style.fontSize = '25px';
                                elem.style.textAlign = 'center';
                                elem.style.opacity = '1';

                                if (i == raiseD) {
                                    var val = elem.innerHTML;
                                    val = val + " " + "Raised Date";
                                    elem.innerHTML = val;
                                    elem.style.fontSize = '20px';
                                    elem.style.height = '25px';
                                    elem.style.textAlign = 'center';
                                    elem.style.backgroundColor = '#ad1b02';
                                    elem.style.width = '155px';
                                }
                                if (i == dueD) {
                                    var val2 = elem.innerHTML;
                                    val2 = val2 + " " + "Due Date";
                                    elem.innerHTML = val2;
                                    elem.style.height = '25px';
                                    elem.style.fontSize = '20px';
                                    elem.style.textAlign = 'center';
                                    elem.style.backgroundColor = 'black';
                                    elem.style.width = '155px';
                                }
                            }
                        }
                    }
                }
            }
        }
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

    changeview = (e) => {
        var { items, def_id } = this.state; var pid;
        var dep = document.querySelector("input[id='dashIn1']").value;
        var conc = document.querySelector("input[id='dashIn2']").value;
        console.log(dep)
        var arr = JSON.parse(localStorage.getItem('Jarray'));
        var arrayt = arr.map(item => item.des);
        console.log(arrayt)
        for (var i = 0; i < arrayt.length; i++) {
            if (dep == (arrayt[i].split(" "))[4].toString() && conc == (arrayt[i].split(" "))[5].toString()) { pid = arr[i].id; console.log(pid); break; }
        }
        var id_ob = e.target.id;
        if (!id_ob && pid) {
            id_ob = pid;
        }
        if (id_ob) {
            if (items != null && def_id) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].id == def_id) {
                        var el = document.querySelector("p[id=" + CSS.escape(items[i].name) + "]");
                        var carel = document.querySelector("div[class=" + CSS.escape(items[i].name) + "]");
                        var ino = this.def_in1;
                        var inc = this.def_in2;
                        if (el) {
                            el.style.backgroundColor = '#e88d14';
                            carel.style.backgroundColor = 'black';
                            ino.value = '';
                            inc.value = '';
                        }
                        var raiseD = parseInt(((items[i].des.split(" "))[1].toString().split('/'))[1]);
                        var dueD = parseInt(((items[i].des.split(" "))[2].toString().split('/'))[1]);
                        for (var i = raiseD; i <= dueD; i++) {
                            var elem = document.querySelector("p[id=" + CSS.escape(i.toString()) + "]");
                            if (elem) {
                                elem.style.backgroundColor = 'white';
                                elem.style.width = '35px';
                                elem.style.height = '35px';
                                elem.style.color = 'black';
                                elem.style.borderRadius = '5px';
                                elem.style.fontSize = '25px';
                                elem.style.textAlign = 'center';
                                elem.style.opacity = '0.75';
                            }
                            if (i == raiseD) {

                                elem.innerHTML = i;
                                elem.style.fontSize = '20px';
                                elem.style.height = '35px';
                                elem.style.textAlign = 'center';
                                elem.style.backgroundColor = 'white';
                                elem.style.width = '35px';
                            }
                            if (i == dueD) {

                                elem.innerHTML = i;
                                elem.style.height = '35px';
                                elem.style.fontSize = '20px';
                                elem.style.textAlign = 'center';
                                elem.style.backgroundColor = 'white';
                                elem.style.width = '35px';
                            }
                        }
                    }
                }
            }
            //inserting new ids from click...after removing prev id style changes
            this.setState({ def_id: id_ob });
            this.setState({ defDisplay: '' });
        }
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
                            <br /><br /><br />
                            <Link to='/raiseconcern' id='dummy_list'>Raise Concern</Link>
                            <br /><br /><br />
                            
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
                            <Typography id='hname' style={{ fontFamily: 'Helvetica', fontSize: '20px', color: 'white' }}>Welcome to iSQCDP dashboard</Typography>
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
                        <Grid item sm={3} md={3} xs={12} style={{ marginTop: '10px' }}>
                            {items &&
                                <div>
                                    {items.map(item =>
                                        < div key={item.id}>
                                            <div style={{ width: '80%' }} id='card_des' className={item.name}>
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                                    <p style={{ background: '#e88d14', fontFamily: 'ITC Charter', fontSize: '25px', color: 'black', borderRadius: '8px', paddingLeft: '10px', paddingRight: '10px' }} id={item.name}> {item.operations}</p>
                                                    <p style={{ padding: '3px', background: '#008529', fontFamily: 'ITC Charter', fontSize: '20px', color: 'white', borderRadius: '8px', textAlign: 'center' }}>+ 1</p>
                                                </div>
                                                <Grid container direction='row' justify='center' alignItems='flex-end' style={{ backgroundColor: 'white', position: 'absolute', bottom: '5px', padding: '5px', borderRadius: '5px', width: '92%' }}>
                                                    <PersonIcon />
                                                    &nbsp; &nbsp; &nbsp; &nbsp;
                                                    <p onClick={this.changeview} title='Click to check Request details' id={item.id} style={{ cursor: 'pointer', color: 'black', fontFamily: 'ITC Charter', fontSize: '18px' }}> {item.name}</p>
                                                </Grid>
                                            </div>
                                            <br />
                                        </div>
                                    )}
                                </div>
                            }
                        </Grid>



                        <Grid item sm={9} md={9} xs={12}>
                            <br />
                            <br />

                            <Grid container direction='row' justify='space-around' alignItems='center' id='dash_in'>
                                <input type='text' id='dashIn1' ref={def_in1 => this.def_in1 = def_in1} />
                                <input type='text' id='dashIn2' ref={def_in2 => this.def_in2 = def_in2} />
                                <Button onClick={this.changeview} id='dashSub'>Go</Button>
                            </Grid>

                            <br />
                            <br />
                            <Grid container direction='row' justify='center' alignItems='center' id='dash_in'>
                                <p style={{ fontFamily: 'ITC Charter', fontSize: '35px', color: 'white' }}>September 2020</p>
                            </Grid>
                            <br />
                            <Grid id='gt' container direction='row' justify='center' alignItems='center'>
                                <div style={{ display: 'flex', width: '100%', cursor: 'pointer' }}>
                                    <Grid container direction='column' justify='space-around' alignItems='center' id='dash_in_table'>
                                        <p> Monday</p>
                                        <p> Tuesday</p>
                                        <p> Wednesday</p>
                                        <p> Thursday</p>
                                        <p> Friday</p>
                                        <p> Saturday</p>
                                        <p> Sunday</p>
                                    </Grid>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Grid container direction='column' justify='space-around' alignItems='center' id='dash_in_table_days1'>
                                        <p id='blT'> blank</p>
                                        <p id='1'> 1</p>
                                        <p id='2'> 2</p>
                                        <p id='3'> 3</p>
                                        <p id='4'> 4</p>
                                        <p id='5'> 5</p>
                                        <p id='6'> 6</p>
                                    </Grid>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Grid container direction='column' justify='space-around' alignItems='center' id='dash_in_table_days2'>
                                        <p id='7'> 7</p>
                                        <p id='8'> 8</p>
                                        <p id='9'> 9</p>
                                        <p id='10'> 10</p>
                                        <p id='11'> 11</p>
                                        <p id='12'> 12</p>
                                        <p id='13'> 13</p>
                                    </Grid>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Grid container direction='column' justify='space-around' alignItems='center' id='dash_in_table_days3'>
                                        <p id='14'> 14</p>
                                        <p id='15'> 15</p>
                                        <p id='16'> 16</p>
                                        <p id='17'> 17</p>
                                        <p id='18'> 18</p>
                                        <p id='19'> 19</p>
                                        <p id='20'> 20</p>
                                    </Grid>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Grid container direction='column' justify='space-around' alignItems='center' id='dash_in_table_days4'>
                                        <p id='21'> 21</p>
                                        <p id='22'> 22</p>
                                        <p id='23'> 23</p>
                                        <p id='24'> 24</p>
                                        <p id='25'> 25</p>
                                        <p id='26'> 26</p>
                                        <p id='27'> 27</p>
                                    </Grid>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Grid container direction='column' justify='space-around' alignItems='center' id='dash_in_table_days5'>
                                        <p id='28'> 28</p>
                                        <p id='29'> 29</p>
                                        <p id='30'> 30</p>
                                        <p id='blT'> blank</p>
                                        <p id='blT'> blank</p>
                                        <p id='blT'> blank</p>
                                        <p id='blT'> blank</p>
                                    </Grid>
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
export default Dashboard;