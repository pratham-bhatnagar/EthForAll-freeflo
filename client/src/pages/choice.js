import Card from "@/components/card";

export default function Choice() {
  return (
    <div className="font-mono my-[100px]">
      <div className="w-full flex justify-center p-3 gap-8">
        <Card text="Join as Customer" image="./customer.webp" slug="customer"/>
        <Card text="Join as Restaurant" image="./delivery.png" slug="restaurant" />
      </div>
    </div>
  );
}
