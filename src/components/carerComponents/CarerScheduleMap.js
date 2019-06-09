import React, { Component } from 'react';
//import data from '../data'
import numeral from 'numeral'
//import axios from 'axios'

import {API, graphqlOperation} from 'aws-amplify'
import awsmobile from '../../aws-exports'
API.configure(awsmobile)

const style ={
    map:{  
        top:0,
        bottom:0,
        width:'100%',
        height: '100%',
    },
    body:{
        margin: 0,
        padding:0, 
    }
}

 let secloc = {
     latitude: 55.787318, // 55.806722
     longitude: 37.640906  // 37.541526
 }


let distance = (locA, locB)=>{
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

// let pending =(date)=>{ 
//     let d = new Date()
//     date = new Date(date)
//     if(date.getFullYear() ===  d.getFullYear() 
//         && date.getMonth() === d.getMonth() && date.getDay() === d.getDay()){
//         console.log('equals')
//         console.log(d.getHours(),d.getMinutes())
//         console.log(date)
//         //console.log(date.slice(1,10))
//     }else if(date < Date){
//         console.log(date,d)
//         console.log('less than')
//     }else{ console.log('greater than')
//         // console.log('year: ',d.getFullYear())
//         // console.log('month: ',d.getMonth())
//         // console.log('day: ',d.getDate())
//         console.log(date, d)
//     }
// }

const mapboxgl = window.mapboxgl
//const MapboxGeocoder =  window.MapboxGeocoder
//const mapboxSdk = window.mapboxSdk
mapboxgl.accessToken = 'pk.eyJ1IjoibmlpbmlpIiwiYSI6ImNqdG1vNGh2czBoZTE0NmxpMHd1Ynpna3EifQ.ZPedbjHDKONkcYRclXSAbw';
//let globalSchedules = []

class CarerScheduleMap extends Component {

    constructor(props){
        super(props)
        this.state={
            distance:'Unknown',
            time: '00:00:00',
            schedules: [],
            coords: []
        }
    }

    async componentWillMount(){ //console.log(this.props)
        const listScheduleQuery = `
            query listSchedules {
              listSchedules(filter: {carer:{contains: "${this.props.firstname + ' '+this.props.lastname}"}}){
                items{
                  id
                  client
                  address
                  postcode
                  date
                  carer
                  date
                  start
                  end
                  note
                }
              }
            }
        `
        await API.graphql(graphqlOperation(listScheduleQuery)).then(res =>{            
           let schedules = res.data.listSchedules.items
            this.setState({schedules})
            //globalSchedules = schedules
            //console.log(schedules)
        }).catch(err => console.log('Error: ',err))
        
        // let geoloc =  await this.state.schedules.map(sched =>{
        //     let add = JSON.stringify(sched.address)
        //         add = add.slice(1,add.length-1)
        //     let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+add+".json?access_token="+mapboxgl.accessToken
        //     //console.log('addresess: ',add)
        //     axios.get(url)
        //         .then((info)=>{ console.log('addresess: ',info)
        //             if(info.data.features[0]){
        //                 let coords = {
        //                     longitude: info.data.features[0].center[0],
        //                     latitude: info.data.features[0].center[1]
        //                 }
        //                 console.log('Geolocation: ',info.data.features[0])
        //                 return coords
        //             }    
        //         })
        //         .catch(err=> console.log('error',err))
        // })
        // this.setState({coords:  geoloc})
      }


    componentDidMount(){
        
        //pending('2019-06-08')
        let map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            center: [secloc.longitude,secloc.latitude], // starting position [lng, lat]
            zoom: 15 // starting zoom
        })
                
        map.on('load', ()=>{ 

            new mapboxgl.Marker()
                        .setLngLat([secloc.longitude, secloc.latitude])
                        .addTo(map)
            console.log('coords: ',this.state)            
            setInterval(
                async()=> { 
                        let loca = {}
                        let dist, time = ''
                        await navigator.geolocation.getCurrentPosition(async (pos)=>{
                            
                            loca = {
                                latitude: pos.coords.latitude,
                                longitude: pos.coords.longitude
                            }
                            dist = distance(loca, secloc)
                            time = dist* 4.59318
                            //console.log(time)
                            this.setState({
                                distance: numeral(dist).format('0,0.00'),
                                time: numeral(time).format('00:00:00')
                            })

                            new mapboxgl.Marker({color: '#a00'})
                                .setLngLat([loca.longitude, loca.latitude])
                                .addTo(map)
                    })
                }
            ,5000)

            map.addControl(new mapboxgl.GeolocateControl({
                positionOptions: {enableHighAccuracy: true},
                trackUserLocation: true
            }))

            // map.addControl(new MapboxGeocoder({
            //     accessToken: mapboxgl.accessToken,
            //     mapboxgl: mapboxgl,
            
            // }))

            // const popup = new mapboxgl.Popup()
            //                     .setHTML("<div>Hello Carers!</div>")
            //                     .setMaxWidth("300px")
            //                     .addTo(map);

            // this.state.coords.map((campus)=>{ 
            //     return new mapboxgl.Marker()
            //                 .setLngLat([campus.longitude,campus.latitude])
            //                 .setPopup(popup)
            //                 .addTo(map)
            // })
            console.log(this.state.coords)
        })

        // let mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken })
        //     mapboxClient.geocoding.forwardGeocode({
        //         query: 'Kochnovskiy Proyezd, 3',
        //         autocomplete: false,
        //         limit: 1
        //     })
        //     .send()
        //     .then(function (response) {
        //         if (response && response.body && response.body.features && response.body.features.length) {
        //         let feature = response.body.features[0];
               
        //         new mapboxgl.Marker({color: '#00a'})
        //             .setLngLat(feature.center)
        //             .addTo(map);
        //         }
        // });

        

        map.on('error',(info)=>{
            console.log('err: ',info)
        })

        map.on('trackuserlocationstart',(info)=>{
            console.log('start: ',info)
        })

        // axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/Unnamed Road, Innopolis, Respublika Tatarstan, 422594.json?access_token=pk.eyJ1IjoibmlpbmlpIiwiYSI6ImNqdG1vNGh2czBoZTE0NmxpMHd1Ynpna3EifQ.ZPedbjHDKONkcYRclXSAbw")
        //      .then((info)=>{ console.log('Los Angeles: ',info.data.features[0].center)}).catch(e=> console.log('error'))
   
    }


    render() { //console.log(this.state.schedules)
        
        return (
            <div className={style.body}>
               <div id='map' className={style.map} style={{height: '450px', width:'100%'}}>
                   <label style={{zIndex: 5, float: 'screenLeft'}}>{this.state.distance} feet, {this.state.time} walk time</label>
               </div>
            </div>
        );
    }
}

export default CarerScheduleMap;