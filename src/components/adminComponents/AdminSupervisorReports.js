import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {API, graphqlOperation} from 'aws-amplify'
import awsmobile from '../../aws-exports'
API.configure(awsmobile)

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});



class AdminSupervisorReports extends React.Component {
  state = {
    expanded: null,
    
    reports: [],
    error: '',
    loaded: false
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

 async componentWillMount(){
    const listReportQuery = `
        query listReports {
            listReports(filter: {report_type:{ eq: "Complaint"}}) {
              items {
                  id
                  title
                  recipient
                  sender
                  description
              }
            }
        }
    `
    await API.graphql(graphqlOperation(listReportQuery)).then(res =>{            
        const reports = res.data.listReports.items
        this.setState({reports, loaded: true})
    }).catch(err => console.log('Error: ',err))
    
  }

  componentWillUpdate(){

  }

  render() {
        const { classes } = this.props;
        const { expanded,loaded } = this.state;

        return( loaded &&
        <div className={classes.root}>
            {
                this.state.reports.map((item, index)=>{
                   return (<ExpansionPanel expanded={expanded === 'panel'+index} key={index} onChange={this.handleChange('panel'+index)}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>To: {item.recipient}</Typography>
                            <Typography className={classes.secondaryHeading}>{item.title}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                {item.description}
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>)
                })
            }                        
        </div> 
        )
      }
}

// AdminSupervisorReports.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(AdminSupervisorReports);
