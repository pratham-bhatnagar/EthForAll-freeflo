import "@/styles/globals.css";
import { WagmiConfig, createClient } from "wagmi";
import {goerli,polygonMumbai} from 'wagmi/chains'
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import Navbar from "@/components/Navbar";

const chains = [goerli,polygonMumbai];
const client = createClient(
  getDefaultClient({
    appName: "CashFlow",
    chains
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
