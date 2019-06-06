import React, {Component} from 'react'
import MaterialTable from 'material-table'

import {API, graphqlOperation} from 'aws-amplify'
import awsmobile from '../../aws-exports'
API.configure(awsmobile)

const style={
  container: {
    // '@media (min-width: 901px)':{
    //   width: '350px',
    // },

    // '@media (max-width: 900px) and (min-width: 600px)':{
    //   width: '65%',
    // },

    // '@media (min-width: 599px)':{
    //   width: '80%',
    // }
  }
}

class AdminSupervisorList extends Component {
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
        Supervisors: [],
        deleted: {},
        updated: {},
        create: {},
        loaded: false,
        region: 'London'
      }
    }

    async componentWillMount(){ //(filter: {region:{ eq: "London"}})
      const listSupervisorQuery = `
          query listSupervisors {
              listSupervisors {
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
      await API.graphql(graphqlOperation(listSupervisorQuery)).then(res =>{            
         const Supervisors = res.data.listSupervisors.items
          this.setState({Supervisors, loaded: true})
      }).catch(err => console.log('Error: ',err))
      
    }

    delete=async ()=>{
      
      //console.log('to be deleted: ',this.state.deleted)

      const deleteSupervisorQuery = `
      mutation deleteSupervisor {
            deleteSupervisor(input: {id: "${this.state.deleted.id}"}) {
                  id
                  firstname
                  lastname
                  mobile
                  region
              }
          }
      `
      await API.graphql(graphqlOperation(deleteSupervisorQuery)).then(res =>{            
          const deleted = res.data.deleteSupervisor
          this.setState({deleted})
      }).catch(err => console.log('Error: ',err))

    }
     
    update= async ()=>{
         
      //console.log('to be deleted: ',this.state.updated)

      const updateSupervisorQuery = `
      mutation updateSupervisor {
            updateSupervisor(input: {
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
      await API.graphql(graphqlOperation(updateSupervisorQuery)).then(res =>{            
          const updated = res.data.updateSupervisor
          this.setState({updated})
      }).catch(err => console.log('Error: ',err))
    }

    create=async ()=>{
      //console.log('to be created: ',e)
      console.log(this.state.create)

      const createSupervisorQuery = `
          mutation createSupervisor {
                createSupervisor(input: {
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
      await API.graphql(graphqlOperation(createSupervisorQuery)).then(res =>{            
          const create = res.data.createSupervisor
          this.setState({create})
      }).catch(err => console.log('Error: ',err))
    }
    componentWillUpdate(){

    }
  
    render() {
      const { loaded } = this.state;

      return (  loaded &&
        <div className={style.container}><MaterialTable 
          title={"All Supervisors"}
          columns={this.state.columns}
          data={this.state.Supervisors}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const Supervisors = this.state.Supervisors;
                    Supervisors.push(newData);
                    this.setState({ Supervisors, create: newData }, () => resolve());
                    this.create()                    
                  }
                  resolve()
                }, 1000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const Supervisors = this.state.Supervisors;
                    const index = Supervisors.indexOf(oldData);
                    Supervisors[index] = newData;
                    const updated = newData;
                    this.setState({ Supervisors, updated }, () => resolve());
                    this.update()
                  }
                  resolve()
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    let Supervisors = this.state.Supervisors;
                    const index = Supervisors.indexOf(oldData);
                    const deleted = this.state.Supervisors[index]
                    Supervisors.splice(index, 1);
                    this.setState({ Supervisors , deleted }, () => resolve());
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

export default AdminSupervisorList;
