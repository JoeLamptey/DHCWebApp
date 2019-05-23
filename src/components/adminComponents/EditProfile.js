import React, { Component } from 'react';
import {List, ListItem, ListItemText, Grid, TextField, Button, Paper }from '@material-ui/core';

//import profileStyle from '../../styles/profile.css'
import  '../../styles/profile.css'

class EditProfile extends Component {

    constructor(props){
        super(props)

        this.state={
           
        }
    }

    editProfle=(e)=>{
        e.preventDefault()
        console.log(e.target.firstname.value)
    }

    render() {
        return (
            <div>
                <Grid container spacing={24}>
                    {/* <Grid item  xs={2}>
                        <List component='nav'>
                            <ListItem button>
                                <ListItemText>Firstname</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemText>Lastname</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemText>Email</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemText>Mobile</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemText>Address</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemText>Postcode</ListItemText>
                            </ListItem>
                        </List>
                    </Grid> */}
                    <Grid item  xs={5}>
                        <Paper>
                            <List component='nav'>
                                <ListItem button>
                                    <ListItemText>First Name: {this.props.firstname}</ListItemText>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText>Last Name: {this.props.lastname}</ListItemText>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText>Email: {this.props.email}</ListItemText>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText>Mobile: {this.props.mobile}</ListItemText>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText>Address: {this.props.address}</ListItemText>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText>Postcode: {this.props.postcode}</ListItemText>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText>Region: {(this.props.region)?this.props.region: null}</ListItemText>
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={7}>
                        <Paper>
                            <br /><br />
                            <form onSubmit={this.editProfle} className='container'>
                                <TextField label='Firstname' variant='standard' fullWidth name='firstname'/>
                                <TextField label='Lastname' variant='standard' fullWidth name='lastname'/>
                                <TextField label='Email' variant='standard' fullWidth type='email' name='email'/>
                                <TextField label='Password' variant='standard' fullWidth type='password' name='password'/>
                                <TextField label='Mobile' variant='standard' fullWidth type='email' name='email'/>
                                <TextField label='Address' variant='standard' fullWidth name='address'/>
                                <TextField label='Postcode' variant='standard' fullWidth name='postcode'/>
                                <TextField label='Region' variant='standard' fullWidth  name='region'/>
                                <br /><br />
                                <Button color='primary'
                                    type='submit'
                                    variant='contained'>
                                    Edit Profile
                                </Button>
                                <br /><br />
                            </form>
                        </Paper>
                        
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default EditProfile;