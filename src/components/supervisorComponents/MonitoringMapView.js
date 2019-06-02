import React, { Component } from 'react';

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

let myloca= {
    latitude: 55.759060399999996,
    longitude: 48.740467599
}

 let secloc = {
     latitude: 55.753847300000004,
     longitude: 48.7423134
 }

let loc = []

let distance = (locA, locB)=>{
    const R = 6373e3 //(where R is the radius of the Earth)
    const lat1 = (locA.latitude * Math.PI)/180
    const lat2 = (locB.latitude * Math.PI)/180
    const lon1 = (locA.longitude * Math.PI)/180
    const lon2 = (locB.longitude * Math.PI)/180

    const dlon = lon2 - lon1
    const dlat = lat2 - lat1

    let a = ((Math.sin(dlat/2)*Math.sin(dlat/2)) + 
                (Math.cos(lat1) * Math.cos(lat2) * 
                (Math.sin(dlon/2)*Math.sin(dlon/2)))
            )
    const c = (2 * Math.atan2( Math.sqrt(a), Math.sqrt(1-a)))
    const d = R * c 
    return d
}

class MonitoringMapView extends Component {

    componentDidMount(){
        const mapboxgl = window.mapboxgl
        const MapboxGeocoder =  window.MapboxGeocoder
        mapboxgl.accessToken = 'pk.eyJ1IjoibmlpbmlpIiwiYSI6ImNqdG1vNGh2czBoZTE0NmxpMHd1Ynpna3EifQ.ZPedbjHDKONkcYRclXSAbw';
        let map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            center: [secloc.longitude,secloc.latitude], // starting position [lng, lat]
            zoom: 10 // starting zoom
        })
        
        map.on('load',()=>{
            map.addLayer({
                id: 'places',
                type: 'symbol',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                properties: {
                                    description: `<strong> Carer</strong>
                                    <p> I have been a carer at BeeAktive for the past 3 years! </p>                                
                                    `,
                                    icon: 'bar'
                                },
                                geometry:{
                                    type: 'Point',
                                    coordinates:  [myloca.longitude,myloca.latitude]
                                }
                            },
                        ]
                    }
                },
                layout: {
                    "icon-image": "{icon}-15",
                    "icon-allow-overlap": true
                }
            })
    
    
            map.on('click', 'places',(e)=>{
                let coordinates = e.features[0].geometry.coordinates.slice();
                let description = e.features[0].properties.description;
                
                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                
                new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
            })
    
            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on('mouseenter', 'places', function () {
                map.getCanvas().style.cursor = 'pointer';
            });
                
            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'places', function () {
                map.getCanvas().style.cursor = '';
            });

            setInterval(
                ()=>{ let loca = {}
                        navigator.geolocation.getCurrentPosition(async (pos)=>{
                            
                            loca = {
                                latitude: pos.coords.latitude,
                                longitude: pos.coords.longitude
                            }
                            loc.push(loca)
                    })
                    for(let i = 1; i< loc.length; i++){
                        console.log('Distance: ',distance(loc[i-1], loc[i]))
                    }
                }
            ,15000)

            map.addControl(new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            }))
                
        })

            // navigator.geolocation.getCurrentPosition(async (pos)=>{
            //             loc.push(pos)
            //             console.log('My location: ',pos)
            //             // await  new mapboxgl.Marker({color: '#00a'})
            //             //             .setLngLat([pos.coords.longitude,pos.coords.latitude])
            //             //             .addTo(map)
            //             map.addControl(new mapboxgl.GeolocateControl({
            //                 positionOptions: {
            //                 enableHighAccuracy: true
            //                 },
            //                 trackUserLocation: true
            //             }))
                
            
            //         //map.flyTo({center: [pos.coords.longitude,pos.coords.latitude]})
                    
                    
            //         // await  new mapboxgl.Marker({color: '#0a0'})
            //         //             .setLngLat([loc[1].longitude,loc[1].latitude])
            //         //             .addTo(map)

            //         // await  new mapboxgl.Marker({color: '#00a'})
            //         //             .setLngLat([loc[1].longitude,loc[1].latitude])
            //         //             .addTo(map)
            //         // await  new mapboxgl.Marker({color: '#a00'})
            //         //             .setLngLat([loc[2].longitude,loc[2].latitude])
            //         //             .addTo(map)
            //         // await  new mapboxgl.Marker({color: '#a00'})
            //         //             .setLngLat([loc[3].longitude,loc[3].latitude])
            //         //             .addTo(map)
            //         // await  new mapboxgl.Marker({color: '#a00'})
            //         //             .setLngLat([loc[4].longitude,loc[4].latitude])
            //         //             .addTo(map)
            //     })

        // console.log('First: ',distance(loc[0],loc[2]))
        // console.log('Second: ',distance(loc[0],loc[3]))
        //console.log('third: ',distance(loc[2],loc[3]))
        // console.log('4th: ',distance(loc[0],loc[3]))

        // let clients = [[-0.112, 51.504], [-0.128, 51.509 ], [-0.114, 51.500]]
        // let carers =  [[-0.128, 51.506],  [-0.108, 51.502]]
        // let carerDes= 'I am a BeeAktive carer!'
        // let clientDes= 'I am a BeeAktive carer!'
        // let mark=(data, color, des)=>{
        //     data.map((item)=>{
        //         //console.log(item[0])
        //         let marking = new mapboxgl.Marker({color: color})
        //                          .setLngLat(item)
        //                          .addTo(map)

        //         // new mapboxgl.Popup()
        //         //             .setLngLat(item)
        //         //             .setHTML(des)
        //         //             .addTo(map)

        //          return marking
        //      })
        // }

        // mark(clients, '#911',clientDes)
        // mark(carers, '#a1e', carerDes)
        
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