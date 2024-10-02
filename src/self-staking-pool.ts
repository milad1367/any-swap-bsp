import {
  OwnershipTransferred as OwnershipTransferredEvent,
  SelfPoolSetWinner as SelfPoolSetWinnerEvent,
  SelfPoolStake as SelfPoolStakeEvent,
} from "../generated/SelfStakingPool/SelfStakingPool"
import {
  OwnershipTransferred,
  SelfPoolSetWinner,
  SelfPoolStake,
  SelfPoolCreated,
} from "../generated/schema"

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent,
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSelfPoolSetWinner(event: SelfPoolSetWinnerEvent): void {
  let entity = new SelfPoolSetWinner(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.winner = event.params.winner
  entity.pool = event.params.pool
  entity.creator = event.params.creator
  entity.owner = event.params.owner
  entity.poolIsMature = event.params.poolIsMature

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSelfPoolStake(event: SelfPoolStakeEvent): void {
  let entity = new SelfPoolStake(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.staker = event.params.staker
  entity.pool = event.params.pool

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  let pool = SelfPoolCreated.load(event.params.pool);
  
  if(pool) {
  pool.sumOfStake++;
  pool.save();
  }

  entity.save()
}
