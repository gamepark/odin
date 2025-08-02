/** @jsxImportSource @emotion/react */

import { LocationType } from '@gamepark/odin/material/LocationType'
import { MaterialType } from '@gamepark/odin/material/MaterialType'
import { PlayCardsRule } from '@gamepark/odin/rules/PlayCardsRule'
import { useGame, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { PlayCardsHeader } from './PlayCardsHeader'

export const PickCardsHeader = () => {
  const game = useGame<MaterialGame>()!
  const rule = new PlayCardsRule(game)
  const playerId = usePlayerId()
  const activePlayer = rule.player
  const itsMe = playerId && playerId === activePlayer
  const name = usePlayerName(activePlayer)

  const currentTable = rule.material(MaterialType.Card).location(LocationType.MiddleOfTable).length

  if (currentTable === 1) return <PlayCardsHeader />

  if (itsMe) {
    return <Trans defaults="header.take"></Trans>
  }

  return <Trans defaults="header.take.other" values={{ player: name }} />
}
