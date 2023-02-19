import Link from "next/link";
const ChoiceCard = (props) => {
  return (
    <div className="w-[300px] h-[500px] transition ease-in-out delay-100  hover:scale-110 duration-200  relative border border-white rounded-lg ">
      <img
        src={props.image}
        className="w-full h-full z-0 object-cover rounded-lg  "
      />
      <Link href={`/${props.slug}`}>
        <button className="z-10 bg-purple-600 absolute opacity-90 border border-white right-[17%] bottom-10 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 hover:shadow-lg rounded-md p-4 font-bold">
          {props.text}
        </button>
      </Link>
    </div>
  );
};

export default ChoiceCard;
