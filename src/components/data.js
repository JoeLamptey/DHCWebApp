// export default [
//     {email:'ruther.hse@gmail.com', password:'best', type: 'admin'},
//     {email:'carer@gmail.com', password:'carer', type: 'carer'},
//     {email:'supervisor@gmail.com', password:'super', type: 'supervisor'},
//     {email:'client@gmail.com', password:'client', type: 'client'},
//     {email:'manager@gmail.com', password:'manager', type: 'manager'},
// ]

let campus =[
    {
        longitude: 48.741692,
        latitude: 55.753796
    },
    {
        longitude: 48.741262,
        latitude: 55.753861
    },
    {
        longitude: 48.740683,
        latitude: 55.754006
    },
    {
        longitude: 48.740246,
        latitude: 55.754107
    }
]

export default campus

// let loc = [
//     {
//         latitude: 55.779616,
//         longitude: 37.633789
//     },
//     {
//         latitude: 55.7875416,
//         longitude: 37.6403557
//     },
//     {
//         latitude: 55.779437,
//         longitude: 37.633203
//     },
//     {
//         latitude: 55.779954,
//         longitude: 37.633500
//     },
//     {
//         latitude: 55.755826,
//         longitude: 37.6173
//     },
    
//     {
//        latitude: 55.787401,
//        longitude: 37.640836
//     },
//     {
//         latitude: 55.759060399999996,
//         longitude: 48.740467599
//     },{
//         latitude: 55.7538488,
//         longitude: 48.742325199999996
//     },{
//         latitude: 55.753833799999995,
//         longitude: 48.7422608
//     },{
//         latitude: 55.7538511,
//         longitude: 48.7421783
//     },{
//         latitude: 55.759060399999996,
//         longitude: 48.740467599
//     },
//     {
//         latitude: 55.759060399999996,
//         longitude: 48.740467599
//     },{
//         latitude: 55.7538355,
//         longitude: 48.7422967
//     },{
//         latitude: 55.759060399999996,
//         longitude: 48.740467
//     },{
//         latitude: 55.759060399999996,
//         longitude: 48.740467599
//     },{
//         latitude: 55.759060399999996,
//         longitude: 48.740467
//     },{
//         latitude: 55.759060399999996,
//         longitude: 48.7404675999
//     },{
//         latitude: 55.7538421,
//         longitude: 48.7422258
//     },{
//         latitude: 55.7538559,
//         longitude: 48.7422787
//     },{
//         latitude: 55.753835699999996,
//         longitude: 48.74208270
//     },{
//         latitude: 55.753847300000004,
//         longitude: 48.7423134
//     }
// ]


//"https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=YOUR_MAPBOX_ACCESS_TOKEN"
        // map.on('load',()=>{
        //     map.addLayer({
        //         id: 'places',
        //         type: 'symbol',
        //         source: {
        //             type: 'geojson',
        //             data: {
        //                 type: 'FeatureCollection',
        //                 features: [
        //                     {
        //                         type: 'Feature',
        //                         properties: {
        //                             description: `<strong> Carer</strong>
        //                             <p> I have been a carer at BeeAktive for the past 3 years! </p>                                
        //                             `,
        //                             icon: 'bar'
        //                         },
        //                         geometry:{
        //                             type: 'Point',
        //                             coordinates:  [myloca.longitude,myloca.latitude]
        //                         }
        //                     },
        //                 ]
        //             }
        //         },
        //         layout: {
        //             "icon-image": "{icon}-15",
        //             "icon-allow-overlap": true
        //         }
        //     })
    
    
        //     map.on('click', 'places',(e)=>{
        //         let coordinates = e.features[0].geometry.coordinates.slice();
        //         let description = e.features[0].properties.description;
                
        //         // Ensure that if the map is zoomed out such that multiple
        //         // copies of the feature are visible, the popup appears
        //         // over the copy being pointed to.
        //         while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //             coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        //         }
                
        //         new mapboxgl.Popup()
        //         .setLngLat(coordinates)
        //         .setHTML(description)
        //         .addTo(map);
        //     })
    
        //     // Change the cursor to a pointer when the mouse is over the places layer.
        //     map.on('mouseenter', 'places', function () {
        //         map.getCanvas().style.cursor = 'pointer';
        //     });
                
        //     // Change it back to a pointer when it leaves.
        //     map.on('mouseleave', 'places', function () {
        //         map.getCanvas().style.cursor = '';
        //     });
        // })

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