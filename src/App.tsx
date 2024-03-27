import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "./hooks/useTonConnect";
import { useCounterContract } from "./hooks/useCounterContract";

import "@twa-dev/sdk";

function App() {
  const { connected, transferTon } = useTonConnect();
  const { value, address, sendIncrement } = useCounterContract();
  return (
    <div className="App">
      <div className="Container">
        <TonConnectButton />
        <div className="Card">
          <b>Counter Address</b>
          <div className="Hint">{address?.slice(0, 30) + "..."}</div>
        </div>
        <div className="Card">
          <b>Counter Value</b>
          <div>{value ?? "Loading..."}</div>
        </div>
        <a
          className={`Button ${connected ? "Active" : "Disabled"}`}
          onClick={() => {
            sendIncrement();
          }}
        >
          Increment
        </a>
        <a
          className={`Button ${connected ? "Active" : "Disabled"}`}
          onClick={() => transferTon("1", "billID1111")}
        >
          Send 1 TON
        </a>
      </div>
    </div>
  );
}

export default App;
