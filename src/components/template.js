import React, {Component} from 'react'
//import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
//import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { TextField, List, ListItem, ListItemText, Divider } from '@material-ui/core';

const styles = theme =>({
    paper:{
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    textField:{
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '90%',
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
                    <Grid item  xs={4}>
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
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item  xs={8}>
                        <Paper className={classes.paper}>
                            <TextField
                                className={classes.textField}
                                variant='standard'
                                label='search'
                                name='search'
                                type='search'
                            ></TextField>
                            <Divider />
                            {/* <Button /> */}
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



address: "West Manchester"
birthday: "1968-01-08"
email: "jery@gmail.com"
firstname: "Jerry"
lastname: "Lawson"
mobile: "(+44) 639-258-6543"
nextofkin: "Fiaz"
nok_email: "fiaz@gmail.com"
nok_mobile: "(+44) 321-852-6547"
postcode: "HE8 IH0"
region: "Manchester"

