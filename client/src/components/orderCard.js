import * as React from "react";
import { useAccount, useSigner, useProvider, useContractEvent } from "wagmi";
import { Toaster, toast } from "react-hot-toast";
import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";

// import getBalance from "@/hooks/getBalance";
// import { ERC20ABI } from "@/ABIs/ERC20ABI";
import { FreeFlowABI } from "@/ABIs/FREEFLOWABI";
import { fDai_addr, fDaiX_addr, freeFlow_addr } from "../../config";

const OrderCard = (props) => {
  const { data: signer } = useSigner();
  const provider = useProvider();

  // const CreateFLow = async (recipient, flowRate) => {
  //   const chainId = await window.ethereum.request({ method: "eth_chainId" });
  //   const sf = await Framework.create({
  //     chainId: Number(chainId),
  //     provider: provider,
  //   });

  //   const superSigner = sf.createSigner({ signer: signer });
  //   const daix = await sf.loadSuperToken("fDAIx");

  //   try {
  //     const createFlowOperation = daix.createFlow({
  //       sender: freeFlow_addr,
  //       receiver: await superSigner.getAddress(),
  //       flowRate: 100,
  //       // userData?: string
  //     });
  //     console.log(createFlowOperation);
  //     console.log("Creating your stream...");

  //     const result = await createFlowOperation.exec(superSigner);
  //     console.log(result);

  //     console.log(
  //       `Congrats - you've just created a money stream!
  //     `
  //     );
  //   } catch (error) {
  //     console.log(
  //       "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
  //     );
  //     console.error(error);
  //   }
  // };
  // CreateFLow();

  const [quantity, setQuantity] = React.useState(1);

  const FreeFlow = new ethers.Contract(
    freeFlow_addr,
    FreeFlowABI,
    signer || undefined
  );

  // const provider = useProvider();
  // const { isConnected, address } = useAccount();
  // const balance = getBalance();

  // const [approved, setApproved] = React.useState(false);

  // const fDAI = new ethers.Contract(fDai_addr, ERC20ABI, signer || undefined);
  // const fDAIx = new ethers.Contract(fDaiX_addr, ERC20ABI, signer || undefined);

  // const approveCoins = async () => {
  //   await fDAIx.approve(freeFlow_addr, "10000000000000000000000000");
  //   await fDAI.approve(freeFlow_addr, "10000000000000000000000000");
  //   setApproved(true);
  // };

  const PlaceOrder = async () => {
    const { hash } = await FreeFlow.placeOrder(
      props.O_id,
      props.eta,
      props.price
    );
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full"
                src="./etherscan.jpeg"
                alt=""
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Verify Your Tx Here:
              </p>
              <p className="mt-1 text-sm text-gray-500">
                <a
                  className="truncate underline flex flex-wrap"
                  href={`https://etherscan.io/tx/${hash}`}
                >{`Here.`}</a>
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="w-[350px] border-2 border-dotted border-red-500 h-[550px] bg-[#383838] rounded-md p-2 shadow-md">
      <Toaster />
      <img
        src={props.image}
        alt={props.name}
        className="w-[350px] h-[350px] object-center object-cover"
      ></img>
      <div className="flex justify-between items-center gap-2 mt-3">
        <p className="text-3xl font-extrabold"> {props.name}</p>
        <p className="font-mono"> {props.price * quantity} fDaiX</p>
      </div>
      <p className="opacity-75 mt-2 italic text-center">
        Order will reach in {props.eta} minutes
      </p>
      <div className="w-full px-3 py-3 flex gap-3 justify-center items-center">
        <button
          className="border flex justify-center items-center rounded-full border-white w-8 h-8 hover:bg-slate-900"
          onClick={() => (quantity == 1 ? quantity : setQuantity(quantity - 1))}
        >
          -
        </button>
        <p>{quantity}</p>
        <button
          className="border flex justify-center items-center rounded-full border-white w-8 h-8 hover:bg-slate-900"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>
      <div className="flex justify-center   ">
        {/* {approved && ( */}
        <button
          onClick={async () => PlaceOrder()}
          className="rounded-md px-3 py-1 text-xl font-extrabold bg-purple-600 border border-white"
        >
          Order Now
        </button>
        {/* )} */}
        {/* {!approved && <button onClick={approveCoins()} className="rounded-md px-3 py-1 text-xl font-extrabold bg-purple-600 border border-white">
            Approve Contract
          </button>} */}
      </div>
    </div>
  );
};

export default OrderCard;
