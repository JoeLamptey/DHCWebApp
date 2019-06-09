import React,{Component} from 'react';
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
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button:{
      marginTop: theme.spacing.unit,
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

class CarerScheduleList extends Component {
    state = {
        expanded: null,
          
        Schedules: [],
        loaded: false
      };
    
      handleChange = panel => (event, expanded) => {
        this.setState({
          expanded: expanded ? panel : false,
        });
      };
    
      async componentWillMount(){ //console.log(this.props)
        const listScheduleQuery = `
            query listSchedules {
              listSchedules(filter: {carer:{contains: "${this.props.firstname + ' '+this.props.lastname}"}}){
                items{
                  id
                  client
                  address
                  postcode
                  date
                  carer
                  date
                  start
                  end
                  note
                }
              }
            }
        `
        await API.graphql(graphqlOperation(listScheduleQuery)).then(res =>{            
           let Schedules = res.data.listSchedules.items
            this.setState({Schedules, loaded: true})
        }).catch(err => console.log('Error: ',err))
      }
      
     async componentDidMount(){
          const onSubSchedule = `
            subscription subCreateSchedule{
              onCreateSchedule{
                      id
                      client
                      address
                      postcode
                      date
                      carer
                      start
                      end
                      note
              }
            }
            `
          await API.graphql(graphqlOperation(onSubSchedule)).subscribe(res =>{   
            let schedule = res.value.data.onCreateSchedule
            //console.log(schedule )
            this.setState({Schedules: [schedule, ...this.state.Schedules]}) //console.log(this.state.Schedules) 
        })

        const onUpdateSchedule = `
            subscription onUpdateSchedule{
              onUpdateSchedule{
                    id
                    client
                    date
                    carer
                    start
                    end
              }
            }
            `
          await API.graphql(graphqlOperation(onUpdateSchedule)).subscribe(res =>{ 
            //console.log(res)           
            let schedule = res.value.data.onUpdateSchedule
            //console.log(schedule) 
            let updateSch = this.state.Schedules.filter((sched)=>{
                if(sched.id === schedule.id){
                      sched.carer = schedule.carer
                      sched.client = schedule.client
                      sched.start = schedule.start
                      sched.end = schedule.end
                      return sched
                }
                return sched
            })
            //console.log(updateSch)
            this.setState({Schedules: [...updateSch]})
        })

        const onDeleteSchedule = `
            subscription onDeleteSchedule{
              onDeleteSchedule{
                    id
                    client
                    address
                    postcode
                    date
                    carer
                    date
                    start
                    end
                    note
                    region
              }
            }
            `
          await API.graphql(graphqlOperation(onDeleteSchedule)).subscribe(res =>{ 
            //console.log(res)           
            let schedule = res.value.data.onDeleteSchedule            
            let newSchedules = this.state.Schedules.filter((sched)=>{
                return sched.id !== schedule.id
            })
            this.setState({Schedules: [...newSchedules]})
        })
      }

      render() {
        const { classes } = this.props;
        const { expanded } = this.state;
    
        return (this.state.loaded &&
          <div className={classes.root}>
            {
                this.state.Schedules.map((item, index)=>{
                   return (<ExpansionPanel expanded={expanded === 'panel'+index} key={index} onChange={this.handleChange('panel'+index)}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}> {item.client}</Typography>
                            <Typography className={classes.secondaryHeading}>{item.date+',      ['+item.start+', '+ item.end+']       -   '+item.address}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                {item.carer[0]+ ', and    '+ item.carer[1]+', '}                                
                                {'  '+item.note+'.   '}
                                {'  '+item.postcode+',  '}
                                {'  '+item.address+'.  '}
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>)
                })
            }   
          </div>
        );
      }
    }

export default withStyles(styles)(CarerScheduleList)
