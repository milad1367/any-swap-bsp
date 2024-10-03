

import { SelfStakingPool } from "../generated/templates";
import {
  OwnershipTransferred as OwnershipTransferredEvent,
  SelfPoolCreated as SelfPoolCreatedEvent
} from "../generated/SelfStakingPoolFactory/SelfStakingPoolFactory"
import { OwnershipTransferred, SelfPoolCreated } from "../generated/schema"
import { log } from "@graphprotocol/graph-ts";

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSelfPoolCreated(event: SelfPoolCreatedEvent): void {
  log.info("handleSelfPoolCreated triggered for Pool: {} by Creator: {}", [
    event.params.pool.toString(),
    event.params.creatorAddress.toHexString() // Added the second argument
  ]);
  let entity = new SelfPoolCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.pool = event.params.pool
  entity.ticketValue = event.params.ticketValue
  entity.endTime = event.params.endTime
  entity.capacity = event.params.capacity
  entity.creatorAddress = event.params.creatorAddress
  entity.creatorPercent = event.params.creatorPercent
  entity.owner = event.params.owner
  entity.ownerPercent = event.params.ownerPercent
  
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.sumOfStake = 0;
  entity.save()
  SelfStakingPool.create(event.params.pool);

}
