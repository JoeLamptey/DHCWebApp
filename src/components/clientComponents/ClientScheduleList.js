import React,{Component} from 'react';
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

class ClientScheduleList extends Component {
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
              listSchedules(filter: {client:{contains: "${this.props.firstname + ' '+this.props.lastname}"}}){
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
      

      getSchedule= async (id)=>{
        this.id = id
        const newSchedule=`
            query getSchedule{
              getSchedule(id: "${this.id}"){
                  id
                  start
                  end
                  date
                  client
                  carer
                  postcode
                  address
                  note
              }
            }
        `
        await API.graphql(graphqlOperation(newSchedule)).then(res =>{   
            let schedule = res.data.getSchedule
              this.setState({Schedules: [schedule, ...this.state.Schedules]})
            
        }).catch(err => console.log('Error: ',err))
      }

      getUpdateSchedule= async (id)=>{
        this.id = id
        const newSchedule=`
            query getSchedule{
              getSchedule(id: "${this.id}"){
                  id
                  start
                  end
                  date
                  client
                  carer
                  postcode
                  address
                  note
              }
            }
        `
        await API.graphql(graphqlOperation(newSchedule)).then(res =>{   
            let schedule = res.data.getSchedule
            let newSchedule =  this.state.Schedules.map(item=>{
                if(item.id === schedule.id){
                   item = schedule
                }
                return item
            })
            this.setState({Schedules: newSchedule})
        }).catch(err => console.log('Error: ',err))
      }


     async componentDidMount(){
          const onCreateSchedule = `
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
            await API.graphql(graphqlOperation(onCreateSchedule)).subscribe(res =>{   
              let schedule = res.value.data.onCreateSchedule
              //console.log(schedule)
              this.getSchedule(schedule.id)
          })

        const onUpdateSchedule = `
            subscription onUpdateSchedule{
              onUpdateSchedule{
                    id
              }
            }
            `
          await API.graphql(graphqlOperation(onUpdateSchedule)).subscribe(res =>{ 
            //console.log(res)           
            let schedule = res.value.data.onUpdateSchedule
            this.getUpdateSchedule(schedule.id)
        })

        const onDeleteSchedule = `
            subscription onDeleteSchedule{
              onDeleteSchedule{
                    id
                    client
                   
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
                            <Typography className={classes.heading}> {item.date}</Typography>
                            <Typography className={classes.secondaryHeading}>{'['+item.start+', '+ item.end+']     -   '+item.carer[0]+' and '+item.carer[1]}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>                  
                                {'  '+item.note+'.  '}
                                {'  '+(item.alert)?item.alert: null+'.   '}
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>)
                })
            }   
          </div>
        );
      }
    }

export default withStyles(styles)(ClientScheduleList);