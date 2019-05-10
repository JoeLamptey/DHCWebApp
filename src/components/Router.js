import data from './data'

const Verify = (user) =>{ 
    let auth = {status: false, user: null}
    data.map((item)=>{
        if(user.email === item.email && user.password === item.password){            
           return  auth = {status: true, user: item};              
        }else {return auth}
    })
    //console.log(info)
    return auth
}

export default Verify