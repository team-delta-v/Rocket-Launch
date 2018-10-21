import MDSpinner from 'react-md-spinner'
import distance from 'geo-dist'
import moment from 'moment'

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
    )[0]
}

export default ({ position, launches }) => {
  const x = getClosest(position, launches)
  return position ? (
    <div style={{ border: '1px solid', padding: '3px 5px' }}>
      <h2>Recommended Launch</h2>
      {x.name}
      {moment(x.isostart).calendar()}
    </div>
  ) : (
    <>
      <MDSpinner /> <b>Loading</b>
    </>
  )
}
