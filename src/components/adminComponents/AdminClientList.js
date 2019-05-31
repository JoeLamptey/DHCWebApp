import React, {Component} from 'react'
import MaterialTable from 'material-table'

import {API, graphqlOperation} from 'aws-amplify'
import awsmobile from '../../aws-exports'
API.configure(awsmobile)

const style={
  container: {
    width: '500px',
  }
}

class AdminClientList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        columns: [
          { title: 'First Name', field: 'firstname' },
          { title: 'Last Name', field: 'lastname' },
          { title: 'Birthday', field: 'birthday', type: 'date' },
          { title: 'Mobile', field: 'mobile'},
          {title: 'Postcode',  field: 'postcode'},
          { title: 'Email', field: 'email' },
          {title: 'Address',  field: 'address'},
          { title: 'Next of Kin', field: 'nextofkin' },
          { title: 'NOK Mobile', field: 'nok_mobile' },
          { title: 'NOK Email', field: 'nok_email' },
          {title: 'Region',  field: 'region'},
        ],
        clients: [],
        deleted: {},
        updated: {},
        create: {},
        loaded: false,
        region: 'London'
      }
    }

    async componentWillMount(){ //(filter: {region:{ eq: "London"}})
      const listClientQuery = `
          query listClients {
              listClients {
              items {
                  id
                  firstname
                  lastname
                  birthday
                  mobile
                  postcode
                  email
                  address
                  nextofkin
                  nok_mobile
                  nok_email
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

    delete=async ()=>{
      
      console.log('to be deleted: ',this.state.deleted)

      const deleteClientQuery = `
      mutation deleteClient {
            deleteClient(input: {id: "${this.state.deleted.id}"}) {
                  id
                  firstname
                  lastname
                  mobile
                  region
              }
          }
      `
      await API.graphql(graphqlOperation(deleteClientQuery)).then(res =>{            
          const deleted = res.data.deleteClient
          this.setState({deleted})
      }).catch(err => console.log('Error: ',err))

    }
     
    update= async ()=>{
         
      //console.log('to be deleted: ',this.state.updated)

      const updateClientQuery = `
      mutation updateClient {
            updateClient(input: {
              id: "${this.state.updated.id}",
              firstname: "${this.state.updated.firstname}",
              lastname: "${this.state.updated.lastname}",
              mobile: "${this.state.updated.mobile}",
              postcode: "${this.state.updated.postcode}",
              email: "${this.state.updated.email}",
              address: "${this.state.updated.address}",
              birthday: "${this.state.updated.birthday}",
              nextofkin: "${this.state.updated.nextofkin}",
              nok_mobile: "${this.state.updated.nok_mobile}",
              nok_email: "${this.state.updated.nok_email}",
              region: "${this.state.updated.region}",
            }) {
                  id
                  firstname
                  lastname
                  mobile
                  region
              }
          }
      `
      await API.graphql(graphqlOperation(updateClientQuery)).then(res =>{            
          const updated = res.data.updateClient
          this.setState({updated})
      }).catch(err => console.log('Error: ',err))
    }

    create=async ()=>{
      //console.log('to be created: ',e)
      console.log(this.state.create)

      const createClientQuery = `
          mutation createClient {
                createClient(input: {
                  firstname: "${this.state.create.firstname}",
                  lastname: "${this.state.create.lastname}",
                  mobile: "${this.state.create.mobile}",
                  postcode: "${this.state.create.postcode}",
                  email: "${this.state.create.email}",
                  address: "${this.state.create.address}",
                  birthday: "${this.state.create.birthday}",
                  nextofkin: "${this.state.create.nextofkin}",
                  nok_mobile: "${this.state.create.nok_mobile}",
                  nok_email: "${this.state.create.nok_email}",
                  region: "${this.state.create.region}",
                }) {
                      id
                      firstname
                      lastname
                      mobile
                      region
              }
          }
        `
      await API.graphql(graphqlOperation(createClientQuery)).then(res =>{            
          const create = res.data.createClient
          this.setState({create})
      }).catch(err => console.log('Error: ',err))
    }
    componentWillUpdate(){

    }
  
    render() {
      const { loaded } = this.state;

      return (  loaded &&
        <div className={style.container}><MaterialTable 
          title={"All Clients"}
          columns={this.state.columns}
          data={this.state.clients}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const clients = this.state.clients;
                    clients.push(newData);
                    this.setState({ clients, create: newData }, () => resolve());
                    this.create()                    
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
                    const updated = newData;
                    this.setState({ clients, updated }, () => resolve());
                    this.update()
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
                    const deleted = this.state.clients[index]
                    clients.splice(index, 1);
                    this.setState({ clients , deleted }, () => resolve());
                    this.delete()
                  }
                  resolve()
                }, 1000)
              }),
          }}
        /></div>
      )
    }
  }

export default AdminClientList;
