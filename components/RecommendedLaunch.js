import MDSpinner from 'react-md-spinner'

function calculateDistance(x1, y1, x2, y2) {
  return y2 - y1 + (x2 - x1)
}

export default ({ position, launches }) =>
  position ? (
    <div style={{ border: '1px solid', padding: '3px 5px' }}>
      <h2>Recommended Launch</h2>
      {JSON.stringify(
        shitLog(
          launches.launches
            .filter(x => x.location.pads[0])
            .sort(
              (x, y) =>
                calculateDistance(
                  x.location.pads[0].longitude,
                  position.coords.lon,
                  x.location.pads[0].latitude,
                  position.coords.lat,
                ) -
                calculateDistance(
                  y.location.pads[0].longitude,
                  position.coords.lon,
                  y.location.pads[0].latitude,
                  position.coords.lat,
                ),
            ),
        ),
      )}
    </div>
  ) : (
    <>
      <MDSpinner /> <b>Loading</b>
    </>
  )
