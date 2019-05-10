import React, {Component} from 'react'

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
    }
  });


class SupervisorSchedules extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item  xs>
                        <Paper className={classes.paper}>
                            <TextField
                                className={classes.textField}
                                variant='standard'
                                label='search'
                                name='search'
                                type='search'
                            ></TextField>
                        
                            {/* <Divider /> */}
                            <List component='nav'>
                                <ListItem button>
                                    <ListItemText>First Client</ListItemText>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText>Second Client</ListItemText>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText>Third Client</ListItemText>
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>Schedules here</Paper>
                    </Grid>
                    <Grid item xs>
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