import { Container, Text, Button, Image } from "@mantine/core";
import { MdOutlineArrowDownward } from "react-icons/md";
import { Link } from "react-scroll";
import Logo from "../Images/logos/black_transparent.png";

const About = () => {
  return (
    <section id="about">
      <Container fluid>
        <div className="about-content" style={{ background: "black", color: "white" }}>
          <div className="title ">
            <Image
              src={Logo}
              alt={"sample1"}
              style={{ width: "30%", textAlign: "center", margin: "auto", marginBottom: "12vh" }}
            />
            <Text variant="text" weight={400} size="md" className="desc">
              <div
                style={{
                  color: "white",
                  textAlign: "center",
                  margin: "auto",
                  fontFamily: "Archivo Narrow, sans-serif",
                }}
              >
                Save & Access
              </div>
              <div className="mid" style={{ color: "white", fontSize: 10 }}>
                all your links from one place
              </div>
              <div
                style={{
                  color: "white",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                .sh/0rt & simple
              </div>
            </Text>
            <Link to="shorten-url-input" smooth duration={500}>
              <Button
                size="lg"
                variant="filled"
                radius={0}
                bg="white"
                style={{
                  fontSize: "3vmin",
                  color: "black",
                  width: "fit-content",
                  border: 0,
                  height: 60,
                  textAlign: "center",
                  margin: "auto",
                }}
                rightIcon={<MdOutlineArrowDownward />}
              >
                Click here to get started
              </Button>
            </Link>
            {/* </Anchor> */}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
