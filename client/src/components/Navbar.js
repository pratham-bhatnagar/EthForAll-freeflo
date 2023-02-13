import { ConnectKitButton } from "connectkit";

const Navbar = () => {
  return (
    <div className="w-full flex flex-col  items-center gap-4 p-2   ">
      <p className="text-6xl font-bold "> 🌊 </p>
      <ConnectKitButton />{" "}
    </div>
  );
};

export default Navbar;
