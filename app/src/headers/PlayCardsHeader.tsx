/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { LocationType, MiddleOfTable } from '@gamepark/odin/material/LocationType'
import { MaterialType } from '@gamepark/odin/material/MaterialType'
import { CustomMoveType } from '@gamepark/odin/rules/CustomMoveType'
import { SortHelper } from '@gamepark/odin/rules/helper/SortHelper'
import { PlayCardsRule } from '@gamepark/odin/rules/PlayCardsRule'
import { PlayMoveButton, shineEffect, useGame, useLegalMove, usePlay, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemTypeAtOnce, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import isEqual from 'lodash/isEqual'
import { Trans } from 'react-i18next'

export const PlayCardsHeader = () => {
  const game = useGame<MaterialGame>()!
  const rule = new PlayCardsRule(game)
  const pass = useLegalMove((move: MaterialMove) => isCustomMoveType(CustomMoveType.Pass)(move))
  const playerId = usePlayerId()
  const activePlayer = rule.player
  const itsMe = playerId && playerId === activePlayer
  const name = usePlayerName(activePlayer)
  const play = usePlay()
  const sortHelper = new SortHelper(game)
  const selectedCards = rule
    .material(MaterialType.Card)
    .location(LocationType.MiddleOfTable)
    .locationId(MiddleOfTable.Next)
    .sort(...sortHelper.sortByValue)
  const selectedIndexes = selectedCards.getIndexes()

  const placeMove = useLegalMove((move: MaterialMove) => {
    if (!isMoveItemTypeAtOnce(MaterialType.Card)(move)) return false
    return isEqual(move.indexes, selectedIndexes)
  })

  if (itsMe) {
    const selectMove = selectedIndexes.length ? placeMove : undefined
    const availableMoves: MaterialMove[] = rule.getAvailableMoves()
    const canOnlyPass = availableMoves.length === 1 && isCustomMoveType(CustomMoveType.Pass)(availableMoves[0])
    return (
      <Trans
        defaults="header.play"
        values={{ count: selectedIndexes.length }}
        components={{
          play: (
            <PlayMoveButton
              css={
                selectMove && [
                  shineEffect,
                  css`
                    position: relative;
                    overflow: hidden;
                    background-color: transparent;
                  `
                ]
              }
              move={selectedIndexes.length ? placeMove : undefined}
            />
          ),
          pass: (
            <PlayMoveButton
              move={pass}
              disabled={!pass || !!placeMove}
              auto={canOnlyPass ? 5 : undefined}
              onPlay={() =>
                selectedIndexes.length ? play(selectedCards.moveItemsAtOnce({ type: LocationType.Hand, player: playerId }), { transient: true }) : undefined
              }
            />
          )
        }}
      ></Trans>
    )
  }

  return <Trans defaults="header.play.other" values={{ player: name }} />
}
