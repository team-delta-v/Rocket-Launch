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
    return (
      <Layout>
        <script
          type="text/javascript"
          src="https://darksky.net/widget/default/42.360082,-71.05888/us12/en.js?height=500&title=Full Forecast&textColor=333333&bgColor=FFFFFF&skyColor=333&fontFamily=Default&units=us&htColor=333333&ltColor=C7C7C7&displaySum=yes&displayHeader=yes"
        />
      </Layout>
    )
  }
}
