import React from "react";
import styled from "styled-components";

export default class PeersConnected extends React.Component {

  render() {
    return (
      <PeersConnectedContainer>
        {this.props.peers || "You are alone"}
      </PeersConnectedContainer>
    );
  }
}

const PeersConnectedContainer = styled.div`
  background: #FFF;
`;
