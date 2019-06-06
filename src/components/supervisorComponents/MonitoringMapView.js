import React, { Component } from 'react';
import data from '../data'
//import axios from 'axios'

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

// let myloca= {
//     latitude: 55.759060399999996,
//     longitude: 48.740467599
// }

 let secloc = {
     latitude: 55.753847300000004,
     longitude: 48.7423134
 }

// let loc = [
//     {
//         latitude: 55.74440010000001,
//            longitude: 48.7541523
//     },{
//         latitude: 55.753796,
//         longitude: 48.741692
//     },{
//         latitude: 55.7538699,
//         longitude: 48.74225550000
//     },{
//         latitude: 55.753664199999996,
//         longitude: 48.7430999
//     },
//     {
//         longitude: 48.744056,
//         latitude: 55.753081
//     }
// ]

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

class MonitoringMapView extends Component {

    componentDidMount(){
        const mapboxgl = window.mapboxgl
        //const MapboxGeocoder =  window.MapboxGeocoder
        mapboxgl.accessToken = 'pk.eyJ1IjoibmlpbmlpIiwiYSI6ImNqdG1vNGh2czBoZTE0NmxpMHd1Ynpna3EifQ.ZPedbjHDKONkcYRclXSAbw';
        let map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            center: [secloc.longitude,secloc.latitude], // starting position [lng, lat]
            zoom: 15 // starting zoom
        })

                
        map.on('load', ()=>{
            setInterval(
                async()=> { let loca = {}
                        await navigator.geolocation.getCurrentPosition(async (pos)=>{
                            
                            loca = {
                                latitude: pos.coords.latitude,
                                longitude: pos.coords.longitude
                            }
                            console.log('Distance: ',distance(loca, data[0])+' feet')
                    })
                    //for(let i = 1; i< loc.length; i++){
                        //console.log('Distance: ',distance(loc[0], loc[1])+' feet')
                        //console.log('Distance: ',distance(loca, data[0])+' feet')
                    //}
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
        })

        data.map((campus)=>{ //console.log(campus)
            return new mapboxgl.Marker()
                        .setLngLat([campus.longitude,campus.latitude])
                        .addTo(map)
        })

        map.on('error',(info)=>{
            console.log('err: ',info)
        })

        map.on('trackuserlocationstart',(info)=>{
            console.log('start: ',info)
        })

        // http.get('/geocoding/v5/mapbox.places/Innopolis University.json?access_token=pk.eyJ1IjoibmlpbmlpIiwiYSI6ImNqdG1vNGh2czBoZTE0NmxpMHd1Ynpna3EifQ.ZPedbjHDKONkcYRclXSAbw',(info)=>{
        //     console.log('InnopolisU: ',info)
        // })

        // axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/Unnamed Road, Innopolis, Respublika Tatarstan, 422594.json?access_token=pk.eyJ1IjoibmlpbmlpIiwiYSI6ImNqdG1vNGh2czBoZTE0NmxpMHd1Ynpna3EifQ.ZPedbjHDKONkcYRclXSAbw")
        //      .then((info)=>{ console.log('Los Angeles: ',info.data.features[0].center)}).catch(e=> console.log('error'))

        
        
    }

    render() {
        
        return (
            <div className={style.body}>
               <div id='map' className={style.map} style={{height: '450px', width:'100%'}}></div>
            </div>
        );
    }
}

export default MonitoringMapView;