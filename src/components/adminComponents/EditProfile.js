import React, { Component } from 'react';
import {List, ListItem, ListItemText, Grid, TextField, Button, Paper }from '@material-ui/core';

//import profileStyle from '../../styles/profile.css'
import  '../../styles/profile.css'

import {API, graphqlOperation} from 'aws-amplify'
import awsmobile from '../../aws-exports'
API.configure(awsmobile)

class EditProfile extends Component {

    constructor(props){
        super(props)

        this.state={
           ...this.props
        }
    }

    updateProfileQuery= async (newProfile)=>{
       const updateProfileQuery= `
        mutation updateUser{
            updateUser(input: {
                id: "${newProfile.id}",
                email: "${newProfile.email}",
                region: "${newProfile.region}",
                mobile: "${newProfile.mobile}",
                postcode: "${newProfile.postcode}",
                address: "${newProfile.address}",
                password: "${newProfile.password}",
            }){
                firstname
                region
                mobile
                email
                postcode
                address
            }
        }
        `

        await API.graphql(graphqlOperation(updateProfileQuery)).then(res=>{
            let output = res.data.updateUser
            console.log("Success: ", output)
        }).catch(err => console.log(err))
    }

    editProfle=(e)=>{
        e.preventDefault()
        //console.log(this.state.id)

        let change ={
            id: this.state.id,
            email: e.target.email.value,
            password: e.target.password.value,
            mobile: e.target.mobile.value,
            address: e.target.address.value,
            postcode: e.target.postcode.value,
            region: e.target.region.value
        }
        
        this.updateProfileQuery(change)
        
        this.setState({
            email: change.email,
            password: change.password,
            mobile: change.mobile,
            address: change.address,
            postcode: change.postcode,
            region: change.region

        })

        e.target.email.value = ''
        e.target.password.value = ''
        e.target.mobile.value = ''
        e.target.address.value = ''
        e.target.postcode.value = ''
         e.target.region.value = ''

    }

    render() {
        return (
            <div>
                <Grid container spacing={24}>
                    
                    <Grid item  xs={5}>
                        <Paper>
                            <List component='nav'>
                                <ListItem button>
                                    <ListItemText>First Name: {this.state.firstname}</ListItemText>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText>Last Name: {this.state.lastname}</ListItemText>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText>Email: {this.state.email}</ListItemText>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText>Mobile: {this.state.mobile}</ListItemText>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText>Address: {this.state.address}</ListItemText>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText>Postcode: {this.state.postcode}</ListItemText>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText>Region: {this.state.region}</ListItemText>
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={7}>
                        <Paper>
                            <br /><br />
                            <form onSubmit={this.editProfle} className='container'>
                                <TextField label='Email' variant='standard' fullWidth type='email' name='email' defaultValue={this.state.email}/>
                                <TextField label='Password' variant='standard' fullWidth type='password' name='password' defaultValue={this.state.password}/>
                                <TextField label='Mobile' variant='standard' fullWidth type='AWSPhone' name='mobile' defaultValue={this.state.mobile}/>
                                <TextField label='Address' variant='standard' fullWidth name='address' defaultValue={this.state.address}/>
                                <TextField label='Postcode' variant='standard' fullWidth name='postcode' defaultValue={this.state.postcode}/>
                                <TextField label='Region' variant='standard' fullWidth  name='region' defaultValue={this.state.region}/>
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