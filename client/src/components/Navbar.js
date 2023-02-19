import { ConnectKitButton } from "connectkit";

const Navbar = () => {
  return (
    <div className="w-full shadow-xl flex justify-between  items-center gap-4 py-3 px-10  ">
      <p className="text-3xl font-bold "> 💸 FreeFlo </p>
      <ConnectKitButton />{" "}
    </div>
  );
};

export default Navbar;
