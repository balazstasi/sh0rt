import Content from "./views/Content";
import { Footer, MantineProvider } from "@mantine/core";
import { TypographyStylesProvider } from "@mantine/core";
import { RandomWordProvider } from "./utils/hooks/useRandomWord";
import { LocalDBProvider } from "./state/hooks/useLocalDB";

function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: "Archivo Narrow, sans-serif",
        fontFamilyMonospace: "Roboto Mono, monospace",
        headings: { fontFamily: "Proza Libre, sans-serif" },
        colorScheme: "dark",
        primaryShade: 9,
        colors: {
          brand: ["#ffffff", "#000000", "#f7d65a"],
        },
        primaryColor: "brand",
      }}
    >
      <TypographyStylesProvider>
        <RandomWordProvider limit={100}>
          <LocalDBProvider>
            <Content />

            <Footer />
          </LocalDBProvider>
        </RandomWordProvider>
      </TypographyStylesProvider>
    </MantineProvider>
  );
}

export default App;
