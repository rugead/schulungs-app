import React from 'react';
import videojs from 'video.js'
// import { Column } from 'rbx';
import { Column, Field, Label, Checkbox, Button, Box, Help, Control, Input } from 'rbx'

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personalnummer: ''
    };

    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
    });
    const handleDisabled = () => this.props.handleDisabled()
    const myPlayer = videojs(this.videoNode)
  
    myPlayer.on('ended', function() {
      handleDisabled()
    });   
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = ev => {
    ev.preventDefault();
    this.props.confirmWatched(ev, this.props, this.state.personalnummer)
  }
  
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    const {personalnummer} = this.state 
    // const isInvalid = personalnummer !== personalnummer
    return (
      <Column.Group>
        <Column>
            <div data-vjs-player>
              <video ref={ node => this.videoNode = node } className="video-js"></video>
            </div>
        </Column>
        <Column size="one-third">
          <Box>
            Bitte sehen Sie sich das Schulungsvideo Aufmerksam und bis zu Ende an. 
            Sobald das Video zu Ende ist können Sie dies durch anhaken bestätigen und Ihre Personalnummer eingeben. 
            Durch anklicken des Buttons "gesehen" wird die Bestätigung gesendet.
          </Box>
        <Box>
          <form onSubmit={this.onSubmit} >
          {console.log(this.props)}
            <Field>
            <Label>Bestätigung</Label>
              <Label> 
                <Checkbox
                  disabled={this.props.disabled} 
                  name="gesehen"
                  // checked={isAdmin}
                  // onChange={this.onChangeCheckbox}
                  autoComplete="off"
                  required
                  />
                  &nbsp;&nbsp;Hiermit bestätige ich, dass ich das Schulungsvideo gesehen und verstanden habe.  
              </Label>
            </Field>
            <Field>
              <Label>Personalnummer</Label>
              <Control>
                <Input
                  name="personalnummer"
                  // type="text"
                  value={personalnummer}
                  onChange={this.onChange}
                  placeholder="Personalnummer"
                  autoComplete="off"
                  type='number'
                  min={2000}
                  max={3999}
                  disabled={this.props.disabled}
                  required
                />
              </Control>
              <Help>Die Personalnummer ist eine Zahl zwischen 2000 und 3999</Help>
            </Field>


            <Button color="success" type="submit" disabled={this.props.disabled}>gesehen</Button>
          </form>
        </Box>
        </Column>
        </Column.Group>
    )
  }
}
