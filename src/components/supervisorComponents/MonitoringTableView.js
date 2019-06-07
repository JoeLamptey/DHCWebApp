import React, {Component} from 'react'
import MaterialTable from 'material-table'

import {API, graphqlOperation} from 'aws-amplify'
import awsmobile from '../../aws-exports'
API.configure(awsmobile)

class MonitoringTabularView extends Component {
    constructor(props) {
      super(props);
      this.state = {
        columns: [
          { title: 'Date', field: 'date' },
          { title: 'Start', field: 'start'},
          { title: 'End', field: 'end' },
          { title: 'First Carer', field: 'carer1' },
          { title: 'Second Carer', field: 'carer2' },
          { title: 'Note', field: 'note' },
          { title: 'Address', field: 'address' },          
          { title: 'Postcode', field: 'postcode' },
        ],
        data: [],
        update: [],
        deleted: []
      }
    }

    async componentWillMount(){ //console.log(this.props)
        const ListSchedulesQuery = `
        query listSchedules{
          listSchedules(filter: {region:{ eq: "${this.props.user.region}"}}){
            items{
              id
              client
              start
              end
              address
              postcode
              carer
              note
              alert
              date
              region
            }
          }
        }
        `

        await API.graphql(graphqlOperation(ListSchedulesQuery)).then((res)=>{
            let schedules = res.data.listSchedules.items
            let newSchedules = schedules.map(schedule=>{ //console.log(schedule)
                  schedule = {...schedule, carer1:schedule.carer[0], carer2:schedule.carer[1]}
                  delete schedule.carer
                  return schedule
                })
            this.setState({data: newSchedules})
        }).catch(e => console.log('Error: ', e))
    }
  
    create=async ()=>{
      //console.log('to be created: ',e)
      // console.log(this.state.create)

      // const createCarerQuery = `
      //     mutation createCarer {
      //           createCarer(input: {
      //             firstname: "${this.state.create.firstname}",
      //             lastname: "${this.state.create.lastname}",
      //             mobile: "${this.state.create.mobile}",
      //             postcode: "${this.state.create.postcode}",
      //             email: "${this.state.create.email}",
      //             address: "${this.state.create.address}",
      //             birthday: "${this.state.create.birthday}",
      //             nextofkin: "${this.state.create.nextofkin}",
      //             nok_mobile: "${this.state.create.nok_mobile}",
      //             nok_email: "${this.state.create.nok_email}",
      //             region: "${this.state.create.region}",
      //           }) {
      //                 id
      //                 firstname
      //                 lastname
      //                 mobile
      //                 region
      //         }
      //     }
      //   `
      // await API.graphql(graphqlOperation(createCarerQuery)).then(res =>{            
      //     const create = res.data.createCarer
      //     this.setState({create})
      // }).catch(err => console.log('Error: ',err))
    }
    
    delete=async ()=>{
      
      console.log('to be deleted: ',this.state.deleted.id)

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
          console.log('Deleted: ', this.state.deleted)
      }).catch(err => console.log('Error: ',err))

    }

    update= async ()=>{ 

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
              address: "${this.state.updated.address}",
              postcode: "${this.state.updated.postcode}",
              region: "${this.props.user.region}",
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
      return (
        <MaterialTable
          title={this.props.user.region +" Schedules"}
          columns={this.state.columns}
          data={this.state.data}
          editable={{
            // onRowAdd: newData =>
            //   new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //       {
            //         const data = this.state.data;
            //         data.push(newData);
            //         this.setState({ data }, () => resolve());
            //       }
            //       resolve()
            //     }, 1000)
            //   }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const data = this.state.data;
                    const index = data.indexOf(oldData);
                    data[index] = newData; 
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

export default MonitoringTabularView;
