import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField} from '@material-ui/core'

import {API, graphqlOperation} from 'aws-amplify'
import awsmobile from '../../aws-exports'
API.configure(awsmobile)

const styles = theme => ({
   root:{

   },
    container: {
      //display: 'flex',
      //flexWrap: 'wrap',
      margin: '0% 15%',
    },
    textField: {
    //   marginTop: theme.spacing.unit,
    //   marginBottom: theme.spacing.unit,
    //   width: '100%',
    },
    button:{
        marginTop: theme.spacing.unit,
    }
  });

  class Bio extends Component{
      constructor(props){
        super(props)
        this.state={
          bio:{}
        }
      }

    bioForm=(bio)=>{
        this.props.bioForm(bio)
        this.setState({bio})
    }

    componentWillUnmount(){
      let bio ={
          firstname: document.bioForm.firstname.value,
          middlename: document.bioForm.middlename.value,
          lastname: document.bioForm.lastname.value,
          birthday: document.bioForm.birthday.value,
      }
      this.bioForm(bio)
    }

    render(){
        return (<form  
              name='bioForm'
            autoComplete="off">
           <TextField
               className={this.props.classes.textField}
               variant='standard'
               label='First Name'
               name='firstname'
               type='text'
               defaultValue={this.props.bio.firstname}
               style={{width: '80%', marginTop: '1%', 
                   marginBottom: '1%', marginLeft: '10%',
                    marginRight: '10%' }}
               required 
           />
           <TextField
               className={this.props.classes.textField}
               variant='standard'
               label='Middle Name'
               name='middlename'
               type='text'
               defaultValue={this.props.bio.middlename}
               style={{width: '80%', marginTop: '1%', 
                   marginBottom: '1%', marginLeft: '10%',
                    marginRight: '10%' }}
           />
           <TextField
               className={this.props.classes.textField}
               variant='standard'
               label='Last Name'
               name='lastname'
               type='text'
               defaultValue={this.props.bio.lastname}
               style={{width: '80%', marginTop: '1%', 
                   marginBottom: '1%', marginLeft: '10%',
                    marginRight: '10%' }}
               required 
           />
           <TextField
               className={this.props.classes.textField}
               variant='standard'
               label='Birthday'
               name='birthday'
               InputLabelProps={{
                   shrink: true,
                 }}
               type='date'
               defaultValue={this.props.bio.birthday}
               style={{width: '80%', marginTop: '1%', 
                   marginBottom: '1%', marginLeft: '10%',
                    marginRight: '10%' }}
               required 
           />
           {/* <Button id='bioBut' type='submit' style={{display: 'none'}} onClick={this.bioForm}>Bio</Button> */}
   </form>)
    }
}

class Contact extends Component {
   constructor(props){
     super(props)
     this.state={
        contact:{}
     }
   }

   contact=(contact)=>{
        this.props.contact(contact)
        this.setState({contact})
    }

    componentWillUnmount(){
      let contact = {
          email: document.contactForm.email.value,
          telephone: document.contactForm.telephone.value,
          postcode: document.contactForm.postcode.value,
          address: document.contactForm.address.value,
          region: document.contactForm.region.value,
      }
      this.contact(contact)
    }

