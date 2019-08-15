import { DH_CHECK_P_NOT_PRIME } from "constants";

class monitor {
    date = '2019-06-10'
    start = '08:30'
    end = '09:00'

    toDate = (date)=>{
        let newDate = Date(date)
        console.log(newDate)
    }

    toTime=()=>{
        console.log('to time')
    }

    checkDateEquals=(date1, date2)=>{
        if(date1.getFullYear()===date2.getFullYear()){
            if(date1.getMonth()===date2.getMonth()){
                if(date1.getDay()===date2.getDay()){
                    console.log('eqauls dates, check time')
                    Ccheck15Early()
                }else if(date1.getDay()< date2.getDay()){
                    console.log(' past schedule')
                }
            }
        }
    }

    check15Early=(time1, time 2)=>{
        if(time1 +15 === time2){
            console.log('early 15 min!')
        }
        
    }

    get2Coordinate=(url)=>{
        axios.get(url)
                .then((info)=>{ console.log('addresess: ',info)
                    if(info.data.features[0]){
                        let coords = {
                            longitude: info.data.features[0].center[0],
                            latitude: info.data.features[0].center[1]
                        }
                        console.log('Geolocation: ',info.data.features[0])
                        return coords
                    }    
                })
                .catch(err=> console.log('error',err))
    }

   
    lcalcDistance = (locA, locB)=>{
        const R = 6373e3 //(where R is the radius of the Earth)
        const lat1 = (locA.latitude * Math.PI)/180
        const lat2 = (locB.latitude * Math.PI)/180
        const lon1 = (locA.longitude * Math.PI)/180
        const lon2 = (locB.longitude * Math.PI)/180
    
        //console.log(locA, locB)
        const dlon = lon2 - lon1
        const dlat = lat2 - lat1
    
        let a = ((Math.sin(dlat/2)*Math.sin(dlat/2)) + 
                    (Math.cos(lat1) * Math.cos(lat2) * 
                    (Math.sin(dlon/2)*Math.sin(dlon/2)))
                )
        const c = (2 * Math.atan2( Math.sqrt(a), Math.sqrt(1-a)))
        const d = R * c * 3.28084
        return d
    }

}