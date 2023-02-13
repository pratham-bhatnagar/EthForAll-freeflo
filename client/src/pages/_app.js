import "@/styles/globals.css";
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import Navbar from "@/components/Navbar";


const client = createClient(
  getDefaultClient({
    appName: "CashFlow",
  })
);

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="auto" mode="dark">
      <Navbar />
        <Component {...pageProps} />
      
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
