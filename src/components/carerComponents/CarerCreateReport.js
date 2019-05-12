import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
//import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { TextField, Select, MenuItem, Divider } from '@material-ui/core';

const styles = theme =>({
    form: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    paper:{
      padding: theme.spacing.unit,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    title:{
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: '5%',
        width: '60%',
    },
    description:{
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: '5%',
        width: '90%',
    },
    select:{
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: '5%',
        width: '60%',
    },
    button:{
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    }
})

class CarerCreateReport extends Component{
    constructor(props){
        super(props)

        this.state={
            report: ''
        }
    }

    render(){
        const {classes} = this.props
        return(
            <div>
               <Grid container spacing={24}>
                    <Grid item  xs={12}>
                        <Paper className={classes.paper}>
                            <form className={classes.form}>
                                <TextField
                                    className={classes.title}
                                    variant='standard'
                                    label='Tile'
                                    name='title'
                                    type='text'
                                    required
                                />
                                <Select
                                    className={classes.select}
                                    variant='standard'
                                    label='Select'
                                    name='type'
                                    type='select'
                                    required
                                    value='Incident'>
                                        <MenuItem>Incident</MenuItem>
                                        <MenuItem>Complaints</MenuItem>
                                        <MenuItem>Accident</MenuItem>
                                </Select>
                                <Select
                                    className={classes.select}
                                    variant='standard'
                                    label='Select'
                                    name='type'
                                    required
                                    type='select'
                                    value='Supervisor'>
                                        <MenuItem value=''>Manager</MenuItem>
                                        <MenuItem value=''>Supervisor</MenuItem>
                                        <MenuItem value=''>Admin</MenuItem>
                                </Select>
                                <TextField
                                    className={classes.description}
                                    variant='outlined'
                                    label='Description'
                                    name='description'
                                    type='text'
                                    multiline
                                    required
                                />
                                <Divider light variant='middle'/>
                                <Button 
                                    className={classes.button}
                                    type='submit'
                                    variant='contained'
                                    color='primary'>
                                    Create Report
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
               </Grid>
            </div>
        )
    }
}

// CarerReport.propTypes = {
//     classes: PropTypes.object.isRequired,
//   };

export default withStyles(styles)(CarerCreateReport)