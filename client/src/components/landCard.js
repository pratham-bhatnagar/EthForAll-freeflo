const LandCard = props => { 
   
    return ( 
        <div className="w-[300px] text-lg h-[150px] p-2 text-center bg-violet-600 hover:bg-blue-600 hover:border-dotted duration-200 border-solid border-2 border-slate-500 rounded "> {props.text} </div>

    )
}
export default LandCard