import { LocationType, MiddleOfTable } from '@gamepark/odin/material/LocationType'
import { MaterialType } from '@gamepark/odin/material/MaterialType'
import { CustomMoveType } from '@gamepark/odin/rules/CustomMoveType'
import { RuleId } from '@gamepark/odin/rules/RuleId'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType, isMoveItemTypeAtOnce } from '@gamepark/rules-api'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations.when().rule(RuleId.PlayCards).move(isCustomMoveType(CustomMoveType.Pass)).mine().none()
gameAnimations.when().rule(RuleId.PlayCards).move(isCustomMoveType(CustomMoveType.Pass)).duration(1.5)

gameAnimations
  .when()
  .move((move) => isCustomMoveType(CustomMoveType.TurnTempo)(move) && !move.data)
  .mine()
  .none()

gameAnimations
  .when()
  .move((move) => isCustomMoveType(CustomMoveType.TurnTempo)(move) && !move.data)
  .duration(1)

gameAnimations
  .when()
  .move((move) => isCustomMoveType(CustomMoveType.TurnTempo)(move) && move.data)
  .duration(2)

gameAnimations
  .when()
  .move((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.MiddleOfTable && move.location.id === MiddleOfTable.Next)
  .mine()
  .duration(0.2)

gameAnimations
  .when()
  .move((move, context) => {
    if (!isMoveItemType(MaterialType.Card)(move) || move.location.type !== LocationType.Hand) return false
    const item = context.rules.material(MaterialType.Card).getItem(move.itemIndex)
    return item.location.type === LocationType.MiddleOfTable && item.location.id === MiddleOfTable.Next
  })
  .mine()
  .duration(0.2)

gameAnimations
  .when()
  .move((move) => isMoveItemTypeAtOnce(MaterialType.Card)(move) && move.location.type === LocationType.MiddleOfTable && move.location.id === MiddleOfTable.Next)
  .mine()
  .none()

gameAnimations
  .when()
  .move((move) => isMoveItemTypeAtOnce(MaterialType.Card)(move) && move.location.type === LocationType.MiddleOfTable && move.location.id === MiddleOfTable.Next)
  .duration(0.7)

gameAnimations
  .when()
  .rule(RuleId.DealCards)
  .move((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Hand)
  .duration(0.1)

gameAnimations
  .when()
  .rule(RuleId.PickCard)
  .move((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Hand)
  .mine()
  .duration(0.5)

gameAnimations
  .when()
  .rule(RuleId.PickCard)
  .move((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Hand)
  .duration(0.7)

gameAnimations
  .when()
  .move((move) => isMoveItemTypeAtOnce(MaterialType.Card)(move) && move.location.type === LocationType.Discard)
  .duration(0.7)

gameAnimations
  .when()
  .move(
    (move) => isMoveItemTypeAtOnce(MaterialType.Card)(move) && move.location.type === LocationType.MiddleOfTable && move.location.id === MiddleOfTable.Current
  )
  .duration(0.7)
