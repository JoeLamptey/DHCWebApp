import React, {Component}  from 'react'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';


import {API, graphqlOperation} from 'aws-amplify'
import awsmobile from '../../aws-exports'
API.configure(awsmobile)

const styles = theme => ({
    root:{},
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


class AdminCarerNew extends Component{
    constructor(props){
        super(props)
        this.state ={
            newCarer: '',
            newUser: '',
            hide: 'none',
            notification: ''
        }
    }

    createCarerQuery=(newCarer)=>{
        const createCarerQuery = `
                mutation createCarer{
                    createCarer(input:{
                        firstname: "${newCarer.firstname}",
                        lastname: "${newCarer.lastname}",
                        birthday: "${newCarer.birthday}",
                        postcode: "${newCarer.postcode}",
                        email: "${newCarer.email}",
                        mobile: "${newCarer.mobile}",
                        address: "${newCarer.address}",
                        region: "${newCarer.region}",
                        nextofkin: "${newCarer.nextofkin}",
                        nok_email: "${newCarer.email}",
                        nok_mobile: "${newCarer.nokmobile}"
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

            API.graphql(graphqlOperation(createCarerQuery)).then(res=>{
                //console.log('response: ',res.data.createCarer)
                this.setState({newCarer: newCarer, hide: 'block', notification: 'New Carer Successfully created!'})
            }).catch(err => console.log('Error: ',err))
    }

    createUserQuery=(newCarer)=>{
        const createUserQuery = `
        mutation createUser{
                createUser(input:{
                    firstname: "${newCarer.firstname}",
                    lastname: "${newCarer.lastname}",
                    birthday: "${newCarer.birthday}",
                    postcode: "${newCarer.postcode}",
                    email: "${newCarer.email}",
                    password: "carer",
                    mobile: "${newCarer.mobile}",
                    address: "${newCarer.address}",
                    region: "${newCarer.region}",
                    type: "carer"
                }){
                    id
                    firstname
                    lastname
                    mobile
                    email
                    region
                    postcode
                }
            }
        `

        API.graphql(graphqlOperation(createUserQuery)).then(res=>{
            //console.log('response: ',res.data.createCarer)
            let newUser = res.data.createUser
            this.setState({newUser: newUser})
        }).catch(err => console.log('Error: ',err))
    }


    createCarer = (e) =>{
        e.preventDefault()
  
        const newCarer={
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
            this.createCarerQuery(newCarer)
            this.createUserQuery(newCarer)
            
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
            
            //this.props.createCarer({newCarer: newCarer,notification: 'New Carer Successfully created'})
          
    }

    changed=()=>{
        this.setState({notification: ''})
    }

    render(){
        const { classes } = this.props;

        return(
            <div>
                <form onSubmit={this.createCarer}
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
                    <span>
                        <Button 
                            className={classes.button}
                            type='submit'
                            variant='contained'
                            
                            color='primary'
                        >Create Carer</Button>
                        <div align='center' className='success' style={{display: this.state.hide}}>
                            {this.state.notification}
                        </div>
                    </span>
                </form>
                
            </div>
        )
    }
}

export default withStyles (styles)(AdminCarerNew)