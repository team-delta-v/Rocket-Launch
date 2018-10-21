import MDSpinner from 'react-md-spinner'

export default ({ position, launches }) =>
  position ? (
    <div style={{ border: '1px solid', padding: '3px 5px' }}>
      <h2>Recommended Launch</h2>
      {JSON.stringify(shitLog(launches.sort((x, y) => )))}
    </div>
  ) : (
    <>
      <MDSpinner /> <b>Loading</b>
    </>
  )
