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

export default class extends React.Component {
  static async getInitialProps() {
    // Do that in here
    const res = await request.get(
      `https://launchlibrary.net/1.3/launch/next/20`,
    )
    console.log(res)
    return { data: res.body }
  }
}
