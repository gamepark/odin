/** @jsxImportSource @emotion/react */

import { EndHelper } from '@gamepark/odin/rules/helper/EndHelper'
import { Memory } from '@gamepark/odin/rules/Memory'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { getWinner } from '../popup/RoundSummary'

export const EndOfRoundHeader = () => {
  const rules = useRules<MaterialRules>()!
  const endHelper = new EndHelper(rules.game)
  const playerId = usePlayerId()
  const round = rules.remind<number>(Memory.Round)
  const winner = getWinner(rules, endHelper.isEnded ? round : round - 1)
  const itsMe = playerId && playerId === winner
  const name = usePlayerName(winner)

  if (itsMe && winner === playerId) {
    return <Trans defaults="header.win.me"></Trans>
  }

  return <Trans defaults="header.win.other" values={{ player: name }} />
}
