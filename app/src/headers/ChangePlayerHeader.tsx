import { ChangePlayerRule } from '@gamepark/odin/rules/ChangePlayerRule'
import { useGame, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const ChangePlayerHeader = () => {
  const game = useGame<MaterialGame>()!
  const rules = new ChangePlayerRule(game)
  const playerId = usePlayerId()
  const nextPlayer = rules.nextPlayer
  const itsMe = playerId && playerId === nextPlayer
  const name = usePlayerName(rules.nextPlayer)

  if (itsMe) {
    return <Trans i18nKey="header.change-player.me"></Trans>
  }

  return <Trans i18nKey="header.change-player.other" values={{ player: name }} />
}
