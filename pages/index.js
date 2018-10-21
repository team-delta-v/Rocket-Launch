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
            <h1 className="display-1">Rocket Launch App</h1>
            <h5>
              Daniel Huang, Havish Netla, Jeffrey Yang for the 2018 Space Apps
              Challenge at Baltimore, MD.
            </h5>
            <p>
              Future rocket launch data (location, time, agency, etc.),
              international launch sites locations, and real time atmospheric
              conditions.
            </p>
          </Jumbotron>
          <h3 style={{ textAlign: 'center' }}>
            Major international rocket launch sites worldwide
          </h3>
          <img
            src="./static/planet.PNG"
            style={{
              height: '355px',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '62%',
            }}
          />
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
          <h4>Next 80 Launches:</h4>
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
