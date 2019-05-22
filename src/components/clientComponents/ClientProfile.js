import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

class CarerProfile extends Component{
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
                            Profile page
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

export default withStyles(styles)(CarerProfile)