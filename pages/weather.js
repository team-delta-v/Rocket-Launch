import {
  Button,
  Container,
  Input,
  Jumbotron,
  FormGroup,
  Label,
  Table,
} from 'reactstrap'
import request from 'superagent'

import moment from 'moment'
import Layout from '../components/Layout'
import MoreInfo from '../components/Modal'

import Map from '../components/AnimatedMap'

function shitLog(x) {
  console.log(x)
  return x
}

export default class extends React.Component {
  static async getInitialProps() {
    // Do that in here
    const res = await request.get(
      `https://launchlibrary.net/1.3/launch/next/20`,
    )
    console.log(res)
    return { data: res.body }
  }

  render() {
    return 
    <script src='https://darksky.net/map-embed/@wind_speed,39.000,-95.000,4.js?embed=true&timeControl=false&fieldControl=false&defaultField=wind_speed&defaultUnits=_mph'></script>