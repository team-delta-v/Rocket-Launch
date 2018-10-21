import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

function shitLog(x) {
  console.log(x)
  return x
}

export default class MoreInfo extends React.Component {
  state = {}

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    })
  }

  render() {
    return (
      <div>
        <Button color="success" onClick={this.toggle}>
          More Information
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>
            <div>
              <a
                href={
                  this.props.data.location.pads[0] &&
                  this.props.data.location.pads[0].agencies
                    ? this.props.data.location.pads[0].agencies[0].wikiURL
                    : ''
                }
              >
                <h2>
                  {this.props.data.location.pads[0] &&
                  this.props.data.location.pads[0].agencies
                    ? this.props.data.location.pads[0].agencies[0].name
                    : 'Unknown agency'}
                </h2>
              </a>
            </div>
            <p>
              {this.props.missions ? this.props.missions[0].description : ''}
            </p>

            <h3>Rocket Information:</h3>

            <ul>
              <li>
                <strong>Name: </strong>
                {this.props.data.rocket.name ? this.props.data.rocket.name : ''}
              </li>
              <li>
                <strong>Configuration: </strong>
                {this.props.data.rocket.configuration
                  ? this.props.data.rocket.configuration
                  : ''}
              </li>
              <li>
                <strong>Family Name: </strong>
                {this.props.data.rocket.familyname
                  ? this.props.data.rocket.familyname
                  : ''}
              </li>
            </ul>
            <p>
              <iframe
                src={(
                  this.props.data.vidURLs[0] || 'https://www.google.com'
                ).replace(
                  /www\.youtube\.com\/watch\?v=/,
                  'www.youtube.com/embed/',
                )}
                title="space video 20"
                style={{ height: '400px', width: '100%' }}
                frameBorder="0"
              />
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
