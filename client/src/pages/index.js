import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";
export default function Home() {
  const { isConnected } = useAccount();
  return (
    <>
      <div className="font-mono">
        <div className="px-10 w-full h-[50vh] pt-10  flex gap-4">
          <div className=" w-[30%]">
            <img src="./food.avif" className="object-contain"></img>
          </div>
          <div className=" w-[70%] p-5">some text</div>
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
