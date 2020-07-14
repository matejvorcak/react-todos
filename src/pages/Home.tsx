import React from 'react';
import { Grid, Button, Container } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import './Home.scss';
import { Link } from 'react-router-dom';

const Home: React.SFC = () => {
  return (
    <Container fixed className="home-page">
      <Grid container direction="column" justify="center" alignItems="center">
        <div>
          <h1>Awesome TODOs !</h1>
        </div>
        <div>
          <Link to="/me/todos">
            <Button>
              Get started
              <ArrowForward />
            </Button>
          </Link>
        </div>
      </Grid>
    </Container>
  );
};

export default Home;
