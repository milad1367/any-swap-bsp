import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  SelfPoolCreated
} from "../generated/SelfStakingPoolFactory/SelfStakingPoolFactory"

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createSelfPoolCreatedEvent(
  pool: Address,
  ticketValue: BigInt,
  endTime: BigInt,
  capacity: BigInt,
  creatorAddress: Address,
  creatorPercent: BigInt,
  owner: Address,
  ownerPercent: BigInt
): SelfPoolCreated {
  let selfPoolCreatedEvent = changetype<SelfPoolCreated>(newMockEvent())

  selfPoolCreatedEvent.parameters = new Array()

  selfPoolCreatedEvent.parameters.push(
    new ethereum.EventParam("pool", ethereum.Value.fromAddress(pool))
  )
  selfPoolCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "ticketValue",
      ethereum.Value.fromUnsignedBigInt(ticketValue)
    )
  )
  selfPoolCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  )
  selfPoolCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "capacity",
      ethereum.Value.fromUnsignedBigInt(capacity)
    )
  )
  selfPoolCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "creatorAddress",
      ethereum.Value.fromAddress(creatorAddress)
    )
  )
  selfPoolCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "creatorPercent",
      ethereum.Value.fromUnsignedBigInt(creatorPercent)
    )
  )
  selfPoolCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  selfPoolCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "ownerPercent",
      ethereum.Value.fromUnsignedBigInt(ownerPercent)
    )
  )

  return selfPoolCreatedEvent
}
