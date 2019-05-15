import React, {Component}  from 'react'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';


import {API, graphqlOperation} from 'aws-amplify'
import awsmobile from '../../aws-exports'
API.configure(awsmobile)

const styles = theme => ({
   
    container: {
        flexGrow: 1,
    },
    textField: {
      marginLeft: theme.spacing.unit*2,
      marginRight: theme.spacing.unit*2,
      width: '45%',

      '@media (max-width: 1030px) and (min-width: 651px)':{
            width: '40%',
        },

        '@media (max-width: 650px)':{
            width: '90%',
        }
    },
    
    button:{
        marginTop: theme.spacing.unit*3,
    }
  });


class AdminClientNew extends Component{
    constructor(props){
        super(props)
        this.state ={
            newClient: '',
            notification: ''
        }
    }

    createClient = (e) =>{
        e.preventDefault()
  
        const newClient={
          firstname: e.target.firstname.value,
          middlename: e.target.middlename.value,
          lastname: e.target.lastname.value,
          birthday: e.target.birthday.value,
          postcode: e.target.postcode.value,
          email: e.target.email.value,
          mobile: e.target.telephone.value,
          address: e.target.address.value,
          region: e.target.region.value,
          nextofkin: e.target.nextofkin.value,
          nokemail: e.target.nokemail.value,
          nokmobile: e.target.nokmobile.value,
        }
  
       
        
            const createClientQuery = `
                mutation createClient{
                    createClient(input:{
                        firstname: "${newClient.firstname}",
                        lastname: "${newClient.lastname}",
                        birthday: "${newClient.birthday}",
                        postcode: "${newClient.postcode}",
                        email: "${newClient.email}",
                        mobile: "${newClient.mobile}",
                        address: "${newClient.address}",
                        region: "${newClient.region}",
                        nextofkin: "${newClient.nextofkin}",
                        nok_email: "${newClient.email}",
                        nok_mobile: "${newClient.nokmobile}"
                    }){
                        id
                        firstname
                        lastname
                        email
                        region
                        postcode
                    }
                }
            `

            API.graphql(graphqlOperation(createClientQuery)).then(res=>{
                //console.log('response: ',res.data.createClient)
                this.setState({newClient: newClient, notification: 'New Client Successfully created!'})
            }).catch(err => console.log('Error: ',err))
            
            e.target.firstname.value = ''
            e.target.middlename.value = ''
            e.target.lastname.value = ''
            e.target.birthday.value = ''
            e.target.postcode.value = ''
            e.target.email.value = ''
            e.target.telephone.value = ''
            e.target.address.value = ''
            e.target.region.value = ''
            e.target.nextofkin.value = ''
            e.target.nokemail.value = ''
            e.target.nokmobile.value = ''
            
            //this.props.createClient({newClient: newClient,notification: 'New Client Successfully created'})
          
    }

    changed=()=>{
        this.setState({notification: ''})
    }

    render(){
        const { classes } = this.props;

        return(
            <div>
                <form onSubmit={this.createClient}
                    className={classes.container}  autoComplete="on">
                    <TextField onChange={this.changed}
                        className={classes.textField}
                        variant='standard'
                        label='First Name'
                        name='firstname'
                        type='text'
                        required 
                    />
                    <TextField
                        className={classes.textField}
                        variant='standard'
                        label='Middle Name'
                        name='middlename'
                        type='text'
                    />
                    <TextField
                        className={classes.textField}
                        variant='standard'
                        label='Last Name'
                        name='lastname'
                        type='text'
                        required 
                    />
                    <TextField
                        className={classes.textField}
                        variant='standard'
                        label='Email'
                        name='email'
                        type='email'
                        required 
                    />
                    <TextField
                        className={classes.textField}
                        variant='standard'
                        label='Birthday'
                        name='birthday'
                        type='date'
                        InputLabelProps={{ shrink: true }}
                        required 
                    />
                    <TextField
                        className={classes.textField}
                        variant='standard'
                        label='Postcode'
                        name='postcode'
                        type='text'
                        required 
                    />
                    <TextField
                        className={classes.textField}
                        variant='standard'
                        label='Telephone'
                        name='telephone'
                        type='tel'
                        required 
                    />
                    <TextField
                        className={classes.textField}
                        variant='standard'
                        label='Address'
                        name='address'
                        type='text'
                        required 
                    />
                    <TextField
                        className={classes.textField}
                        variant='standard'
                        label='Region'
                        name='region'
                        type='text'
                    />
                    <TextField
                        className={classes.textField}
                        variant='standard'
                        label='Next of Kin'
                        name='nextofkin'
                        type='text'
                        required
                    />
                    <TextField
                        className={classes.textField}
                        variant='standard'
                        label='NoK Mobile'
                        name='nokmobile'
                        type='tel'
                        required
                    />
                    <TextField
                        className={classes.textField}
                        variant='standard'
                        label='NoK Email'
                        name='nokemail'
                        type='email'
                    />
                    <Button 
                        className={classes.button}
                        type='submit'
                        variant='contained'
                        
                        color='primary'
                    >Create Client</Button>
                </form>
                <div align='center' className='alert'>{this.state.notification}</div>
            </div>
        )
    }
}

export default withStyles (styles)(AdminClientNew)