const ChoiceCard = (props) => {
  return (
    <div className="w-[300px] h-[500px] relative border border-white rounded-lg ">
      <img
        src={props.image}
        className="w-full h-full z-0 object-cover rounded-lg opacity-75 absolute  "
      />
      <button className="z-10 bg-purple-600 absolute opacity-90 border border-white right-[20%] bottom-10 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 hover:shadow-lg rounded-md p-4 font-bold">
        {props.text}
      </button>
    </div>
  );
};

export default ChoiceCard;
