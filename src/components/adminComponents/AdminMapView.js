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

class AdminMapView extends Component {

    componentDidMount(){
        const mapboxgl = window.mapboxgl
        mapboxgl.accessToken = 'pk.eyJ1IjoibmlpbmlpIiwiYSI6ImNqdG1vNGh2czBoZTE0NmxpMHd1Ynpna3EifQ.ZPedbjHDKONkcYRclXSAbw';
        let map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            center: [-0.118092, 51.509865], // starting position [lng, lat]
            zoom: 12 // starting zoom
        })
        // let clients = [[-74.50, 40], [-74.51, 40.001], [-74.5002, 40.023]]
        // let carers =  [[-74.50, 40.03],  [-74.515, 40.0007]]
        let clients = [[-0.112, 51.504], [-0.128, 51.509 ], [-0.114, 51.500]]
        let carers =  [[-0.128, 51.506],  [-0.108, 51.502]]
        let mark=(data, color)=>{
            data.map((item)=>{
                //console.log(item[0])
                let marking = new mapboxgl.Marker({color: color})
                                 .setLngLat(item)
                                 .addTo(map)
                 return marking
             })
        }

        mark(clients, '#911')
        mark(carers, '#a1e')
        
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