   render(){
    return  (<form autoComplete="off" name='contactForm'>
          <TextField
              className={this.props.classes.textField}
              variant='standard'
              label='Email'
              name='email'
              type='email'
              defaultValue={this.props.con.email}
              required 
              style={{width: '80%', marginTop: '1%', 
                      marginBottom: '1%', marginLeft: '10%',
                      marginRight: '10%' }}
          />
          <TextField
              className={this.props.classes.textField}
              variant='standard'
              label='Postcode'
              name='postcode'
              type='text'
              defaultValue={this.props.con.postcode}
              required
              style={{width: '80%', marginTop: '1%', 
                      marginBottom: '1%', marginLeft: '10%',
                      marginRight: '10%' }}
          />
          <TextField
              className={this.props.classes.textField}
              variant='standard'
              label='Telephone'
              name='telephone'
              type='tel'
              defaultValue={this.props.con.telephone}
              required 
              style={{width: '80%', marginTop: '1%', 
                      marginBottom: '1%', marginLeft: '10%',
                      marginRight: '10%' }}
          />
          <TextField
              className={this.props.classes.textField}
              variant='standard'
              label='Address'
              name='address'
              type='text'
              defaultValue={this.props.con.address}
              required 
              style={{width: '80%', marginTop: '1%', 
                      marginBottom: '1%', marginLeft: '10%',
                      marginRight: '10%' }}
          />
          <TextField
              className={this.props.classes.textField}
              variant='standard'
              label='Region'
              name='region'
              type='text'
              defaultValue={this.props.con.region}
              required 
              style={{width: '80%', marginTop: '1%', 
                      marginBottom: '1%', marginLeft: '10%',
                      marginRight: '10%' }}
          />
      </form>)
   }
}

class NextofKin extends Component{

  constructor(props){
    super(props)
    this.state={
      nextofkin:{}
    }
  }

   nextofkin=(nextofkin)=>{
        this.props.nextofkin(nextofkin)
        this.setState({nextofkin})
    }

    componentWillUnmount(){
      let nok = {
          nextofkin: document.nextofkinForm.nextofkin.value,
          nokmobile: document.nextofkinForm.nokmobile.value,
          nokemail: document.nextofkinForm.nokemail.value,
      }
      this.nextofkin(nok)
    }

   render(){
    return (<form autoComplete="off"  name='nextofkinForm'>
          <TextField
              className={this.props.classes.textField}
              variant='standard'
              label='Next of Kin'
              name='nextofkin'
              type='text'
              defaultValue={this.props.nok.nextofkin}
              required
              style={{width: '80%', marginTop: '1%', 
                      marginBottom: '1%', marginLeft: '10%',
                      marginRight: '10%' }}
          />
          <TextField
              className={this.props.classes.textField}
              variant='standard'
              label='NoK Mobile'
              name='nokmobile'
              type='text'
              defaultValue={this.props.nok.nokmobile}
              required
              style={{width: '80%', marginTop: '1%', 
                      marginBottom: '1%', marginLeft: '10%',
                      marginRight: '10%' }}
          />
          <TextField
              className={this.props.classes.textField}
              variant='standard'
              label='NoK Email'
              name='nokemail'
              defaultValue={this.props.nok.nokemail}
              type='email'
              style={{width: '80%', marginTop: '1%', 
                      marginBottom: '1%', marginLeft: '10%',
                      marginRight: '10%' }}
          />
      </form>)
   }
}

class SupervisorAddClient extends Component{
    constructor(props){
        super(props)

        this.state={
            activeStep: 0,
            newClient: '',
            newUser:{},
            hide: 'none',
            alert: '',
            notification: '',
            bio:{
                firstname: '',
                middlename: '',
                lastname: '',
                birthday: '',
            },
            contact: {
                postcode: '',
                email: '',
                telephone: '',
                address: '',
                region: '',
            },
            nextofkin:{
                nextofkin: '',
                nokemail: '',
                nokmobile: '',
            }
        }
    }
  
