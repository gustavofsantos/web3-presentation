// Import React
import React from "react";

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
  Link,
  Image
} from "spectacle";

import Iframe from "react-iframe";

// Import theme
import createTheme from "spectacle/lib/themes/default";
import Button from "./components/button";
import Input from "./components/input";

// Require CSS
require("normalize.css");

const theme = createTheme({
  background: "#222222",
  foreground: "#c8c8c8",
  accent: "#ff1f5a"
}, {
  primary: "Patua One",
  secondary: "Share"
});

export default class Presentation extends React.Component {
  constructor(props) {
    super(props);
    this.ipfs = window.ipfs || new window.Ipfs({
      EXPERIMENTAL: {
        pubsub: true
      },
      config: {
        Addresses: {
          Swarm: [
            "/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star",
            "/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ"
          ]
        }
      }
    });

    if (this.ipfs.isOnline) {
      this.state = {
        ipfsOnline: this.ipfs.isOnline(),
        peersConnected: 0,
        inputIpfsHash: "",
        inputIpfsContent: ""
      };
    } else {
      // using companion
      this.state = {
        ipfsOnline: true,
        peersConnected: 0,
        inputIpfsHash: "",
        inputIpfsHashToContent: "",
        inputIpfsContent: "",
        inputIpfsContentToHash: ""
      };
    }
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.ipfsOnline) {
        this.ipfs.swarm.peers((err, peers) => {
          if (peers.length > 0) {
            this.setState({
              peersConnected: peers.length
            });
          }
        });
      }
    }, 5000);
  }

  handleInputIpfsHashChange = (ev) => {
    this.setState({
      inputIpfsHash: ev.target.value
    });
  }

  handleInputIpfsHashSubmit = async () => {
    const file = await this.ipfs.files.cat(this.state.inputIpfsHash);
    const content = file.toString("utf8");
    this.setState({
      inputIpfsHashToContent: content
    });
  }

  handleInputIpfsContentChange = (ev) => {
    this.setState({
      inputIpfsContent: ev.target.value
    });
  }

  handleInputIpfsContentSubmit = async () => {
    const files = await this.ipfs.files.add(Buffer.from(this.state.inputIpfsContent));
    this.setState({
      inputIpfsContentToHash: files[0].hash
    });
  }

  render() {
    return (
      <Deck transition={["zoom", "slide"]} transitionDuration={500} theme={theme} progress="bar">
        <Slide transition={["zoom"]} bgColor="background">
          <Heading size={1} fit caps textColor="foreground">
            WEB3
          </Heading>
          <Text textColor="foreground" fit>
            Construindo um bote salva-vidas
          </Text>
          <Text textColor="foreground" fit>
            para a internet do amanhã
          </Text>
          <Text margin="10px 0 0" textColor="accent" size={1} fit>
            Gustavo Santos
          </Text>
          <Text margin="10px 0 0" textColor="foreground" size={1} fit>
            gfdsantos@inf.ufpel.edu.br
          </Text>
        </Slide>

        <Slide transition={["slide"]} bgColor="background">
          <Heading textColor="foreground" fit>
            Why we need be
          </Heading>
          <Heading textColor="accent" fit caps>
            Off-grid
          </Heading>
        </Slide>

        <Slide transition={["slide"]} bgColor="background">
          <Heading fit bold caps>
            Facebook domination
          </Heading>
        </Slide>

        <Slide transition={["slide"]} bgColor="foreground">
          <BlockQuote>
            <Quote>
              Facebook obriga 90 milhões de usuários a fazer login de novo após invasão
            </Quote>
            <Cite>
              Felipe Ventura
            </Cite>
            <Text textColor="accent" fit>
              https://tecnoblog.net/261806/facebook-vaza-dados-50-milhoes-usuarios/
            </Text>
          </BlockQuote>
        </Slide>

        <Slide transition={["slide"]} bgColor="background">
          <Heading fit bold caps>
            Governaments want to
          </Heading>
          <Heading fit bold caps>
            rule our lives
          </Heading>
        </Slide>

        <Slide transition={["slide"]} bgColor="background">
          <Heading>
            Decentralization
          </Heading>
          <Heading>
            is the new mainstream
          </Heading>
        </Slide>

        <Slide transition={["slide"]}>
          <Heading>
            But, how to decentralize things?
          </Heading>
        </Slide>

        <Slide transition={["slide"]} bgImage={"https://camo.githubusercontent.com/b7c1183c4f2d5441697e678c1331c89f4e9b220d/68747470733a2f2f692e696d6775722e636f6d2f723047335351712e706e67"} />

        <Slide transition={["slide"]}>
          <List fit>
            <ListItem>
              Layer 0: EVM, LibP2P
            </ListItem>
            <ListItem>
              Layer 1: Ethereum, IPFS, Whisper, Swarm
            </ListItem>
            <ListItem>
              Layer 2: Protocolos de consenso
            </ListItem>
            <ListItem>
              Layer 3: Web3.js, Solidity
            </ListItem>
            <ListItem>
              Layer 4: Metamask, Parity
            </ListItem>
          </List>
        </Slide>

        <Slide transition={["slide"]} bgColor="background">
          <Heading size={1} fit caps bold textColor="foreground">
            Blockchain
          </Heading>
        </Slide>

        <Slide transition={["slide"]} bgColor="background">
          <Heading size={1} fit caps bold textColor="foreground">
            Ethereum
          </Heading>
        </Slide>


        <Slide transition={["slide"]} bgColor="background">
          <Heading size={1} fit caps bold textColor="foreground">
            IPFS
          </Heading>
        </Slide>

        <Slide transition={["slide"]} bgColor="background">
          <Heading size={2} fit caps textColor="foreground">
            Conectado a
          </Heading>
          <Heading size={2} fit caps>
            {this.state.peersConnected}
          </Heading>
          <Heading size={2} fit caps textColor="foreground">
            Computadores
          </Heading>
        </Slide>

        <Slide transition={["slide"]} bgColor="background">
          <Input
            value={this.state.inputIpfsContent}
            handleInputChange={this.handleInputIpfsContentChange}
          />
          <Button
            text="ADICIONAR"
            handleOnClick={this.handleInputIpfsContentSubmit}
          />
          <Text fit>{this.state.inputIpfsContentToHash}</Text>
        </Slide>

        <Slide transition={["slide"]} bgColor="background">
          <Input
            value={this.state.inputIpfsHash}
            handleInputChange={this.handleInputIpfsHashChange}
          />
          <Button
            text="VER"
            handleOnClick={this.handleInputIpfsHashSubmit}
          />
          <Text fit>{this.state.inputIpfsHashToContent}</Text>
        </Slide>

        <Slide transition={["slide"]} bgColor="background">
          <Heading size={1} fit caps textColor="background">
            Buzzwords
          </Heading>
        </Slide>

        <Slide transition={["slide"]} bgColor="background">
          <Iframe url="https://datproject.org/"
            height="80vh"
            width="80vw"
            position="absolute"
            styles={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            }}
            allowFullScreen
          />
        </Slide>


        <Slide transition={["slide"]} bgColor="background">
          <Iframe url="https://beakerbrowser.com/"
            height="80vh"
            width="80vw"
            position="absolute"
            styles={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            }}
            allowFullScreen
          />
        </Slide>

        <Slide transition={["slide"]} bgColor="background">
          <Iframe url="https://ipfs.io/"
            height="80vh"
            width="80vw"
            position="absolute"
            styles={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            }}
            allowFullScreen
          />
        </Slide>

        <Slide transition={["slide"]} bgColor="background">
          <Text>Ethereum</Text>
          <Iframe url="https://www.ethereum.org/  "
            height="80vh"
            width="80vw"
            position="absolute"
            styles={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            }}
            allowFullScreen
          />
        </Slide>

        <Slide transition={["slide"]} bgColor="background">
          <Heading textColor="accent" fit bold caps>
            Imagine isso: internet eterna.
          </Heading>
        </Slide>

        <Slide transition={["slide"]} bgImage={"https://tecnoblog.net/wp-content/uploads/2017/03/060-1-700x438.jpg"} bgColor="background">
          test
        </Slide>

        <Slide transition={["slide"]} bgColor="background">
          <Heading textColor="accent">
            Beaker Browser
          </Heading>

          <Link href={"https://beakerbrowser.com/"} />
        </Slide>


        <Slide transition={["slide"]} bgColor="background">
          <Heading textColor="accent">
            Qual o custo da sua rede social preferida?
          </Heading>

          <Text>
            Se algum serviço é gratuíto, o produto é você.
          </Text>
        </Slide>

        <Slide transition={["slide"]} bgColor="background">
          <Heading textColor="accent">
            O Google não deleta as informação que você deletou.
          </Heading>
        </Slide>

        <Slide transition={["slide"]} bgColor="background">
          <Iframe url="https://www.theguardian.com/commentisfree/2018/mar/28/all-the-data-facebook-google-has-on-you-privacy"
            height="80vh"
            width="80vw"
            position="absolute"
            styles={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            }}
          />
        </Slide>
      </Deck>
    );
  }
}
