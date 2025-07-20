/** @jsxImportSource @emotion/react */

import { Card, getCardValue } from '@gamepark/odin/material/Card'
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
    .sort((item) => -getCardValue(item.id as Card))
    .getIndexes()

  console.log(
    'Selected indexes header',
    rule
      .material(MaterialType.Card)
      .location(LocationType.Hand)
      .selected()
      .sort(...rule.sort)
      .getItems()
  )
  const placeMove = useLegalMove((move: MaterialMove) => {
    if (!isMoveItemTypeAtOnce(MaterialType.Card)(move)) return false
    console.log('Possible move', move.indexes)
    return isEqual(move.indexes, selectedIndexes)
  })

  if (rule.canPass) {
    return (
      <>
        <PlayMoveButton move={pass}>Passer</PlayMoveButton>
        OU
        <PlayMoveButton move={selectedIndexes.length ? placeMove : undefined}>Placer</PlayMoveButton>
      </>
    )
  }

  if (selectedIndexes.length) {
    return <PlayMoveButton move={placeMove}>Placer</PlayMoveButton>
  }

  return <>Jouez des cartes de votre main.</>
}
