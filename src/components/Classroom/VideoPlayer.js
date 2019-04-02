import React from 'react';
import videojs from 'video.js'
// import { Column } from 'rbx';
import { Column, Field, Label, Control, Checkbox, Button, Box } from 'rbx'
export default class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
    });
    const handleDisabled = () => this.props.handleDisabled()
    const myPlayer = videojs(this.videoNode)
  
    myPlayer.on('ended', function() {
      handleDisabled()
    });   
  }
  
  componentDidUpdate() {
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    return (
      <Column.Group>
        <Column>
            <div data-vjs-player>
              <video ref={ node => this.videoNode = node } className="video-js"></video>
            </div>
        </Column>
        <Column>
        <Box>
          <form onSubmit={ev => this.props.confirmWatched(ev, this.props)} >
            <Field>
              <Control>
                <Label>
                    Bitte sehen Sie sich das Schulungsvideo Aufmerksam und bis zu Ende an. 
                    Sobald das Video zu Ende ist können Sie dies durch anhaken bestätigen. 
                    Durch anklicken des Buttons "gesehen" wird die Bestätigung an uns gesendet.
                </Label>
              </Control>
            </Field>
            <Field>
              <Control>
                <Label disabled={this.props.disabled} >
                  <Checkbox  
                    disabled={this.props.disabled} 
                    required
                    // onInvalid={this.setCustomValidity('Please Enter valid email')}
                    // onInput={setCustomValidity('')}
                    />

                  Hiermit bestätige ich, dass ich das Schulungsvideo gesehen und verstanden habe.
                </Label>
              </Control>

              <Control>
              {/* {console.log(this.props)} */}
                <Button color="success" type="submit" disabled={this.props.disabled}>gesehen</Button>
              </Control>
            
            </Field>
          </form>
        </Box>
        </Column>
        </Column.Group>
    )
  }
}
