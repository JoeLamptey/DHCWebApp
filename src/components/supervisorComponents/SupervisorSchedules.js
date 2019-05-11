import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { TextField, List, ListItem, ListItemText, Divider } from '@material-ui/core';

import ScheduleList from './ScheduleList'

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
            notification: ''
        }
    }

    scheduleClient=(e)=>{
        e.preventDefault()

        if(this.state.client.name === 'Schedule Client'){
            this.setState({notification: ' Please select a client!'})
        }else{
            let schedule ={
                date: e.target.date.value,
                start: e.target.starttime.value,
                end: e.target.endtime.value,
                carer1: e.target.carer1.value,
                carer2: e.target.carer2.value
            }
            this.setState({schedule, notification: 'Schedule successful!'})
            //console.log(schedule)
    
            e.target.date.value = ''
            e.target.starttime.value = ''
            e.target.endtime.value = ''
            e.target.carer1.value = ''
            e.target.carer2.value = ''
        }
        
    }

    setClient=(e)=>{
        
        const name = e.currentTarget.dataset.list_item
        //console.log(name)
        this.setState({client:{name}, notification: ''})
    }


    render(){
        const { classes } = this.props;
        const date = Date().substring(0,15)
        
        return(
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item  xs={3}>
                        <Paper className={classes.paper}>
                            <TextField
                                className={classes.textField}
                                variant='standard'
                                label='search'
                                name='search'
                                type='search'
                            ></TextField>
                            <List component='nav' className={classes.papersize}>
                                <ListItem button onClick={this.setClient} data-list_item={"Enid Wayman"}>
                                    <ListItemText>Enid Wayman</ListItemText>
                                </ListItem>
                                <ListItem button onClick={this.setClient} data-list_item={"Oliver Abott"}>
                                    <ListItemText>Oliver Abott</ListItemText>
                                </ListItem>
                                <ListItem button onClick={this.setClient} data-list_item={'Roy Finch'}>
                                    <ListItemText>Roy Finch</ListItemText>
                                </ListItem>
                                <ListItem button onClick={this.setClient} data-list_item={'John Studge'}>
                                    <ListItemText>John Studge</ListItemText>
                                </ListItem>
                                <ListItem button onClick={this.setClient} data-list_item={'Michael Sally'}>
                                    <ListItemText>Michael Sally</ListItemText>
                                </ListItem>
                                <ListItem button onClick={this.setClient} data-list_item={'Daniel Dubios'}>
                                    <ListItemText>Daniel Dubios</ListItemText>
                                </ListItem>
                                <ListItem button onClick={this.setClient} data-list_item={'Ahmed Sawyer'}>
                                    <ListItemText>Ahmed Sawyer</ListItemText>
                                </ListItem>
                                <ListItem button onClick={this.setClient} data-list_item={'Will Gashi'}>
                                    <ListItemText>Will Gashi</ListItemText>
                                </ListItem>
                                <ListItem button onClick={this.setClient} data-list_item={'Ben Jameson'}>
                                    <ListItemText>Ben Jameson</ListItemText>
                                </ListItem>
                                <ListItem button onClick={this.setClient} data-list_item={'Lily Ashvelay'}>
                                    <ListItemText>Lily Ashvelay</ListItemText>
                                </ListItem>
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
                                <TextField 
                                    className={classes.scheduletext}
                                    label='Date'
                                    type='date'
                                    InputLabelProps={{ shrink: true }}
                                    variant="standard"
                                    name='date'
                                />
                                <TextField 
                                    className={classes.scheduletext}
                                    label='Start Time'
                                    type='time'
                                    InputLabelProps={{ shrink: true }}
                                    variant="standard"
                                    name='starttime'
                                />
                                <TextField 
                                    className={classes.scheduletext}
                                    label='End Time'
                                    type='time'
                                    InputLabelProps={{ shrink: true }}
                                    variant="standard"
                                    name='endtime'
                                />
                                <TextField 
                                    className={classes.scheduletext}
                                    label='Carer 1'
                                    type='select'
                                    required
                                    name='carer1'
                                />
                                <TextField 
                                    className={classes.scheduletext}
                                    label='Carer 2'
                                    type='select'
                                    required
                                    name='carer2'
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
                            <div align='center' className='alert'>{this.state.notification}</div>
                        </Paper>
                    </Grid>
                    <Grid item xs={5}>
                        <Paper className={classes.paper}>
                            
                            <ScheduleList 
                                update={{name: this.state.client.name,
                                    schedule: this.state.schedule}}/>
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