import { BigInt } from "@graphprotocol/graph-ts"
import {
  ramenLoot,
  Approval,
  ApprovalForAll,
  OwnershipTransferred,
  Transfer
} from "../generated/ramenLoot/ramenLoot"
import { RamenLoot } from "../generated/schema"

export function handleApproval(event: Approval): void {

  let entity = RamenLoot.load(event.transaction.from.toHex())

  if (!entity) {
    entity = new RamenLoot(event.transaction.from.toHex())
  }

  let ramenLootCall = ramenLoot.bind(event.address);

  entity.id = event.params.tokenId.toI32();
  entity.owner = event.params.owner;
  entity.ingredient  = ramenLootCall.getIngredients(event.params.tokenId).toString()
  entity.ingredient2 = ramenLootCall.getIngredients2(event.params.tokenId)
  entity.noodles  = ramenLootCall.getNoodles(event.params.tokenId)
  entity.sideDishes = ramenLootCall.getSideDishes(event.params.tokenId)
  entity.soup = ramenLootCall.getSoup(event.params.tokenId)
  entity.save()

}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleTransfer(event: Transfer): void {}
