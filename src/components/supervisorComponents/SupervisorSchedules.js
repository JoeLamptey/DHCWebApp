import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { TextField, List, ListItem, ListItemText, Divider, Select, MenuItem } from '@material-ui/core';

import ScheduleList from './ScheduleList'

import {API, graphqlOperation} from 'aws-amplify'
import awsmobile from '../../aws-exports'
API.configure(awsmobile)

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    textField:{
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '90%',
    },
    papersize:{
        maxHeight: 600, 
        overflow: 'auto',
    },
    scheduletext:{
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit*2,
        width: '70%'
    },
    button:{
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit*2,
        width: '70%'
    },
    clientname:{
        fontWeight: 1,
        paddingBottom: '0%',
        marginBottom: '0%',
        marginTop: "0%",
        paddingTop: '0%',
    },
    date:{
        marginTop: "0%",
        paddingTop: '0%',
        paddingBottom: '0%',
        marginBottom: '0%',
        fontSize: 12,
    }
  });


class SupervisorSchedules extends Component{
    constructor(props){
        super(props)
        this.state={
            client:{
                name: 'Schedule Client'
            },
            schedule: {},
            alert: 'alert',
            hide:'none',
            notification: '',
            Clients: [],
            Carers: [],
            searchClients: [],
            firstCarer: 'First Carer',
            secondCarer: 'Second Carer'
        }
    }

    createSchedule=async (schedule)=>{
        //console.log('to be created: ',e)
         //console.log(this.props)
  
        const createScheduleQuery = `
            mutation createSchedule {
                  createSchedule(input: {
                    date: "${schedule.date}",
                    start: "${schedule.start}",
                    end: "${schedule.end}",
                    client: "${schedule.client}",
                    carer: ["${schedule.carer1}","${schedule.carer2}"],
                    note: "${schedule.note}",
                    postcode: "${schedule.postcode}",
                    address: "${schedule.address}",
                    region: "${this.props.region}"
                  }) {
                        id
                        date
                        client
                        carer
                        start
                        end
                        region
                        address
                        postcode
                }
            }
          `
        await API.graphql(graphqlOperation(createScheduleQuery)).then(res =>{            
            const schedule = res.data.createSchedule
            //console.log(schedule)
            this.setState({schedule})
        }).catch(err => console.log('Error: ',err))
      }

    scheduleClient=(e)=>{
        e.preventDefault()

        if(this.state.client.name === 'Schedule Client'){
            this.setState({notification: ' Please select a client!', hide: 'block'})
        }else{
            let schedule ={
                date: e.target.date.value,
                start: e.target.starttime.value,
                end: e.target.endtime.value,
                client: this.state.client.name,
                carer1: e.target.carer1.value,
                carer2: e.target.carer2.value,
                note: e.target.note.value,
                address: this.state.client.address,
                postcode: this.state.client.postcode,                
            }
            this.setState({
                schedule,
                alert: 'success',
                notification: 'Schedule successful!',
                hide: 'block'
            })
            this.createSchedule(schedule)
            //console.log(schedule)
    
            e.target.date.value = ''
            e.target.starttime.value = ''
            e.target.endtime.value = ''
            e.target.carer1.value = ''
            e.target.carer2.value = ''
            e.target.note.value = ''
        }
        
    }

    setClient=(e)=>{
        
        const name = e.currentTarget.dataset.list_item
        let selected = this.state.Clients.filter((client)=>{
            let fullname = client.firstname+ ' '+client.lastname
            return fullname.match(name)
        })
        //console.log(selected)
        this.setState({
            client:{
                name: selected[0].firstname+ ' '+selected[0].lastname,
                address: selected[0].address,
                postcode: selected[0].postcode
            },
             notification: ''
        })
    }

    refresh=()=>{
       if(this.state.hide !== 'none'){this.setState({hide:'none'})}
    }

    async componentWillMount(){
        const listClientQuery = `
          query listClients {
              listClients(filter: {region:{ eq: "${this.props.region}"}}) {
              items {
                  id
                  firstname
                  lastname
                  address
                  postcode
                }
              }
          }
      `
      await API.graphql(graphqlOperation(listClientQuery)).then(res =>{            
          const Clients = res.data.listClients.items
          //console.log(Clients)
          this.setState({Clients, searchClients: Clients})
      }).catch(err => console.log('Error: ',err))

      const listCarerQuery = `
          query listCarers {
              listCarers(filter: {region:{ eq: "${this.props.region}"}}) {
              items {
                  id
                  firstname
                  lastname
                  address
                  postcode
                }
              }
          }
      `
      await API.graphql(graphqlOperation(listCarerQuery)).then(res =>{            
          const Carers = res.data.listCarers.items
          //console.log(Carers)
          this.setState({Carers})
      }).catch(err => console.log('Error: ',err))
    }

