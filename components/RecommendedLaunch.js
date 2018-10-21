import MDSpinner from 'react-md-spinner'
import distance from 'geo-dist'
import moment from 'moment'
import {
  ButtonGroup,
  Card,
  CardBody,
  Container,
  Button,
  CardTitle,
  CardText,
  CardSubtitle,
  CardImg,
  Row,
  Col,
} from 'reactstrap'

function calculateDistance(x, position) {
  console.log('POSITION', position)
  const c = position.coords
  const pad = x.location.pads[0]
  const l = { lon: pad.longitude, lat: pad.latitude }
  return shitLog(
    distance(
      Number(shitLog(c.latitude)),
      Number(shitLog(c.longitude)),
      Number(shitLog(l.lat)),
      Number(shitLog(l.lon)),
    ),
  )
}

function getClosest(position, launches) {
  return launches.launches
    .filter(x => x.location.pads[0])
    .filter(x => x.location.pads[0].longitude)
    .sort(
      (x, y) => calculateDistance(x, position) - calculateDistance(y, position),
    )
}

export default ({ position, launches }) => {
  const b = position && getClosest(position, launches).slice(0, 1)
  return position ? (
    b.map(x => (
      <Container>
        <Row>
          <Col xs="6">
            <Card style={{ width: '400px' }}>
              <CardBody>
                <CardTitle>Closest Launch</CardTitle>
                <CardSubtitle>{x.name}</CardSubtitle>
                <CardText>{x.location.pads[0].agencies[0].name}</CardText>
                <img
                  style={{
                    maxWidth: '100%',
                    clipPath: 'inset(0px 50px 0px 50px)',
                    transform: 'scale(1.45)',
                  }}
                  alt="weather"
                  src={`https://renderer.yellowiki.xyz/screenshot?url=https://darksky.net/details/${
                    x.location.pads[0].latitude
                  },${x.location.pads[0].longitude}/${moment(x.isostart).format(
                    'YYYY-MM-DD',
                  )}/us12/en&selector=.dayExtras`}
                />
              </CardBody>
              <CardImg top width="50%" src={x.rocket.imageURL} alt="Rocket" />
              <CardBody>
                <CardTitle>Where to view</CardTitle>
                <CardText>
                  <Button
                    color="info"
                    target="_blank"
                    href={x.location.pads[0] ? x.location.pads[0].mapURL : ''}
                  >
                    Open Map
                  </Button>
                  <div style={{ height: '10px' }} />
                  <ButtonGroup style={{ textAlign: 'center' }}>
                    <Button
                      color="primary"
                      target="_blank"
                      href={`https://www.google.com/maps/search/Hotels/@${
                        x.location.pads[0].latitude
                      },${x.location.pads[0].longitude},12.75z`}
                    >
                      Find nearby hotels
                    </Button>
                    <Button
                      color="primary"
                      target="_blank"
                      href={`https://www.google.com/maps/search/attractions/@${
                        x.location.pads[0].latitude
                      },${x.location.pads[0].longitude},12.75z`}
                    >
                      &nbsp Find nearby attractions
                    </Button>
                  </ButtonGroup>
                  <CardText>
                    Launches on {moment(x.isostart).calendar()}
                  </CardText>
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <iframe
                title="weather"
                id="map-embed-iframe"
                frameBorder="0"
                height="500px"
                width="100%"
                src={`https://maps.darksky.net/@wind_speed,${
                  x.location.pads[0].latitude
                },${
                  x.location.pads[0].longitude
                },5?domain=&quot;+encodeURIComponent(window.location.href)+&quot;&auth=1540140785_b7ab7cf7f90f02bd0fe0259f7a4f027d&embed=true&amp;timeControl=false&amp;fieldControl=false&amp;defaultField=wind_speed&amp;defaultUnits=_mph`}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    ))
  ) : (
    <>
      {position === false ? (
        'Error: Location Access Denied'
      ) : (
        <>
          <MDSpinner /> <b>Loading</b>
        </>
      )}
    </>
  )
}
