export const FreeFlowABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "Orderedby",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balanceToBeTransfred",
        type: "uint256",
      },
    ],
    name: "orderDelivered",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperfluid",
        name: "_host",
        type: "address",
      },
      {
        internalType: "contract ISuperToken",
        name: "_goerliDaiX",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "_goerliDAI",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "OrderedBy",
        type: "address",
      },
    ],
    name: "OrderDelivered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_orderPlacedTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_estimateTimeOfDelivery",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "OrderedBy",
        type: "address",
      },
    ],
    name: "OrderPlaced",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_timePromised",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "placeOrder",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "Orderedby",
        type: "address",
      },
    ],
    name: "Stream",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "cfaV1",
    outputs: [
      {
        internalType: "contract ISuperfluid",
        name: "host",
        type: "address",
      },
      {
        internalType: "contract IConstantFlowAgreementV1",
        name: "cfa",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "goerliDAI",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "goerliDaiX",
    outputs: [
      {
        internalType: "contract ISuperToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "UserOrder",
    outputs: [
      {
        internalType: "uint256",
        name: "Id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "OrderPlacedTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "TimePromised",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "EstimeTimeofDelivery",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "OrderedBy",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "Price",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
