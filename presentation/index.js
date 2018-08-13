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

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");

const theme = createTheme({
  primary: "white",
  secondary: "#1F2022",
  tertiary: "#03A9FC",
  quarternary: "#CECECE",
  backgroundPrimary: "#F7F7F7",
  backgroundSecondary: "#5f1854",
  backgroundSecondaryDarker: "#3b0944",
  foregroundPrimary: "#1A1A1A",
  foregroundSecondary: "#FFFFE3",
  accent: "#1abb9c",
  accendLighter: "#6ef7c8",
  accentDarker: "#00818a"
}, {
  primary: "Montserrat",
  secondary: "Helvetica"
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transition={["zoom", "slide"]} transitionDuration={500} theme={theme} progress="bar">
        <Slide transition={["zoom"]} bgColor="backgroundSecondary">
          <Heading size={1} fit caps lineHeight={1} textColor="foregroundSecondary">
            Web3 - O futuro da web
          </Heading>
          <Text margin="10px 0 0" textColor="accent" size={1} fit bold>
            Gustavo Santos - gfdsantos@inf.ufpel.edu.br
          </Text>
        </Slide>

        <Slide transition={["slide"]} bgColor="backgroundSecondaryDarker">
          <Heading size={2} fit caps textColor="foregroundSecondary">
            Buzzwords dessa apresentação
          </Heading>

          <Heading margin="0.5em 0 0" size={6} textColor="foregroundSecondary">Ethereum (Smart Contracts)</Heading>
          <Heading size={6} textColor="foregroundSecondary">Decentralização</Heading>
          <Heading size={6} textColor="foregroundSecondary">IPFS & DAT</Heading>
          <Heading size={6} textColor="foregroundSecondary">React</Heading>
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
            O Google não deleta as informações que você deletou
          </Heading>

          <Text>
            https://www.theguardian.com/commentisfree/2018/mar/28/all-the-data-facebook-google-has-on-you-privacy
          </Text>
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
