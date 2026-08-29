import { LocationType, MiddleOfTable } from '@gamepark/odin/material/LocationType'
import { MaterialType } from '@gamepark/odin/material/MaterialType'
import { CustomMoveType } from '@gamepark/odin/rules/CustomMoveType'
import { RuleId } from '@gamepark/odin/rules/RuleId'
import { and, isMyMove, isRule, MaterialGameAnimations } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType, isMoveItemTypeAtOnce } from '@gamepark/rules-api'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations.configure(and(isRule(RuleId.PlayCards), isCustomMoveType(CustomMoveType.Pass), isMyMove())).skip()
gameAnimations.configure(and(isRule(RuleId.PlayCards), isCustomMoveType(CustomMoveType.Pass))).duration(1500)

gameAnimations
  .configure(and(
    (move) => isCustomMoveType(CustomMoveType.TurnTempo)(move) && !move.data,
    isMyMove()
  ))
  .skip()

gameAnimations
  .configure((move) => isCustomMoveType(CustomMoveType.TurnTempo)(move) && !move.data)
  .duration(1000)

gameAnimations
  .configure((move) => isCustomMoveType(CustomMoveType.TurnTempo)(move) && move.data)
  .duration(2000)

gameAnimations
  .configure(and(
    (move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.MiddleOfTable && move.location.id === MiddleOfTable.Next,
    isMyMove()
  ))
  .duration(200)

gameAnimations
  .configure(and(
    (move, context) => {
      if (!isMoveItemType(MaterialType.Card)(move) || move.location.type !== LocationType.Hand) return false
      const item = context.rules.material(MaterialType.Card).getItem(move.itemIndex)
      return item.location.type === LocationType.MiddleOfTable && item.location.id === MiddleOfTable.Next
    },
    isMyMove()
  ))
  .duration(200)

gameAnimations
  .configure(and(
    (move) => isMoveItemTypeAtOnce(MaterialType.Card)(move) && move.location.type === LocationType.MiddleOfTable && move.location.id === MiddleOfTable.Next,
    isMyMove()
  ))
  .skip()

gameAnimations
  .configure((move) => isMoveItemTypeAtOnce(MaterialType.Card)(move) && move.location.type === LocationType.MiddleOfTable && move.location.id === MiddleOfTable.Next)
  .duration(700)

gameAnimations
  .configure(and(
    isRule(RuleId.DealCards),
    (move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Hand
  ))
  .duration(100)

gameAnimations
  .configure(and(
    isRule(RuleId.PickCard),
    (move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Hand,
    isMyMove()
  ))
  .duration(500)

gameAnimations
  .configure(and(
    isRule(RuleId.PickCard),
    (move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Hand
  ))
  .duration(700)

gameAnimations
  .configure((move) => isMoveItemTypeAtOnce(MaterialType.Card)(move) && move.location.type === LocationType.Discard)
  .duration(700)

gameAnimations
  .configure(
    (move) => isMoveItemTypeAtOnce(MaterialType.Card)(move) && move.location.type === LocationType.MiddleOfTable && move.location.id === MiddleOfTable.Current
  )
  .duration(700)
