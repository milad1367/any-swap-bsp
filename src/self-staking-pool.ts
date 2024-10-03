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
import { log } from "@graphprotocol/graph-ts";

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
  log.info("handleSelfPoolStake triggered for Pool: {} by Staker: {}", [
    event.params.pool.toHexString(),
    event.params.staker.toHexString(),
  ]);

  // Check if entity exists
  let entity = new SelfPoolStake(event.transaction.hash.concatI32(event.logIndex.toI32()));
  if (!entity) {
    log.warning("SelfPoolStake entity creation failed", []);
  } else {
    log.info("SelfPoolStake entity created successfully", []);
  }

  entity.staker = event.params.staker;
  entity.pool = event.params.pool;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  // Load the pool entity
  let pool = SelfPoolCreated.load(event.params.pool);
  if (pool) {
    log.info("Pool found with ID: {}", [event.params.pool.toHexString()]);
    pool.sumOfStake++;
    log.info("Updated sumOfStake for Pool ID: {} to {}", [event.params.pool.toHexString(), pool.sumOfStake.toString()]);
    pool.save();
  } else {
    log.error("Failed to load Pool with ID: {}", [event.params.pool.toHexString()]);
  }

  entity.save();
  log.info("SelfPoolStake entity saved successfully", []);
}
