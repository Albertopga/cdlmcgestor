import React from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import { BrowserRouter as Router} from 'react-router-dom'
import Routes from '../../routes/Routes';
import Menu from '../../components/Menu';

import './style.scss'

export default function LoggedLayout(props) {
  const { user } = props;

  
  return (
    <Router>
      <Grid className="logged-layout">
        <Grid.Row>
          <Grid.Column width={3}>
            <Menu user={user} />
          </Grid.Column>
          <Grid.Column className="content" width={13}>
            <h2>Top Bar</h2>
            <Routes />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Router>
  )
}
