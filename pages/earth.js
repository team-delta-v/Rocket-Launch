const Globe = require('@abcnews/react-globe')

const BRISBANE = [153.021072, -27.470125]

export default class App extends React.Component {
  render() {
    return <Globe center={BRISBANE} />
  }
}
