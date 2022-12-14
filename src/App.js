import {useState} from "react";
import "./styles.css";
import { Faucet } from "./components/Faucet";
import { TransferAPT } from "./components/TransferAPT";
import { Divider } from "./components/Divider";
import { TransferToken } from "./components/TransferToken";
import { AcceptToken } from "./components/AcceptToken";
import {
  AptosClient,
	FaucetClient,
	AptosAccount,
} from "aptos";

export const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
export const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

export default function App() {
	const [privateKey, setPrivateKey] = useState("0x945cc283b8c6cfecf800ed53032a128dbeb45ddcb022d96bfa34dae5f956898d");
  const client = new AptosClient(NODE_URL);
	const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

	const newAccount = async () => {
		const account = new AptosAccount();
		const priKeyObj = account.toPrivateKeyObject();
		const privateKey = priKeyObj.privateKeyHex;
		console.log(account.address());
		setPrivateKey(privateKey);
	}

	return (
    <div className="App">
      <h1>Hello Aptos</h1>
      <h2>Example code of aptos and move</h2>
      <h3>(Only available for devnet)</h3>
			<div>
        <button onClick={() => newAccount()}>Get a new account or paste your private key below</button>
      </div>

      <div>
        <input
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          placeholder="Private key"
        />
      </div>
      <Divider />
      <Faucet client={client} priKey={privateKey}/>
      <Divider />
      <TransferAPT client={client} priKey={privateKey}/>
      <Divider />
      <TransferToken client={client} priKey={privateKey}/>
      <Divider />
      <AcceptToken client={client}/>
    </div>
  );
}
