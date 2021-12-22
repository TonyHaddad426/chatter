import React from 'react' 
import classes from './Card.module.css'

// THIS COMPONENT IS NOT BEING USED
const Card = props => {

return <div className={classes.card}>
    {props.children}
</div>
}

export default Card