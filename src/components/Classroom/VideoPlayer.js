import React from 'react';
import videojs from 'video.js'

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

      <div> 
        <article className="media">
          <div className="media-content">
            <div data-vjs-player>
              <video ref={ node => this.videoNode = node } className="video-js"></video>
            </div>
          </div>
        </article>
        <div className="field">
          <form onSubmit={ev => this.props.confirmWatched(ev, this.props)} >
          <div className="field">
              <div className="control">
                <label className="primary" >
                    Bitte sehen Sie sich das Schulungsvideo Aufmerksam bis zu Ende an. Sobald das Video zu Ende ist können Sie dies bestätigen.
                </label>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="checkbox" disabled={this.props.disabled} >
                  <input 
                    className="checkbox" type="checkbox" 
                    disabled={this.props.disabled} 
                    required
                    // onInvalid={this.setCustomValidity('Please Enter valid email')}
                    // onInput={setCustomValidity('')}
                    />
                  Hiermit bestätige das ich das Schulungsvideo gesehen habe.
                </label>
              </div>
            </div>
            <div className="field">
              <div className="control">
              {/* {console.log(this.props)} */}
                <button className="button" type="submit" disabled={this.props.disabled}>gesehen</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
