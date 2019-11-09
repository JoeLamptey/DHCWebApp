import React, {Component} from 'react'
import MaterialTable from 'material-table'

import {API, graphqlOperation} from 'aws-amplify'
import awsmobile from '../../aws-exports'
API.configure(awsmobile)

class ScheduleList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        columns: [
          { title: 'Client', field: 'client' },
          { title: 'Date', field: 'date' },
          { title: 'Start', field: 'start'},
          { title: 'End', field: 'end'},
          { title: 'First Carer', field: 'carer1' },
          { title: 'Second Carer', field: 'carer2'},
          { title: 'Note', field: 'note'},
        ],
        data: [],
        status: 'no update',
        Schedules: [],
        region:this.props.user.region,
        update: [],
        deleted: []
      }
    }
  
    // refresh=()=>{this.setState({status: 'updated!'})}
    
    componentDidUpdate( prevProps,prevState){
        // const info = prevProps.update
        
        // if(info.name !== 'Schedule Client' && info.date !== undefined
        //     && info.start !== undefined && info.end !==undefined && info.carer1 !==undefined){
        //     const data = prevState.data;
        //     data.push(info);           
        //     prevProps = ''
        // }
        
    }

    componentWillMount(){  //(filter: {region:{ eq: "${this.props.region}"}})
      this.listSchedule()
    }

    listSchedule = async ()=>{
      const listScheduleQuery = `
            query listSchedules {
                listSchedules(filter: {region:{ eq: "${this.props.user.region}"}}) {
                  items {
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
            }
        `
        await API.graphql(graphqlOperation(listScheduleQuery)).then(res =>{            
          const schedules = res.data.listSchedules.items
          let newSchedules = schedules.map(schedule=>{ //console.log(schedule)
            schedule = {...schedule, carer1:schedule.carer[0], carer2:schedule.carer[1]}
            delete schedule.carer
            return schedule
          })
      this.setState({data: newSchedules})
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
          let newSchedule = {...schedule, carer1: schedule.carer[0], carer2: schedule.carer[1]}
          delete newSchedule.carer
          //if(schedule.source === 'supervisor'){
            this.setState({data: [newSchedule, ...this.state.data]})
          //}
      }).catch(err => console.log('Error: ',err))
    }

   async componentDidMount(){
      const onCreateSchedule = `
          subscription onCreateSchedule{
            onCreateSchedule{
                id
                start
                end
            }
          }
          `
        await API.graphql(graphqlOperation(onCreateSchedule)).subscribe(res =>{   
            let schedule = res.value.data.onCreateSchedule
            //console.log(schedule)
            this.getSchedule(schedule.id)
        })

        const onDeleteSchedule = `
          subscription onDeleteSchedule{
            onDeleteSchedule{
              id
              start
              end
              postcode
            }
          }
        `
        await API.graphql(graphqlOperation(onDeleteSchedule)).subscribe(() =>{
          // let schedule = res.value.data.onDeleteSchedule
          this.listSchedule() 
          // console.log(schedule)
        })
   }
    
    delete=async ()=>{
      
      //console.log('to be deleted: ',this.state.deleted)

      const deleteScheduleQuery = `
      mutation deleteSchedule {
            deleteSchedule(input: {id: "${this.state.deleted.id}"}) {
                  id
                  client
                  start
                  end
                  carer
              }
          }
      `
      await API.graphql(graphqlOperation(deleteScheduleQuery)).then(res =>{            
          const deleted = res.data.deleteSchedule
          this.setState({deleted})
      }).catch(err => console.log('Error: ',err))

    }

    update= async ()=>{ //console.log(this.state.updated)
      

      const updateScheduleQuery = `
      mutation updateSchedule {
            updateSchedule(input: {
              id: "${this.state.updated.id}",
              client: "${this.state.updated.client}",
              start: "${this.state.updated.start}",
              end: "${this.state.updated.end}",
              date: "${this.state.updated.date}",
              carer: ["${this.state.updated.carer1}","${this.state.updated.carer2}"],
              note: "${this.state.updated.note}",
              region: "${this.state.region}",
            }) {
                  id
                  client
                  start
                  end
                  carer
                  region
              }
          }
      `
      await API.graphql(graphqlOperation(updateScheduleQuery)).then(res =>{            
          const updated = res.data.updateSchedule
          //console.log(updated)
          this.setState({updated})
      }).catch(err => console.log('Error: ',err))
    }

    render() {        
      //console.log(this.props.user)
      return (
        <MaterialTable
          title={this.state.region+" Schedules"}
          columns={this.state.columns}
          data={this.state.data}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const data = this.state.data;
                    data.push(newData);
                    this.setState({ data }, () => resolve());
                  }
                  resolve()
                }, 1000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const data = this.state.data;
                    const index = data.indexOf(oldData);
                    data[index] = newData; //console.log(newData)
                    this.setState({ data, updated: newData }, () => resolve());
                    this.update()
                  }
                  resolve()
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    let data = this.state.data;
                    const index = data.indexOf(oldData);
                    data.splice(index, 1); 
                    this.setState({ data , deleted: oldData}, () => resolve());
                    this.delete()
                  }
                  resolve()
                }, 1000)
              }),
          }}
        />
      )
    }
  }

export default ScheduleList;
