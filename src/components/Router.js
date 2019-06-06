

import {API, graphqlOperation} from 'aws-amplify'
import awsmobile from '../aws-exports'
API.configure(awsmobile)

const Verify = async (user)=>{ 
    
    let auth = {status: false, user: null}

    const listUserQuery = `
        query listUsers {
            listUsers(
                filter: 
                    { email:{ eq: "${user.email}"},
                      password: {eq: "${user.password}"}
                    }
                ) {
            items {
                id
                firstname
                lastname
                mobile
                postcode
                email
                password
                address
                region
                type
            }
            }
        }
    `
    await API.graphql(graphqlOperation(listUserQuery)).then(res =>{    //console.log('Return: ',res)          
       user = res.data.listUsers.items[0]
       if(user === undefined){ //console.log('Response: ',user) 
            return auth = {status: false, user: null}
       }else{
            auth = {status: true, user: user}
            //console.log('Response: ',auth) 
            return auth 
       }
    }).catch(err => {
        console.log('Error: ',err)
        let auth = {status: false, user: null}
        return auth
    })
    //console.log('Return: ',auth) 
    return auth
  }

  

// const Verify = async (user) =>{ 
//     //let auth = {status: false, user: null}
    
//     // data.map((item)=>{
//     //     if(user.email === item.email && user.password === item.password){            
//     //        return  auth = {status: true, user: item};              
//     //     }else {return auth}
//     // })
//     await authUser(user)
//     if(user.email === auth.user.email && user.password === auth.user.password){            
//         return  auth = {status: true, user: auth};              
//     }else {return auth}
    
//     return auth
//}

export default Verify