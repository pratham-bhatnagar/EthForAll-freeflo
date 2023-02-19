// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IFakeDAI} from "./IFakeDAI.sol";
import { ISuperfluid, ISuperToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";
import { SuperTokenV1Library } from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

import './IERC20.sol';


contract Dprotocol{

    
    using CFAv1Library for CFAv1Library.InitData;
    CFAv1Library.InitData public cfaV1; 
    IERC20 public goerliDAI;
    using SuperTokenV1Library for ISuperToken;

    ISuperToken public goerliDaiX;

    // Host address on Goerli = 0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9
    // fDAIx address on Goerli = 0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00
    // fDAI : 0x88271d333C72e51516B67f5567c728E702b3eeE8
    constructor(ISuperfluid _host, ISuperToken _goerliDaiX, IERC20 _goerliDAI) {

        //initialize InitData struct, and set equal to cfaV1        
        cfaV1 = CFAv1Library.InitData(
            _host,
            //here, we are deriving the address of the CFA using the host contract
            IConstantFlowAgreementV1(
                address(_host.getAgreementClass(
                        keccak256("org.superfluid-finance.agreements.ConstantFlowAgreement.v1")
                    ))
            )
        );

        goerliDaiX = _goerliDaiX;
        goerliDAI = _goerliDAI;
    }


    struct Order{
        uint256 Id;
        uint256 OrderPlacedTime;
        uint256 TimePromised;
        uint256 EstimeTimeofDelivery;
        address OrderedBy;
        uint256 Price;
    }

    modifier canBeStreamed(address OderedBy){
        Order memory userOrder = UserOrder[OderedBy];
        require(userOrder.EstimeTimeofDelivery <= block.timestamp, "Estimated Time not Passed");
        _;
    }

    event OrderPlaced(uint256 id,uint256 _price, uint256 _orderPlacedTime, uint256 _estimateTimeOfDelivery, address OrderedBy);
    event OrderDelivered( address OrderedBy);
    mapping (address => Order) public UserOrder;

    function placeOrder(uint256 _id, uint256 _timePromised, uint256 price) public payable{
        Order memory _userOrder;
        _userOrder.Id = _id;
        _userOrder.OrderPlacedTime = block.timestamp;
        _userOrder.Price = price;
        _userOrder.OrderedBy = msg.sender;
        _userOrder.TimePromised = block.timestamp + (60 * _timePromised);
        _userOrder.EstimeTimeofDelivery = block.timestamp + (60 * _timePromised);
        UserOrder[msg.sender] = _userOrder;
        goerliDAI.transferFrom(msg.sender,address(this),price);
        emit OrderPlaced(_userOrder.Id,_userOrder.Price,_userOrder.OrderPlacedTime,_userOrder.EstimeTimeofDelivery,_userOrder.OrderedBy);
        
        
    }

    function Stream(address Orderedby) public  payable{
        Order storage _order = UserOrder[Orderedby];
        int256 rate = int256(_order.Price/(25 * 60));
        int96 flowRate = int96(rate);
        goerliDaiX.createFlow(_order.OrderedBy,flowRate);
 
    }

    function orderDelivered(address Orderedby, uint256 balanceToBeTransfred) public payable{
        goerliDAI.transfer(msg.sender,balanceToBeTransfred);
        emit OrderDelivered(Orderedby);

    }
}
