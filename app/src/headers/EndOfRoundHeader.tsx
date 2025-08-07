/** @jsxImportSource @emotion/react */

import { Memory } from '@gamepark/odin/rules/Memory'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { getWinner } from '../popup/RoundSummary'

export const EndOfRoundHeader = () => {
  const rules = useRules<MaterialRules>()!
  const playerId = usePlayerId()
  const activePlayer = rules.getActivePlayer()
  const itsMe = playerId && playerId === activePlayer
  const round = rules.remind<number>(Memory.Round)
  const winner = getWinner(rules, round - 1)
  const name = usePlayerName(winner)

  if (itsMe && winner === playerId) {
    return <Trans defaults="header.win.me"></Trans>
  }

  return <Trans defaults="header.win.other" values={{ player: name }} />
}
