import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import img1 from '../../images/ad4.jpeg'
import img2 from '../../images/ad1.jpeg'
import img3 from '../../images/ad6.jpeg'

const styles = theme=>({
   root:{
    flexGrow: 1
   },
  card: {
    maxWidth: 245,
  },
  media: {
    height: 140,
  },
});

function AdminCarerEvents (props) {
  const { classes } = props;
  return (
    <Grid container spacing={8}>
        <Grid item xs>
        <Card className={classes.card}>
            <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={img1}
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        May 1st Bithday Celeberation
                    </Typography>
                    <Typography component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                    Share
                    </Button>
                    <Button size="small" color="primary">
                    Learn More
                    </Button>
                </CardActions>
            </Card>
        </Grid>
        <Grid item xs>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={img2}
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        April 12th Anniversary
                    </Typography>
                    <Typography component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                    Share
                    </Button>
                    <Button size="small" color="primary">
                    Learn More
                    </Button>
                </CardActions>
            </Card>
        </Grid>
        <Grid item xs>
        <Card className={classes.card}>
            <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={img3}
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        June 19th, Family Day 
                    </Typography>
                    <Typography component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                    Share
                    </Button>
                    <Button size="small" color="primary">
                    Learn More
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    </Grid>
  );
}

AdminCarerEvents.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminCarerEvents);
