import Card from "@/components/card";

export default function Choice() {
  return (
    <div className="font-mono ">
      <div className="w-full flex justify-center p-3 gap-8">
        <Card text="Join as Customer" image="./people.webp" />
        <Card text="Join as Restaurant" image="./people.webp" />
      </div>
    </div>
  );
}
