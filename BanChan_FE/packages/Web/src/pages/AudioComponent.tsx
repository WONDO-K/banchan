// import React, { Component, createRef } from "react";
// import { LocalAudioTrack, RemoteAudioTrack } from "openvidu-browser";

// interface AudioComponentProps {
//   track: LocalAudioTrack | RemoteAudioTrack;
// }

// class AudioComponent extends Component<AudioComponentProps> {
//   audioElement = createRef<HTMLAudioElement>();

//   componentDidMount() {
//     const { track } = this.props;
//     if (this.audioElement.current) {
//       track.attach(this.audioElement.current);
//     }
//   }

//   componentWillUnmount() {
//     const { track } = this.props;
//     track.detach();
//   }

//   render() {
//     const { track } = this.props;
//     return <audio ref={this.audioElement} id={track.sid} />;
//   }
// }

// export default AudioComponent;

import React from "react";

const AudioComponent: React.FC = () => {
  return <div>AudioComponent</div>;
};

export default AudioComponent;
