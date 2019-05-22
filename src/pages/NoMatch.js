import React from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';

const NoMatch =()=>{
    return(
        <div align='center'>
            <h1>Sorry, page does not exist!</h1>
            <Link to='/'><Button color='primary' variant='contained'>Home</Button></Link>
        </div>
    )
}

export default NoMatch