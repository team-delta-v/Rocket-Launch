import MDSpinner from 'react-md-spinner'
import distance from 'geo-dist'
import moment from 'moment'
import {
  ButtonGroup,
  Card,
  CardBody,
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
  const xx = position && getClosest(position, launches).slice(0, 1)
  return position ? (
    xx.map(x => (
      <Card style={{ width: '400px' }}>
        <CardBody>
          <CardTitle>Recommended Launch</CardTitle>
          <CardSubtitle>{x.name}</CardSubtitle>
          <CardText>{x.location.pads[0].agencies[0].name}</CardText>
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
            <ButtonGroup>
              <Button
                color="info"
                target="_blank"
                href={`https://www.google.com/maps/search/Hotels/@${
                  x.location.pads[0].latitude
                },${x.location.pads[0].longitude},12.75z`}
              >
                Find nearby hotels
              </Button>
              <Button
                color="info"
                target="_blank"
                href={`https://www.google.com/maps/search/attractions/@${
                  x.location.pads[0].latitude
                },${x.location.pads[0].longitude},12.75z`}
              >
                Find nearby attractions
              </Button>{' '}
            </ButtonGroup>
          </CardText>

          <CardText>Launches on {moment(x.isostart).calendar()}</CardText>
        </CardBody>
      </Card>
    ))
  ) : (
    <>
      <MDSpinner /> <b>Loading</b>
    </>
  )
}
