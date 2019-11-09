import React, { Component } from 'react';
// import data from '../data'
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

 let secloc = {
     latitude: 55.753881, //55.753881 55.753879
     longitude: 48.7417498 //48.7417498 48.741747
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

class MonitoringMapView extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: '',
            error_div: 'none',
            alert: 'alert',
            location_div: 'none',
            location: '',
            inform: 'success',
            distance: ''
        }
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
                async()=> { let loca = {}
                        await navigator.geolocation.getCurrentPosition(async (pos)=>{
                            
                            loca = {
                                latitude: pos.coords.latitude,
                                longitude: pos.coords.longitude
                            }
                            // console.log('Distance: ',distance(loca, secloc)+' feet')
                            this.setState({
                                location: loca,
                                location_div: 'block',
                                distance: distance(loca, secloc)
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

        // data.map((campus)=>{ //console.log(campus)
        //     return new mapboxgl.Marker()
        //         .setLngLat([campus.longitude,campus.latitude])
        //         .addTo(map)
        // })

        map.on('error',(info)=>{
            this.setState({
                error: info,
                error_div: 'block'
            })
            //console.log('err: ',info)
        })

        // map.on('trackuserlocationstart',(info)=>{
        //     this.setState({location: info})
        //     // console.log('start: ',info)
        // })

        // http.get('/geocoding/v5/mapbox.places/Innopolis University.json?access_token=pk.eyJ1IjoibmlpbmlpIiwiYSI6ImNqdG1vNGh2czBoZTE0NmxpMHd1Ynpna3EifQ.ZPedbjHDKONkcYRclXSAbw',(info)=>{
        //     console.log('InnopolisU: ',info)
        // })

        // axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/Unnamed Road, Innopolis, Respublika Tatarstan, 422594.json?access_token=pk.eyJ1IjoibmlpbmlpIiwiYSI6ImNqdG1vNGh2czBoZTE0NmxpMHd1Ynpna3EifQ.ZPedbjHDKONkcYRclXSAbw")
        //      .then((info)=>{ console.log('Los Angeles: ',info.data.features[0].center)}).catch(e=> console.log('error'))

        
        
    }

    render() {
        
        return (
            <div className={style.body}>
               <div id='map' 
                    className={style.map} 
                    style={{height: '450px', width:'100%'}}>
               </div>
               <div className={this.state.alert} style={{display: this.state.error_div}}>
                    {this.state.error}
                </div>
                <div className={this.state.inform} 
                    style={{paddingTop: 5, display: this.state.location_div}}>
                    {JSON.stringify(Date()).substring(1,22)+ " GMT "} 
                    {(this.state.location !== '')?
                        `latitude: ${this.state.location.latitude.toFixed(6)}, 
                          longitude: ${this.state.location.longitude.toFixed(6)}`
                        : null
                    }
                    {(this.state.distance !== '')? `  Distance: ${this.state.distance.toFixed(2)} feet`: null}
                </div>
            </div>
        );
    }
}

export default MonitoringMapView;