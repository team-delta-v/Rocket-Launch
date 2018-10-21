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
          src="https://darksky.net/widget/graph/42.360082,-71.05888/us12/en.js?width=90%&title=Full Forecast&textColor=333333&bgColor=FFFFFF&fontFamily=Default&customFont=&units=us&graph=temperature_graph&timeColor=333333&tempColor=333333&lineColor=333333&markerColor=333333"
        />
        <script
          type="text/javascript"
          src="https://darksky.net/widget/graph/42.360082,-71.05888/us12/en.js?width=90%&height=320&title=Full Forecast&textColor=333333&bgColor=FFFFFF&transparency=false&fontFamily=Default&customFont=&units=us&graph=wind_graph&timeColor=333333&tempColor=333333&lineColor=333333&markerColor=333333"
        />
        <script src="https://darksky.net/map-embed/@wind_speed,39.000,-95.000,4.js?embed=true&timeControl=false&fieldControl=false&defaultField=wind_speed&defaultUnits=_mph" />
        <script src="https://darksky.net/map-embed/@cloud_cover,39.000,-95.000,4.js?embed=true&timeControl=false&fieldControl=false&defaultField=cloud_cover" />
      </Layout>
    )
  }
}