    createClientQuery=(newClient)=>{
      const createClientQuery = `
              mutation createClient{
                  createClient(input:{
                      firstname: "${newClient.firstname}",
                      lastname: "${newClient.lastname}",
                      birthday: "${newClient.birthday}",
                      postcode: "${newClient.postcode}",
                      email: "${newClient.email}",
                      mobile: "${newClient.telephone}",
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
              this.setState({newClient: newClient,hide: 'block', alert: 'success', notification: 'New Client Successfully created!'})
          }).catch(err => {
                console.log('Error: ', err)
                this.setState({alert: 'alert',hide: 'block', notification: 'Failed to create Client'})
            })
  }

  createUserQuery=(newClient)=>{
      const createUserQuery = `
      mutation createUser{
              createUser(input:{
                  firstname: "${newClient.firstname}",
                  lastname: "${newClient.lastname}",
                  birthday: "${newClient.birthday}",
                  postcode: "${newClient.postcode}",
                  email: "${newClient.email}",
                  password: "client",
                  mobile: "${newClient.telephone}",
                  address: "${newClient.address}",
                  region: "${newClient.region}",
                  type: "client"
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
          //console.log('response: ',res.data.createClient)
          let newUser = res.data.createUser
          this.setState({newUser: newUser, alert: 'success'})
          console.log(newUser)
      }).catch(err => {
            console.log('Error: ', err)
            this.setState({alert: 'alert', hide: 'block', notification: 'Failed to create Client'})
      })
  }

    createClient = () =>{
  
        const newClient={
          firstname: this.state.bio.firstname,
          middlename: this.state.bio.middlename,
          lastname: this.state.bio.lastname,
          birthday: this.state.bio.birthday,
          postcode: this.state.contact.postcode,
          email: this.state.contact.email,
          telephone: this.state.contact.telephone,
          address: this.state.contact.address,
          region: this.state.contact.region,
          nextofkin: this.state.nextofkin.nextofkin,
          nokemail: this.state.nextofkin.nokemail,
          nokmobile: this.state.nextofkin.nokmobile,
        }
            this.createClientQuery(newClient)
            this.createUserQuery(newClient)
            //this.setState({newClient: newClient,  notification: 'New user Successfully created!'})
    
    }

    getSteps=()=> {
        return ['Bio Data', 'Contact Details', 'Next of Kin Details'];
    }

    bioForm=(bio)=>{
        this.setState({bio})
        //console.log('Bio: ',bio)
    }

    contact=(contact)=>{
      this.setState({contact})
      //console.log(contact)
    }

    nok=(nok)=>{
      this.setState({nextofkin: nok})
      //console.log(nok)
    }

    getStepContent=(stepIndex, classes)=>{
        switch (stepIndex) {
          case 0:
            return (<Bio classes={classes} 
                        bio={this.state.bio} 
                        bioForm={(info)=>this.bioForm(info)}/>)
          case 1:
            return (<Contact classes={classes} 
                      con={this.state.contact}
                      contact={(info)=>this.contact(info)}/>)
          case 2:
            return (<NextofKin classes={classes} 
                      nok={this.state.nextofkin}
                      nextofkin={(info)=>this.nok(info)} />)
          default:
            return 'Uknown stepIndex';
        }
      }

   handleNext= async (e)=> {     
    await this.setState({activeStep: this.state.activeStep + 1})
    //console.log(this.state.activeStep)
     if(this.state.activeStep === this.getSteps().length){
      //console.log(this.state.activeStep)
      this.createClient()
    }
  }

   handleBack=()=> {
    this.setState({activeStep: this.state.activeStep - 1})
  }

  handleReset=()=> {
    this.setState({
        activeStep: 0,
        bio:{
            firstname: '',
            middlename: '',
            lastname: '',
            birthday: '',
        },
        contact: {
            postcode: '',
            email: '',
            telephone: '',
            address: '',
            region: '',
        },
        nextofkin:{
            nextofkin: '',
            nokemail: '',
            nokmobile: '',
        }
    })
  }
  
  render(){
    const steps = this.getSteps();
    const { classes } = this.props;

    return (
        <div >
          <Stepper activeStep={this.state.activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {this.state.activeStep === steps.length ? ( 
              <div>
                <Typography style={{margin: '0% 30%', display: {...this.state.hide}}} className={this.state.alert} align='center'>
                    {this.state.notification}
                </Typography>
                <Button onClick={this.handleReset} style={{margin: '0% 30%'}}>Reset</Button>
              </div>
            ) : (
              <div>
                <div className={classes.container}>{this.getStepContent(this.state.activeStep, classes)}</div>
                <div style={{margin: '0% 30%'}}>
                  <Button
                    disabled={this.state.activeStep === 0}
                    onClick={this.handleBack}
                    
                  >
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={this.handleNext} type='submit'>
                    {this.state.activeStep === steps.length - 1 ? 'Create User' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )
  }
}

export default withStyles(styles)(SupervisorAddClient)
