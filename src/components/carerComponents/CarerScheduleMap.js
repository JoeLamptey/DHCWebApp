import React, { Component } from 'react';
import data from '../data'
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
     latitude: 55.753847300000004,
     longitude: 48.7423134
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

let pending =(date)=>{ //Date().getFullYear()+'-'+Date().getMonth()+'-'+Date.getDate()
    let d = new Date()
    date = new Date(date)
    if(date =  Date()){
        console.log(d.getHours(),d.getMinutes())
        console.log(date.slice(1,10))
    }else if(date < Date){
        console.log(date,d)
    }else{
        console.log('year: ',d.getFullYear())
        console.log('month: ',d.getMonth())
        console.log('day: ',d.getDate())
        console.log(date.slice(1,10))
    }
}

class CarerScheduleMap extends Component {

    constructor(props){
        super(props)
        this.state={
            distance:'Unknown',
            time: '00:00:00',
            schedules: []
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
            console.log(schedules)
        }).catch(err => console.log('Error: ',err))
        pending('2019-06-06')
      }


    componentDidMount(){
        const mapboxgl = window.mapboxgl
        const MapboxGeocoder =  window.MapboxGeocoder
        mapboxgl.accessToken = 'pk.eyJ1IjoibmlpbmlpIiwiYSI6ImNqdG1vNGh2czBoZTE0NmxpMHd1Ynpna3EifQ.ZPedbjHDKONkcYRclXSAbw';
        let map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            center: [secloc.longitude,secloc.latitude], // starting position [lng, lat]
            zoom: 15 // starting zoom
        })

                
        map.on('load', ()=>{
            setInterval(
                async()=> { 
                        let loca = {}
                        let dist, time = ''
                        await navigator.geolocation.getCurrentPosition(async (pos)=>{
                            
                            loca = {
                                latitude: pos.coords.latitude,
                                longitude: pos.coords.longitude
                            }
                            dist = distance(loca, data[0])
                            time = dist* 4.59318
                            //console.log(time)
                            this.setState({
                                distance: numeral(dist).format('0,0.00'),
                                time: numeral(time).format('00:00:00')
                            })
                    })
                }
            ,5000)

            map.addControl(new mapboxgl.GeolocateControl({
                positionOptions: {enableHighAccuracy: true},
                trackUserLocation: true
            }))

            map.addControl(new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                
            }))
        })

        const popup = new mapboxgl.Popup()
                                .setHTML("<div>Hello Carers!</div>")
                                .setMaxWidth("300px")
                                .addTo(map);

        data.map((campus)=>{ 
            return new mapboxgl.Marker()
                        .setLngLat([campus.longitude,campus.latitude])
                        .setPopup(popup)
                        .addTo(map)
        })

        map.on('error',(info)=>{
            console.log('err: ',info)
        })

        map.on('trackuserlocationstart',(info)=>{
            console.log('start: ',info)
        })

        // axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/Unnamed Road, Innopolis, Respublika Tatarstan, 422594.json?access_token=pk.eyJ1IjoibmlpbmlpIiwiYSI6ImNqdG1vNGh2czBoZTE0NmxpMHd1Ynpna3EifQ.ZPedbjHDKONkcYRclXSAbw")
        //      .then((info)=>{ console.log('Los Angeles: ',info.data.features[0].center)}).catch(e=> console.log('error'))
   
    }


    render() { //console.log(this.props)
        
        return (
            <div className={style.body}>
               <div id='map' className={style.map} style={{height: '450px', width:'100%'}}>
                   <label>{this.state.distance} feet, {this.state.time} walk time</label>
               </div>
            </div>
        );
    }
}

export default CarerScheduleMap;