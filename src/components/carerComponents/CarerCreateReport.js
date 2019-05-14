import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
//import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { TextField, Select, MenuItem, Divider, InputLabel ,FormControl} from '@material-ui/core';

import {API, graphqlOperation} from 'aws-amplify'
import awsmobile from '../../aws-exports'
API.configure(awsmobile)

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
        marginRight: '10%',
        marginBottom: '3%',
        width: '80%',

    },
    description:{
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: '5%',
        marginTop: '2%',
        width: '90%',
    },
    select:{
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: '0%',
        width: '80%',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: '100%',
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
            report: {},
            recipient: 'Supervisor',
            report_type: 'Incident',
            title: '',
            description: ''
        }
    }
    title=(e)=>{
        this.setState({title: e.target.value})
    }

    recipient=(e)=>{
        this.setState({recipient: e.target.value})
    }

    reportType=(e)=>{
        this.setState({report_type: e.target.value})
    }

    description=(e)=>{
        this.setState({description: e.target.value})
    }

    report=(e)=>{
        e.preventDefault()
        const report = {
            title: this.state.title,
            report_type: this.state.report_type,
            recipient: this.state.recipient,
            description: this.state.description
        }

         //this.setState({report})
         e.target.title.value = ''
         e.target.description.value = ''

        //  const createReportQuery = `mutation myReport{
        //      createDHCReports(input: {
        //             title: "${report.title}",
        //             report_type: "${report.report_type}",
        //             recipient: "${report.recipient}",
        //             description: "${report.description}"
        //     }){
        //          id
        //          title
        //          report_type
        //          recipient
        //          description
        //      }
        //  }`

        const createReportQuery = `mutation report{
            createReport(input: {
                title: "${report.title}",
                recipient: "${report.recipient}",
                description: "${report.description}",
                sender: "carer"
            }){
                id
                title
                description
                sender
            }

        }`

         API.graphql(graphqlOperation(createReportQuery)).then((res) =>{
            //console.log(res.data.createDHCReports.items) 
            const reportdb = res.data.createReport
            this.setState({report: reportdb}) 
            console.log(reportdb)        
         }).catch(err => console.log(err))
        
    }

    render(){
        const {classes} = this.props
        return(
            <div>
               <Grid container spacing={24}>
                    <Grid item  xs={12}>
                        <Paper className={classes.paper}>
                        <form className={classes.form} onSubmit={this.report}>
                                <TextField onChange={this.title}
                                    className={classes.title}
                                    variant='standard'
                                    label='Tile'
                                    name='title'
                                    type='text'
                                    required
                                />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="type-of-report">Report Type</InputLabel>
                                    <Select onChange={this.reportType}
                                        className={classes.select}
                                        variant='standard'
                                        inputProps={{ id: 'type-of-report', name: 'report_type', required: true}}
                                        value={this.state.report_type}>
                                            <MenuItem value='Incident'>Incident</MenuItem>
                                            <MenuItem value='Complaint'>Complaint</MenuItem>
                                            <MenuItem value='Safegaurd'>Safeguard Issue</MenuItem>
                                            <MenuItem value='Medication'>Medication Error</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="recipient">Report Recipient</InputLabel>
                                    <Select onChange={this.recipient}
                                        className={classes.select}
                                        variant='standard'
                                        inputProps={{ id: 'recipient',name: 'recipient', required: true}}
                                        value={this.state.recipient}>
                                            <MenuItem value='Manager'>Manager</MenuItem>
                                            <MenuItem value='Supervisor'>Supervisor</MenuItem>
                                            <MenuItem value='Carer'>Carer</MenuItem>
                                            <MenuItem value='Admin'>Admin</MenuItem>
                                    </Select>
                                </FormControl>                                
                                <TextField onChange={this.description}
                                    className={classes.description}
                                    variant='outlined'
                                    label='Description'
                                    name='description'
                                    multiline
                                    rows={5}
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