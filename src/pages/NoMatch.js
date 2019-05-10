import React from 'react'
import {Link} from 'react-router-dom'

const NoMatch =()=>{
    return(
        <div>
            <h3>Hmmm!</h3>
            <p>Try the Home page, <Link to='/'> Home</Link></p>
        </div>
    )
}

export default NoMatch