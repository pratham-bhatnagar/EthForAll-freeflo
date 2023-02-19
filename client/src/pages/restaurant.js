import axios from "axios";
import * as React from "react";
import { freeFlow_addr } from "config";
import {FreeFlowABI} from '../ABIs/FREEFLOWABI'
import { ethers } from "ethers";
import { useSigner } from "wagmi";
const Restaurant = () => {
  const { data: signer } = useSigner();
  const [order, setOrder] = React.useState([]);

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
                Confirm here
              </th>
            </tr>
            {order &&
              order.map((i) => {
                return (
                  <tr className="bg-slate-700">
                    <th className="m-2 border text-sm border-white gap-5 py-5 p-3">
                      {i.id}
                    </th>
                    <th className="m-2 border text-sm border-white gap-5 py-5 p-3">
                      {i.price}
                    </th>

                    
                    <th className="m-2 border text-sm border-white gap-5 py-5 p-3">
                      {(new Date(i.estimateTimeOfDelivery * 1000)).toLocaleString()}
                    </th>
                    <th className="truncate border text-sm border-white py-5 m-2 gap-5 p-3">
                      {i.OrderedBy}
                    </th>
                    <th className="border text-sm border-white py-5 m-2 gap-5 p-3">
                      <button
                      onClick={async()=>{
                      const {hash} = await FreeFlow.orderDelivered(
                        i.OrderedBy,10
                      )
                      }}
                        className="bg-purple-600  opacity-90 border border-white  bottom-10 transition ease-in-out delay-100   hover:bg-indigo-500 duration-300 hover:shadow-lg rounded-xl p-1 px-2 font-bold
                "
                      >
                        Confirm
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
