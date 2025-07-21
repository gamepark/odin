/** @jsxImportSource @emotion/react */

import { LocationType } from '@gamepark/odin/material/LocationType'
import { MaterialType } from '@gamepark/odin/material/MaterialType'
import { CustomMoveType } from '@gamepark/odin/rules/CustomMoveType'
import { PlayCardsRule } from '@gamepark/odin/rules/PlayCardsRule'
import { PlayMoveButton, useGame, useLegalMove } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemTypeAtOnce, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import isEqual from 'lodash/isEqual'

export const PlayCardsHeader = () => {
  const game = useGame<MaterialGame>()!
  const rule = new PlayCardsRule(game)
  const pass = useLegalMove((move: MaterialMove) => isCustomMoveType(CustomMoveType.Pass)(move))
  const selectedIndexes = rule
    .material(MaterialType.Card)
    .location(LocationType.Hand)
    .selected()
    .sort(...rule.sort)
    .getIndexes()

  const placeMove = useLegalMove((move: MaterialMove) => {
    if (!isMoveItemTypeAtOnce(MaterialType.Card)(move)) return false
    return isEqual(move.indexes, selectedIndexes)
  })

  return (
    <>
      <PlayMoveButton move={pass}>Passer</PlayMoveButton> OU <PlayMoveButton move={selectedIndexes.length ? placeMove : undefined}>Placer</PlayMoveButton>
    </>
  )
}
