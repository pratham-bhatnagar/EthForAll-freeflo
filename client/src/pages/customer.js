import OrderCard from "@/components/orderCard";
import { useContractEvent } from "wagmi";
import axios from "axios";
import { FreeFlowABI } from "@/ABIs/FREEFLOWABI";
import { freeFlow_addr } from "config";

const Customer = () => {
  // const { data: signer } = useSigner();
 

  useContractEvent({
    address: freeFlow_addr,
    abi: FreeFlowABI,
    eventName: "OrderPlaced",
    listener(id, _price, _orderPlacedTime, _estimateTimeOfDelivery, OrderedBy) {
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
        
     
    },
    once: true,
  });

  const notification = async () => {
    sendNotif();
  };
  

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
    </>
  );
};

export default Customer;
