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
            center: [-74.50, 40], // starting position [lng, lat]
            zoom: 9 // starting zoom
        })
        //console.log(map)
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