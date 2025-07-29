/** @jsxImportSource @emotion/react */

import { PlayCardsRule } from '@gamepark/odin/rules/PlayCardsRule'
import { useGame, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const PickCardsHeader = () => {
  const game = useGame<MaterialGame>()!
  const rule = new PlayCardsRule(game)
  const playerId = usePlayerId()
  const activePlayer = rule.player
  const itsMe = playerId && playerId === activePlayer
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    return <Trans defaults="header.take"></Trans>
  }

  return <Trans defaults="header.take.other" values={{ player: name }} />
}
