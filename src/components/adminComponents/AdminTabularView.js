import React, {Component} from 'react'
import MaterialTable from 'material-table'

import {API, graphqlOperation} from 'aws-amplify'
import awsmobile from '../../aws-exports'
API.configure(awsmobile)

class AdminTabularView extends Component {
    constructor(props) {
      super(props);
      this.state = {
        columns: [
          { title: 'Client', field: 'client' },
          { title: 'Start', field: 'start', type: 'time' },
          { title: 'End', field: 'end', type: 'time' },
          { title: 'First Carer', field: 'carer[0]' },
          { title: 'Second Carer', field: 'carer[1]' },
          { title: 'Note', field: 'note' },
          { title: 'Alert', field: 'alert' },
          { title: 'Address', field: 'address' },          
          { title: 'Postcode', field: 'postcode' },
          { title: 'Region', field: 'region' },
          
        ],
        data: [],
        update: [],
        deleted: []
      }
    }

    async componentWillMount(){ //(filter: {region:{ eq: "${this.props.user.region}"}})
        const ListSchedulesQuery = `
        query listSchedules{
          listSchedules{
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
              region
            }
          }
        }
        `

        await API.graphql(graphqlOperation(ListSchedulesQuery)).then((res)=>{
            const schedules = res.data.listSchedules.items

            this.setState({data: schedules})
            //console.log(sche)
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

    update= async ()=>{ //console.log(this.state.updated)
      

      const updateScheduleQuery = `
      mutation updateSchedule {
            updateSchedule(input: {
              id: "${this.state.updated.id}",
              client: "${this.state.updated.client}",
              start: "${this.state.updated.start}",
              end: "${this.state.updated.end}",
              date: "${this.state.updated.date}",
              carer: ["${this.state.updated.carer[0]}","${this.state.updated.carer[1]}"],
              note: "${this.state.updated.note}",
              address: "${this.state.updated.address}",
              postcode: "${this.state.updated.postcode}",
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
      return (
        <MaterialTable
          title="Schedules"
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

export default AdminTabularView;
