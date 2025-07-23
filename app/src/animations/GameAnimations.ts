import { CustomMoveType } from '@gamepark/odin/rules/CustomMoveType'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations
  .when()
  .move((move) => isCustomMoveType(CustomMoveType.TurnTempo)(move) && !move.data)
  .mine()
  .none()

gameAnimations
  .when()
  .move((move) => isCustomMoveType(CustomMoveType.TurnTempo)(move))
  .duration(1)