    search=(e)=>{
        let info = e.target.value
       let searchClients = this.state.Clients.filter((client)=>{
            return (client.firstname.toLowerCase().match(info)||client.lastname.toLowerCase().match(info))
        })
        //console.log(searchClients)
        this.setState({searchClients})
    }

    firstCarer=(e)=>{
        this.setState({firstCarer: e.target.value})
        this.refresh()
    }

    secondCarer=(e)=>{
        this.setState({secondCarer: e.target.value})
        this.refresh()
    }

    render(){ 
        const { classes } = this.props;
        const date = Date().substring(0,15)
        
        return(
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item  xs={3}>
                        <Paper className={classes.paper}>
                            <TextField onChange={this.search}
                                className={classes.textField}
                                variant='standard'
                                label='search'
                                name='search'
                                type='search'
                            ></TextField>                            
                            <List component='nav' className={classes.papersize}>
                                {
                                    this.state.searchClients.map((client, index)=>{
                                        return (<ListItem button key={index} onClick={this.setClient} data-list_item={client.firstname+ ' '+ client.lastname}>
                                            <ListItemText>{client.firstname+ ' '+ client.lastname}</ListItemText>
                                        </ListItem>)
                                    })
                                }
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <div>
                                <h2 className={classes.clientname}>
                                    {this.state.client.name}
                                </h2>
                                <div className={classes.date}>{date}</div>
                            </div>
                            <Divider />
                            <form onSubmit={this.scheduleClient}>
                                <TextField onChange={this.refresh}
                                    className={classes.scheduletext}
                                    label='Date'
                                    type='date'
                                    InputLabelProps={{ shrink: true }}
                                    variant="standard"
                                    name='date'
                                    required
                                />
                                <TextField onChange={this.refresh}
                                    className={classes.scheduletext}
                                    label='Start Time'
                                    type='time'
                                    InputLabelProps={{ shrink: true }}
                                    variant="standard"
                                    name='starttime'
                                    required
                                />
                                <TextField onChange={this.refresh}
                                    className={classes.scheduletext}
                                    label='End Time'
                                    type='time'
                                    InputLabelProps={{ shrink: true }}
                                    variant="standard"
                                    name='endtime'
                                    required
                                />
                                <Select onChange={this.firstCarer}
                                    className={classes.scheduletext}
                                    variant='standard'
                                    name='carer1'
                                    required
                                    value={this.state.firstCarer}>
                                        {this.state.Carers.map((carer, index)=>{
                                            return <MenuItem value={carer.firstname +' '+carer.lastname} key={index}>
                                                {carer.firstname +' '+carer.lastname}
                                            </MenuItem>
                                        })}
                                </Select>
                                <Select onChange={this.secondCarer}
                                    className={classes.scheduletext}
                                    variant='standard'
                                    name='carer2'
                                    value={this.state.secondCarer}>
                                        {this.state.Carers.map((carer, index)=>{
                                            return <MenuItem value={carer.firstname +' '+carer.lastname} key={index}>
                                                {carer.firstname +' '+carer.lastname}
                                            </MenuItem>
                                        })}
                                </Select>
                                {/* <TextField onChange={this.refresh}
                                    className={classes.scheduletext}
                                    label='Carer 1'
                                    type='select'
                                    required
                                    name='carer1'
                                />
                                <TextField onChange={this.refresh}
                                    className={classes.scheduletext}
                                    label='Carer 2'
                                    type='select'                                    
                                    name='carer2'
                                /> */}
                                <TextField onChange={this.refresh}
                                    className={classes.scheduletext}
                                    label='Note'
                                    type='text'                                    
                                    name='note'
                                />
                                <Button 
                                    className={classes.button}
                                    type='submit' 
                                    variant='contained'
                                    fullWidth 
                                    color='primary'>
                                        Create Schedule
                                </Button>
                            </form>
                            <div align='center' className={this.state.alert} style={{display: this.state.hide}}>
                                {this.state.notification}
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={5}>
                        <Paper className={classes.paper}>
                            
                            <ScheduleList
                                user={this.props}
                                refresh={this.refresh} 
                                update={{name: this.state.client.name,
                                    ...this.state.schedule}}/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

SupervisorSchedules.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(SupervisorSchedules)