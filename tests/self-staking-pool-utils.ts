import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  SelfPoolSetWinner,
  SelfPoolStake
} from "../generated/SelfStakingPool/SelfStakingPool"

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

export function createSelfPoolSetWinnerEvent(
  winner: Address,
  pool: Address,
  creator: Address,
  owner: Address,
  poolIsMature: boolean
): SelfPoolSetWinner {
  let selfPoolSetWinnerEvent = changetype<SelfPoolSetWinner>(newMockEvent())

  selfPoolSetWinnerEvent.parameters = new Array()

  selfPoolSetWinnerEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )
  selfPoolSetWinnerEvent.parameters.push(
    new ethereum.EventParam("pool", ethereum.Value.fromAddress(pool))
  )
  selfPoolSetWinnerEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  selfPoolSetWinnerEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  selfPoolSetWinnerEvent.parameters.push(
    new ethereum.EventParam(
      "poolIsMature",
      ethereum.Value.fromBoolean(poolIsMature)
    )
  )

  return selfPoolSetWinnerEvent
}

export function createSelfPoolStakeEvent(
  staker: Address,
  pool: Address
): SelfPoolStake {
  let selfPoolStakeEvent = changetype<SelfPoolStake>(newMockEvent())

  selfPoolStakeEvent.parameters = new Array()

  selfPoolStakeEvent.parameters.push(
    new ethereum.EventParam("staker", ethereum.Value.fromAddress(staker))
  )
  selfPoolStakeEvent.parameters.push(
    new ethereum.EventParam("pool", ethereum.Value.fromAddress(pool))
  )

  return selfPoolStakeEvent
}
