import { useAccount, useBalance } from "wagmi";

const getBalance = () => {
  const { address } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address: address,
  });

  {
    if (isLoading) {
      return "...";
    }
    if (isError) {
      return "Error";
    }
    if (data) {
      return data?.formatted;
    }
  }
};

export default getBalance;
