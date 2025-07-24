import { LocationType } from '@gamepark/odin/material/LocationType'
import { MaterialType } from '@gamepark/odin/material/MaterialType'
import { CustomMoveType } from '@gamepark/odin/rules/CustomMoveType'
import { RuleId } from '@gamepark/odin/rules/RuleId'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType } from '@gamepark/rules-api'

export const gameAnimations = new MaterialGameAnimations()

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
  .duration(3)

gameAnimations
  .when()
  .rule(RuleId.DealCards)
  .move((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Hand)
  .duration(0.1)
