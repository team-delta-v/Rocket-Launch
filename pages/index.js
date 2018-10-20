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
    const res = await request.get(
      `https://launchlibrary.net/1.3/launch/next/20`,
    )
    console.log(res)
    return { data: res.body }
  }

  render() {
    return (
      <Layout>
        <Container style={{ marginTop: '3em' }}>
          <Jumbotron>
            <h1 className="display-1">Launch Data</h1>
            <h5>
              Havish Netla, Jeffrey Yang, Daniel Huang for the 2018 Space Apps
              Challenge at JHU
            </h5>
            <p>
              Enter your address and the app will geocode into latitude and
              longitude. Then, we track the recent flight and launch times and
              locations, as well as the orbiting path of objects in space.
            </p>
            <FormGroup>
              <Label for="location">Location</Label>
              <Input
                type="text"
                name="location"
                id="location"
                placeholder="Baltimore, MD"
              />
            </FormGroup>
          </Jumbotron>
          <Map
            cities={this.props.data.launches.map(x =>
              shitLog({
                name: x.location.pads[0].name,
                coordinates: [
                  x.location.pads[0].longitude,
                  x.location.pads[0].latitude,
                ],
                eyedee: x.id,
              }),
            )}
          />
          <h3>Upcoming launches</h3>
          <br />
          <Table bordered>
            <tbody>
              {this.props.data.launches.map(x => (
                <tr id={`number-${x.id}`}>
                  <td>{x.name}</td>
                  <td>{moment(x.isostart).calendar()}</td>
                  <td>
                    <Button color="primary" href={x.location.pads[0].mapURL}>
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
