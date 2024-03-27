import { useTonConnectUI } from "@tonconnect/ui-react";
import { Sender, SenderArguments } from "@ton/core";
import { Address, toNano } from "@ton/core";
import { beginCell } from "@ton/ton";

export function useTonConnect(): {
  sender: Sender;
  connected: boolean;
  transferTon: (ton_amount: string, text: string) => void;
} {
  const [tonConnectUI] = useTonConnectUI();

  return {
    sender: {
      send: async (args: SenderArguments) => {
        tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString("base64"),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000,
        });
      },
    },
    connected: tonConnectUI.connected,
    transferTon: async (ton_amount: string, text: string) => {
      const body = beginCell()
        .storeUint(0, 32) // write 32 zero bits to indicate that a text comment will follow
        .storeStringTail(text) // write our text comment
        .endCell();
      tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 360,
        messages: [
          {
            address: Address.parse(
              "0QB6ahxEuPUmT9w8VDxcXY0Ftw6kT6daXDPiZNo6rLyklNbC"
            ).toRawString(),
            amount: toNano(ton_amount).toString(),
            payload: body.toBoc().toString("base64"), // payload with comment in body
          },
        ],
      });
    },
  };
}
