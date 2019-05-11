import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { TextField, List, ListItem, ListItemText } from '@material-ui/core';

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
    }
  });


class SupervisorSchedules extends Component{
    constructor(props){
        super(props)
        this.state={
            client:{
                name: 'Schedule Client'
            }
        }
    }

    scheduleClient=(e)=>{
        console.log(e.target.innerHTML)
    }

    setClient=(e)=>{
        //console.log(e.target.innerHTML)
        const name = e.target.innerHTML
        this.setState({client:{name}})
    }

    render(){
        const { classes } = this.props;
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
                                <ListItem button onClick={this.setClient}>
                                    <ListItemText>Enid Wayman</ListItemText>
                                </ListItem>
                                <ListItem button onClick={this.setClient}>
                                    <ListItemText>Oliver Abott</ListItemText>
                                </ListItem>
                                <ListItem button onClick={this.setClient}>
                                    <ListItemText>Roy Finch</ListItemText>
                                </ListItem>
                                <ListItem button onClick={this.setClient}>
                                    <ListItemText>John Studge</ListItemText>
                                </ListItem>
                                <ListItem button onClick={this.setClient}>
                                    <ListItemText>Michael Sally</ListItemText>
                                </ListItem>
                                <ListItem button onClick={this.setClient}>
                                    <ListItemText>Daniel Dubios</ListItemText>
                                </ListItem>
                                <ListItem button onClick={this.setClient}>
                                    <ListItemText>Ahmed Sawyer</ListItemText>
                                </ListItem>
                                <ListItem button onClick={this.setClient}>
                                    <ListItemText>Will Gashi</ListItemText>
                                </ListItem>
                                <ListItem button onClick={this.setClient}>
                                    <ListItemText>Ben Jameson</ListItemText>
                                </ListItem>
                                <ListItem button onClick={this.setClient}>
                                    <ListItemText>Lily Ashvelay</ListItemText>
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={5}>
                        <Paper className={classes.paper}>
                            <h2>{this.state.client.name}</h2>
                            <form onSubmit={this.scheduleClient}>
                                <TextField 
                                    className={classes.scheduletext}
                                    label='Start Time'
                                    type='time'
                                    InputLabelProps={{ shrink: true }}
                                    variant="standard"
                                />
                                <TextField 
                                    className={classes.scheduletext}
                                    label='End Time'
                                    type='time'
                                    InputLabelProps={{ shrink: true }}
                                    variant="standard"
                                />
                                <TextField 
                                    className={classes.scheduletext}
                                    label='Carer 1'
                                    type='select'
                                    required
                                />
                                <TextField 
                                    className={classes.scheduletext}
                                    label='Carer 2'
                                    type='select'
                                    required
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
                            
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>results</Paper>
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