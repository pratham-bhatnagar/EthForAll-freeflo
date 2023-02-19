import { useAccount } from "wagmi";
import LandCard from "@/components/landCard";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";
export default function Home() {
  const { isConnected } = useAccount();
  return (
    <>
      <div className="font-mono">
        <div className="px-10 w-full h-[50vh] pt-10  flex gap-4">
          <div className=" h-[600px] w-[30%]">
            <img
              src="./vector1.png"
              className="object-cover h-[600px] max-w-full"
            ></img>
          </div>{" "}
          <div className="w-[70%] flex-col">
            <div className=" w-full p-5 text-white text-6xl font-bold">
              Stream cashbacks every second.
            <div className="w-full p-4 text-3xl"> Tired of late deliveries? </div>
            </div>
            <div className=" w-full p-5  mt-[100px] grid gap-y-10 grid-cols-3">
              {" "}
              <LandCard text="Don't fret! We've got you covered with our cashback policy. 👽" />{" "}
              <LandCard text="Say goodbye to the stress of late deliveries! 🚚" />{" "}
              <LandCard text="Our cashback policy ensures you're never left waiting. ⏰" />{" "}
              <LandCard text="For every late delivery, you'll receive a cashback depending on the delay time. ⏳" />{" "}
              <LandCard text="Get reimbursed for any delays, based on how long it takes. 💰" />{" "}
              <LandCard text="So sit back and relax, because we guarantee prompt deliveries or your MONEY BACK! 💸" />
            </div>
          </div>
        </div>

        <div className="flex justify-center p-4 mt-[100px]">
          {" "}
          {isConnected ? (
            <Link href="/choice">
              <button
                className={`z-10 bg-purple-600  opacity-90 border border-white  bottom-10 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 hover:shadow-lg rounded-md p-4 font-bold `}
              >
                {" "}
                Launch App
              </button>
            </Link>
          ) : (
            <ConnectKitButton />
          )}
        </div>
      </div>
    </>
  );
}
