import OrderCard from "@/components/orderCard";
import { useContractEvent, useSigner } from "wagmi";
import axios from "axios";
import { FreeFlowABI } from "@/ABIs/FREEFLOWABI";
import { freeFlow_addr } from "config";
import Countdown from "react-countdown";
import * as PushAPI from "@pushprotocol/restapi";
import { useEffect, useState } from "react";

const Customer = () => {
  const { data: signer } = useSigner();

  const [time, setTime] = useState(0);

  const sendNotif = async (date) => {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 1,
      identityType: 0,
      notification: {
        title: `Order Successfully Placed`,
        body: `Your Order is placed successfully. It will reach by ${new Date(
          date * 1000
        ).toLocaleString()}`,
      },
      payload: {
        title: `[sdk-test] payload title`,
        body: `sample msg body`,
        cta: "",
        img: "",
      },
      channel: "eip155:5:0x0b686717E78a46b8f1f49Eb519D0713e3D0D8182", // your channel address
      env: "staging",
    });
    console.log(apiResponse);
  };

  useContractEvent({
    address: freeFlow_addr,
    abi: FreeFlowABI,
    eventName: "OrderPlaced",
    listener(id, _price, _orderPlacedTime, _estimateTimeOfDelivery, OrderedBy) {
      setTime(Number(_estimateTimeOfDelivery._hex));
      axios
        .post("http://localhost:7878/api/post", {
          id: id._hex,
          price: _price._hex,
          orderPlacedTime: _orderPlacedTime._hex,
          estimateTimeOfDelivery: _estimateTimeOfDelivery._hex,
          OrderedBy: OrderedBy,
        })
        .then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
      sendNotif(_estimateTimeOfDelivery._hex);
    },
    once: true,
  });

 
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // flow logic
      return (
        <div>
          <p>
            Sorry For the Delay. 💸 We have stared a Cashback Flow for the
            Delayed Time{" "}
          </p>
        </div>
      );
    } else {
      // Render a countdown
      return (
        <span className="text-center">
         ⏳ Order will be at your Doorstep in {" "}
     <p className="font-extrabold">    {hours == 0 ? "":`${hours} hours(s) `}  {minutes==0?"":`${minutes} minute(s) `}  {seconds==0?"":`${seconds} second(s) `}  </p> 
        </span>
      );
    }
  };
  // useEffect(() => {}, [orderPlaced]);

  return (
    <>
      <p className="text-6xl mt-5 text-center font-extrabold">
        Choose your Meal
      </p>
      <div className="py-[4vh] px-10 flex flex-wrap justify-center gap-6">
        <OrderCard
          O_id={1}
          image="./food1.webp"
          name="McSpiecy"
          price="100"
          eta={30}
        />
        <OrderCard
          O_id={6}
          image="./chezza.jpeg"
          name="KFC Chezza"
          price={130}
          eta={40}
        />
        <OrderCard
          O_id={2}
          image="./momos.webp"
          name="WOW! Momo"
          price={80}
          eta={5}
        />
        <OrderCard
          O_id={3}
          image="./biryani.jpeg"
          name="Biryani"
          price={200}
          eta={19}
        />
        <OrderCard
          O_id={4}
          image="./maharajaThali.jpeg"
          name="Maharaja Thali"
          price={250}
          eta={30}
        />
        <OrderCard
          O_id={5}
          image="./pizza.jpeg"
          name="Pizza"
          price={150}
          eta={1}
        />
      </div>

      {time != 0 && (
        <div className="w-full flex justify-center font-mono bg-yellow-900 p-2 fixed bottom-0">
         
          <Countdown
            renderer={renderer}
            date={Date.now() + (time * 1000 - Date.now())}
          ></Countdown>
        </div>
      )}
    </>
  );
};

export default Customer;
