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
          // { title: 'First Name', field: 'name' },
          // { title: 'Last Name', field: 'surname' },
          { title: 'Address', field: 'address' },          
          { title: 'Postcode', field: 'postcode' },
          { title: 'Start', field: 'start', type: 'time' },
          { title: 'End', field: 'end', type: 'time' },
          { title: 'First Carer', field: 'carer1' },
          { title: 'Second Carer', field: 'carer2' },
          { title: 'Note', field: 'note' },
          { title: 'Alert', field: 'alert' }
        ],
        data: [
          // { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
          // { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
        ]
      }
    }

    async componentWillMount(){
        const ListSchedulesQuery = `
        query listSchedules{
          listSchedules{
            items{
              start
              end
              address
              postcode
              carer
              note
              alert
            }
          }
        }
        `

        await API.graphql(graphqlOperation(ListSchedulesQuery)).then((res)=>{
            const sche = res.data.listSchedules.items
            let schedules = []
            sche.map((item)=>{

                let schedule = {
                  address: item.address,
                  postcode: item.postcode,
                  start: item.start,
                  end: item.end,
                  carer1: item.carer[0],
                  carer2: item.carer[1],
                  note: item.note,
                  alert: item.alert
                }
                schedules.push(schedule)
            })

            this.setState({data: schedules})
            console.log(schedules)
        }).catch(e => console.log('Error: ', e))
    }
  
    render() {
      return (
        <MaterialTable
          title="Schedules"
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
                    data[index] = newData;
                    this.setState({ data }, () => resolve());
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
                    this.setState({ data }, () => resolve());
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
