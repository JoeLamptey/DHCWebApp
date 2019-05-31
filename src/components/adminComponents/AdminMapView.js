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
    latitude: 55.7514319,
    longitude: 48.754850399
}

// let secloc = {
//     latitude: 55.7514319,
//     longitude: 48.754950399
// }

let loc = [
    // {
    //     latitude: 55.779616,
    //     longitude: 37.633789
    // },
    // {
    //     latitude: 55.7875416,
    //     longitude: 37.6403557
    // },
    // {
    //     latitude: 55.779437,
    //     longitude: 37.633203
    // },
    // {
    //     latitude: 55.779954,
    //     longitude: 37.633500
    // },
    // {
    //     latitude: 55.755826,
    //     longitude: 37.6173
    // },
    
    {
       latitude: 55.787401,
       longitude: 37.640836
    }
]



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

class AdminMapView extends Component {

    componentDidMount(){
        const mapboxgl = window.mapboxgl
        mapboxgl.accessToken = 'pk.eyJ1IjoibmlpbmlpIiwiYSI6ImNqdG1vNGh2czBoZTE0NmxpMHd1Ynpna3EifQ.ZPedbjHDKONkcYRclXSAbw';
        let map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            center: [loc[0].longitude,loc[0].latitude], // starting position [lng, lat]
            zoom: 12 // starting zoom
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

            navigator.geolocation.getCurrentPosition(async (pos)=>{
                loc.push(pos)
                console.log('My location: ',pos)
                await  new mapboxgl.Marker({color: '#00a'})
                            .setLngLat([pos.coords.longitude,pos.coords.latitude])
                            .addTo(map)
                await  new mapboxgl.Marker({color: '#0a0'})
                            .setLngLat([loc[0].longitude,loc[0].latitude])
                            .addTo(map)
                // await  new mapboxgl.Marker({color: '#00a'})
                //             .setLngLat([loc[1].longitude,loc[1].latitude])
                //             .addTo(map)
                // await  new mapboxgl.Marker({color: '#a00'})
                //             .setLngLat([loc[2].longitude,loc[2].latitude])
                //             .addTo(map)
                // await  new mapboxgl.Marker({color: '#a00'})
                //             .setLngLat([loc[3].longitude,loc[3].latitude])
                //             .addTo(map)
                // await  new mapboxgl.Marker({color: '#a00'})
                //             .setLngLat([loc[4].longitude,loc[4].latitude])
                //             .addTo(map)
            })
        })

        map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
            enableHighAccuracy: true
            },
            trackUserLocation: true
        }));

        

        console.log('First: ',distance(loc[0],loc[1]))
        // console.log('Second: ',distance(loc[0],loc[2]))
        // console.log('third: ',distance(loc[2],loc[3]))
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

export default AdminMapView;