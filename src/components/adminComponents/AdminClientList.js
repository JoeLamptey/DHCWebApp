import React, {Component} from 'react'
import MaterialTable from 'material-table'

import {API, graphqlOperation} from 'aws-amplify'
import awsmobile from '../../aws-exports'
API.configure(awsmobile)

class AdminClientList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        columns: [
          { title: 'First Name', field: 'firstname' },
          { title: 'Last Name', field: 'lastname' },
          { title: 'Mobile', field: 'mobile' },
          {title: 'Postcode',  field: 'postcode'},
          {title: 'Address',  field: 'address'},
          {title: 'Region',  field: 'region'},
        ],
        clients: [],
        loaded: false,
        region: 'London'
      }
    }

    async componentWillMount(){
      const listClientQuery = `
          query listClients {
              listClients(filter: {region:{ eq: "London"}}) {
              items {
                  id
                  firstname
                  lastname
                  mobile
                  postcode
                  address
                  region
              }
              }
          }
      `
      await API.graphql(graphqlOperation(listClientQuery)).then(res =>{            
         const clients = res.data.listClients.items
          this.setState({clients, loaded: true})
      }).catch(err => console.log('Error: ',err))
      
    }

    componentWillUpdate(){

    }
  
    render() {
      const { loaded } = this.state;

      return (  loaded &&
        <MaterialTable
          title={this.state.region +" Clients"}
          columns={this.state.columns}
          data={this.state.clients}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const clients = this.state.clients;
                    clients.push(newData);
                    this.setState({ clients }, () => resolve());
                  }
                  resolve()
                }, 1000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const clients = this.state.clients;
                    const index = clients.indexOf(oldData);
                    clients[index] = newData;
                    this.setState({ clients }, () => resolve());
                  }
                  resolve()
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    let clients = this.state.clients;
                    const index = clients.indexOf(oldData);
                    clients.splice(index, 1);
                    this.setState({ clients }, () => resolve());
                  }
                  resolve()
                }, 1000)
              }),
          }}
        />
      )
    }
  }

export default AdminClientList;
