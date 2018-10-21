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
import bluebird from 'bluebird'

import Layout from '../components/Layout'
import MoreInfo from '../components/Modal'
import Map from '../components/AnimatedMap'
import RecommendedLaunch from '../components/RecommendedLaunch'

function shitLog(x) {
  console.log(x)
  return x
}

function getPosition(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}

export default class extends React.Component {
  state = {}

  static async getInitialProps() {
    const res = await request.get(
      `https://launchlibrary.net/1.3/launch/next/80`,
    )
    shitLog(res.body)
    return { data: res.body }
    // Bluebird.map(body.launches, async x => {
    //   const res2 = await request
    //     .get('https://nominatim.openstreetmap.org/reverse')
    //     .query({
    //       format: 'json',
    //       lat: '10',
    //       lon: '10',
    //       zoom: '18',
    //       addressdetails: '1',
    //     })
    //   shitLog(res2)
    // })
    // return { data: res.body }
  }

  async componentWillMount() {
    try {
      const position = await getPosition()
      shitLog(position)
      this.setState({ position })
    } catch (e) {
      this.setState({ position: false })
    }
  }

  render() {
    return (
      <Layout>
        <Container style={{ marginTop: '3em' }}>
          <Jumbotron>
            <h1 className="display-1">Launch Data</h1>
            <h5>
              Daniel Huang, Havish Netla, Jeffrey Yang for the 2018 Space Apps
              Challenge at Baltimore, MD.
            </h5>
            <p>
              Do you know when the next rocket launch is? What factors go into a
              decision to launch?
            </p>
          </Jumbotron>
          <img src="./static/planet.PNG" />
          <h4>Looking to see a launch?</h4>
          <RecommendedLaunch
            position={this.state.position}
            launches={this.props.data}
          />

          {/* <Map
            cities={this.props.data.launches.map(x =>
              shitLog(
                x.launches
                  ? {
                      name: x.location.pads[0].name,
                      coordinates: [
                        x.location.pads[0].longitude,
                        x.location.pads[0].latitude,
                      ],
                      eyedee: x.id,
                    }
                  : undefined,
              ),
            )}
                  /> */}
          <br />
          <h4>All upcoming launches</h4>
          <br />
          <Table bordered>
            <tbody>
              {this.props.data.launches.map(x => (
                <tr id={`number-${x.id}`}>
                  <td>{x.name}</td>
                  <td>{moment(x.isostart).calendar()}</td>
                  <td>
                    <Button
                      color="primary"
                      href={x.location.pads[0] ? x.location.pads[0].mapURL : ''}
                    >
                      Open Map
                    </Button>
                  </td>
                  <td>
                    <MoreInfo data={x} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </Layout>
    )
  }
}
