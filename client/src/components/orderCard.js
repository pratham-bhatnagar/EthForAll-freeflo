import * as React from "react";
import { useAccount, useSigner, useProvider, useContractEvent } from "wagmi";
import { Toaster, toast } from "react-hot-toast";
import { ethers } from "ethers";


// import getBalance from "@/hooks/getBalance";
// import { ERC20ABI } from "@/ABIs/ERC20ABI";
import { FreeFlowABI } from "@/ABIs/FREEFLOWABI";
import { fDai_addr, fDaiX_addr, freeFlow_addr } from "../../config";

const OrderCard = (props) => {
    
  // const { isConnected, address } = useAccount();
  // const balance = getBalance();

  const { data: signer } = useSigner();
  // const provider = useProvider();

  const [quantity, setQuantity] = React.useState(1);
  // const [approved, setApproved] = React.useState(false);

  // const fDAI = new ethers.Contract(fDai_addr, ERC20ABI, signer || undefined);
  // const fDAIx = new ethers.Contract(fDaiX_addr, ERC20ABI, signer || undefined);
  const FreeFlow = new ethers.Contract(
    freeFlow_addr,
    FreeFlowABI,
    signer || undefined
  );
  //  const sendNotif = async () => {
  //   const apiResponse = await PushAPI({
  //     signer,
  //     type: 1,
  //     identityType: 0,
  //     notification: {
  //       title: `Order Successfully Placed`,
  //       body: `Your Order is placed successfully.}`,
  //     },
  //     payload: {
  //       title: `[sdk-test] payload title`,
  //       body: `sample msg body`,
  //       cta: "",
  //       img: "",
  //     },
  //     channel: "eip155:5:0x0b686717E78a46b8f1f49Eb519D0713e3D0D8182", // your channel address
  //     env: "staging",
  //   });
  // };




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
    toast(`Verify your Order here: https://goerli.etherscan.io/tx/${hash}`, {
      icon: "📝",
    });
    sendNotif()
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
