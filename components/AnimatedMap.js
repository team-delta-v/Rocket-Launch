import React, { Component } from 'react'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps'
import { Button, ButtonGroup } from 'reactstrap'
import { Motion, spring } from 'react-motion'
import * as jq from 'jquery'

function shitLog(x) {
  console.log(x)
  return x
}

const wrapperStyles = {
  width: '100%',
  maxWidth: 980,
  margin: '0 auto',
}

class AnimatedMap extends Component {
  constructor() {
    super()
    this.state = {
      center: [0, 20],
      zoom: 1,
    }
  }

  handleZoomIn = () => {
    this.setState({
      zoom: this.state.zoom * 2,
    })
  }

  handleZoomOut = () => {
    this.setState({
      zoom: this.state.zoom / 2,
    })
  }

  handleCityClick = city => {
    this.setState({
      zoom: 2,
      center: city.coordinates,
    })

    const tingle = require('tingle.js')
    const modal = new tingle.modal({
      footer: true,
      stickyFooter: false,
      closeMethods: ['overlay', 'button', 'escape'],
      closeLabel: 'Close',
      cssClass: ['custom-class-1', 'custom-class-2'],
      onOpen() {
        console.log('modal open')
      },
      onClose() {
        console.log('modal closed')
      },
      beforeClose() {
        // Here's goes some logic
        // e.g. save content before closing the modal
        return true // Close the modal
        return false // Nothing happens
      },
    })

    // Set content
    modal.setContent(`<h1>${city.name}</h1>`)

    // Add a button
    modal.addFooterBtn('More Info', 'tingle-btn tingle-btn--primary', () => {
      // Here goes some logic
      modal.close()

      const elem = document.getElementById(`number-${city.eyedee}`)

      elem.scrollIntoView()

      jq(elem).css('background-color', '#ffe500')

      setTimeout(() => {
        jq(elem).css('background-color', '#ffffff')
      }, 1000)
    })
    // Open modal
    modal.open()
  }

  handleReset = () => {
    this.setState({
      center: [0, 20],
      zoom: 1,
    })
  }

  render() {
    return (
      <div style={wrapperStyles}>
        <ButtonGroup>
          <Button color="primary" onClick={this.handleZoomIn}>
            Zoom in
          </Button>
          <Button color="primary" onClick={this.handleZoomOut}>
            Zoom out
          </Button>
          <Button color="danger" onClick={this.handleReset}>
            Reset
          </Button>
        </ButtonGroup>

        <Motion
          defaultStyle={{
            zoom: 1,
            x: 0,
            y: 20,
          }}
          style={{
            zoom: spring(this.state.zoom, { stiffness: 210, damping: 20 }),
            x: spring(this.state.center[0], { stiffness: 210, damping: 20 }),
            y: spring(this.state.center[1], { stiffness: 210, damping: 20 }),
          }}
        >
          {({ zoom, x, y }) => (
            <ComposableMap
              projectionConfig={{ scale: 205 }}
              width={980}
              height={551}
              style={{
                width: '100%',
                height: 'auto',
              }}
            >
              <ZoomableGroup center={[x, y]} zoom={zoom}>
                <Geographies geography="/static/world-110m.json">
                  {(geographies, projection) =>
                    geographies.map(
                      (geography, i) =>
                        geography.id !== '010' && (
                          <Geography
                            key={i}
                            geography={geography}
                            projection={projection}
                            style={{
                              default: {
                                fill: '#ECEFF1',
                                stroke: '#607D8B',
                                strokeWidth: 0.75,
                                outline: 'none',
                              },
                              hover: {
                                fill: '#CFD8DC',
                                stroke: '#607D8B',
                                strokeWidth: 0.75,
                                outline: 'none',
                              },
                              pressed: {
                                fill: '#FF5722',
                                stroke: '#607D8B',
                                strokeWidth: 0.75,
                                outline: 'none',
                              },
                            }}
                          />
                        ),
                    )
                  }
                </Geographies>
                <Markers>
                  {this.props.cities.map((city, i) => (
                    <Marker
                      key={i}
                      marker={city}
                      onClick={this.handleCityClick}
                    >
                      <circle
                        cx={0}
                        cy={0}
                        r={6}
                        fill="#FF5722"
                        stroke="#DF3702"
                      />
                    </Marker>
                  ))}
                </Markers>
              </ZoomableGroup>
            </ComposableMap>
          )}
        </Motion>
      </div>
    )
  }
}

export default AnimatedMap
