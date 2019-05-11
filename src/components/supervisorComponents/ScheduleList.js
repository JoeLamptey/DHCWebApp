import React, {Component} from 'react'
import MaterialTable from 'material-table'

class ScheduleList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        columns: [
          { title: 'Name', field: 'name' },
          { title: 'Date', field: 'date' },
          { title: 'Start', field: 'start', type: 'time' },
          { title: 'End', field: 'end', type: 'time' },
          { title: 'Carer 1', field: 'carer1' },
          { title: 'Carer 2', field: 'carer2'},
        ],
        data: [
          { name: 'Mehmet Baran', date: '11/05/2019', start: '8:00:00', end: '8:30:00', carer1: 'Ivy Anna', carer2: 'Bernice Fisher'},
          { name: 'Mehmet Baran', date: '11/05/2019', start: '10:00:00', end: '10:30:00', carer1: 'Ivy Anna', carer2: 'Bernice Fisher'},
          { name: 'Mehmet Baran', date: '11/05/2019', start: '16:00:00', end: '16:30:00', carer1: 'Ivy Anna', carer2: 'Bernice Fisher'},
          { name: 'Mehmet Baran', date: '11/05/2019', start: '20:00', end: '20:30:00', carer1: 'Ivy Anna', carer2: 'Bernice Fisher'},
          { name: 'Zerya Betül', date: '11/05/2019', start: '8:00:00', end: '8:30:00', carer1: 'Ivy Anna', carer2: 'Bernice Fisher' },
        ]
      }
    }
  
    update =(info)=>{
        const data = this.state.data;
        data.push(info);
        this.setState({ data })
    }

    render() {
        const updateList = this.props.update
        console.log(updateList)

      return (
        <MaterialTable
          title="Schedules Preview"
          columns={this.state.columns}
          data={this.state.data}
          update={this.update}
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

export default ScheduleList;
