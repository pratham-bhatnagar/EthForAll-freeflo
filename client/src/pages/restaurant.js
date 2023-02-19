import axios from "axios";
import * as React from "react";
import { freeFlow_addr } from "config";
import { FreeFlowABI } from "../ABIs/FREEFLOWABI";
import { ethers } from "ethers";
import { useSigner,useContractEvent } from "wagmi";
import * as PushAPI from "@pushprotocol/restapi";
import Countdown from "react-countdown";
const Restaurant = () => {
  const { data: signer } = useSigner();
  const [order, setOrder] = React.useState([]);

  const sendNotif = async () => {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 1,
      identityType: 0,
      notification: {
        title: `Order Successfully Delivered`,
        body: `Your Order is Delivered successfully.`,
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
  address:freeFlow_addr,
  abi:FreeFlowABI,
  eventName: 'OrderDelivered',
  listener(orderedBy){
    axios.delete('http://localhost:7878/api/deliverd',{
      OrderedBy:orderedBy
    }).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    sendNotif()
  },
  once:true,
})

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // flow logic
      return (
        <div>
          <p>Due to delay, We have started a backflow </p>
        </div>
      );
    } else {
      // Render a countdown
      return (
        <span className="text-center">
          <p className="font-extrabold">
            {" "}
            {hours == 0 ? "" : `${hours} hours(s) `}{" "}
            {minutes == 0 ? "" : `${minutes} minute(s) `}{" "}
            {seconds == 0 ? "" : `${seconds} second(s) `}{" "}
          </p>
        </span>
      );
    }
  };
  const FreeFlow = new ethers.Contract(
    freeFlow_addr,
    FreeFlowABI,
    signer || undefined
  );
  React.useState(async () => {
    let response = await axios.get("http://localhost:7878/api/getAll");
    setOrder(response.data);
  }, []);

  {
    return (
      <div>
        <p className="text-5xl text-center mt-4 font-extrabold">
          Orders Dashboard
        </p>
        <div className="flex justify-center mt-4">
          <table className="table-auto border table  border-white">
            <tr className="border  border-white text-2xl">
              <th className="  px-7 py-4 bg-gray-800 border-2 border-white">
                ID
              </th>
              <th className="border-2 px-7 py-4 bg-gray-800 border-white">
                Price
              </th>

              <th className="border-2 px-7 py-4 bg-gray-800 border-white">
                estimateTimeOfDelivery
              </th>
              <th className="border-2 px-7 py-4 bg-gray-800 border-white">
                OrderedBy
              </th>
              <th className="border-2 px-7 py-4 bg-gray-800 border-white">
                Time Remaining:
              </th>
              <th className="border-2 px-7 py-4 bg-gray-800 border-white">
                Confirm here
              </th>
            </tr>
            {order &&
              order.map((i) => {
                return (
                  <tr key={i.id} className="bg-slate-700">
                    <th className="m-2 border text-sm border-white gap-5 py-5 p-3">
                      {i.id}
                    </th>
                    <th className="m-2 border text-sm border-white gap-5 py-5 p-3">
                      {i.price}
                    </th>

                    <th className="m-2 border text-sm border-white gap-5 py-5 p-3">
                      {new Date(
                        i.estimateTimeOfDelivery * 1000
                      ).toLocaleString()}
                    </th>
                    <th className="truncate border text-sm border-white py-5 m-2 gap-5 p-3">
                      {i.OrderedBy}
                    </th>
                    <th className=" border text-sm border-white py-5 m-2 gap-5 p-3">
                      {" "}
                      <Countdown
                        renderer={renderer}
                        date={
                          Date.now() +
                          (i.estimateTimeOfDelivery * 1000 - Date.now())
                        }
                      ></Countdown>
                    </th>
                    <th className="border text-sm border-white py-5 m-2 gap-5 p-3">
                      <button
                        onClick={async () => {
                          const { hash } = await FreeFlow.orderDelivered(
                            i.OrderedBy,
                            100
                          );
                          console.log(hash)
                        }}
                        className="bg-purple-600  opacity-90 border border-white  bottom-10 transition ease-in-out delay-100   hover:bg-indigo-500 duration-300 hover:shadow-lg rounded-xl p-1 px-2 font-bold
                "
                      >
                        Confirm Delivery
                      </button>
                    </th>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
};
export default Restaurant;
