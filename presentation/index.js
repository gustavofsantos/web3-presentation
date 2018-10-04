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

import Iframe from 'react-iframe';

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");

const theme = createTheme({
  primary: "#FFFFFF",
  secondary: "#1F2022",
  tertiary: "#0000ff",
  quarternary: "#1e2a78",
  backgroundPrimary: "#F7F7F7",
  backgroundSecondary: "#414141",
  foregroundPrimary: "#1A1A1A",
  foregroundSecondary: "#FFFFE3",
  accent: "#f9ff21",
  accentDarker: "#ffd615",
  accent2: "#ff1f5a"
}, {
  primary: "Montserrat",
  secondary: "Helvetica"
});

const styles = {
  verticalDiv: {
    display: "flex"
  },
  button: {
    background: "#0000ff",
    color: "#FFF",
    border: "none",
    borderRadius: "12px",
    padding: "14px",
    width: "100%",
    margin: "10px"
  },
  input: {
    background: "#414141",
    color: "#f9ff21",
    border: "none",
    borderRadius: "12px",
    padding: "14px",
    width: "100%",
    margin: "10px"
  }
};

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
        <Slide transition={["zoom"]} bgColor="backgroundPrimary">
          <Heading size={1} fit caps textColor="foregroundPrimary">
            A internet de amanhã
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            Gustavo Santos
          </Text>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            gfdsantos@inf.ufpel.edu.br
          </Text>
        </Slide>

        <Slide>
          <Image src="../assets/city.jpg" />
        </Slide>

        <Slide transition={["slide"]} bgColor="backgroundPrimary">
          <Heading size={1} fit caps bold textColor="foregroundPrimary">
            Blockchain
          </Heading>
        </Slide>

        <Slide transition={["slide"]} bgColor="backgroundPrimary">
          <Heading size={1} fit caps bold textColor="foregroundPrimary">
            Ethereum
          </Heading>
        </Slide>

        <Slide transition={["slide"]} bgColor="backgroundPrimary">
          <Heading size={1} fit caps bold textColor="foregroundPrimary">
            IPFS
          </Heading>
        </Slide>

        <Slide transition={["slide"]} bgColor="backgroundPrimary">
          <Heading size={2} fit caps textColor="foregroundPrimary">
            Conectado a
          </Heading>
          <Heading size={2} fit caps>
            {this.state.peersConnected}
          </Heading>
          <Heading size={2} fit caps textColor="foregroundPrimary">
            Computadores
          </Heading>
        </Slide>

        <Slide transition={["slide"]} bgColor="backgroundPrimary">
          <input style={styles.input} value={this.state.inputIpfsContent} onChange={this.handleInputIpfsContentChange}/>
          <button style={styles.button} onClick={this.handleInputIpfsContentSubmit}>Adicionar</button>
          <Text fit>{this.state.inputIpfsContentToHash}</Text>
        </Slide>

        <Slide transition={["slide"]} bgColor="backgroundPrimary">
          <input style={styles.input} value={this.state.inputIpfsHash} onChange={this.handleInputIpfsHashChange}/>
          <button style={styles.button} onClick={this.handleInputIpfsHashSubmit}>Ver</button>
          <Text fit>{this.state.inputIpfsHashToContent}</Text>
        </Slide>

        <Slide transition={["slide"]} bgColor="backgroundSecondaryDarker">
          <Heading size={1} fit caps textColor="foregroundSecondary">
            Buzzwords
          </Heading>
        </Slide>

        <Slide transition={["slide"]} bgColor="backgroundPrimary">
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


        <Slide transition={["slide"]} bgColor="backgroundPrimary">
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

        <Slide transition={["slide"]} bgColor="backgroundPrimary">
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

        <Slide transition={["slide"]} bgColor="backgroundPrimary">
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

        <Slide transition={["slide"]} bgColor="backgroundSecondaryDarker">
          <Heading textColor="accent" fit bold caps>
            Imagine isso: internet eterna.
          </Heading>
        </Slide>

        <Slide transition={["slide"]} bgImage={"https://tecnoblog.net/wp-content/uploads/2017/03/060-1-700x438.jpg"} bgColor="backgroundSecondaryDarker">
          test
        </Slide>

        <Slide transition={["slide"]} bgColor="backgroundSecondaryDarker">
          <Heading textColor="accent">
            Beaker Browser
          </Heading>

          <Link href={"https://beakerbrowser.com/"} />
        </Slide>


        <Slide transition={["slide"]} bgColor="backgroundSecondaryDarker">
          <Heading textColor="accent">
            Qual o custo da sua rede social preferida?
          </Heading>

          <Text>
            Se algum serviço é gratuíto, o produto é você.
          </Text>
        </Slide>

        <Slide transition={["slide"]} bgColor="backgroundSecondaryDarker">
          <Heading textColor="accent">
            O Google não deleta as informação que você deletou.
          </Heading>
        </Slide>

        <Slide transition={["slide"]} bgColor="backgroundSecondaryDarker">
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

        <Slide transition={["slide"]} bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>Standard List</Heading>
          <List>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 4</ListItem>
          </List>
        </Slide>

        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote>Example Quote</Quote>
            <Cite>Author</Cite>
          </BlockQuote>
        </Slide>
      </Deck>
    );
  }
}
