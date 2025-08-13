import { PlayCardsRule } from '@gamepark/odin/rules/PlayCardsRule'
import { MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { MaterialGame, MaterialMove, StartPlayerTurn } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const AllPassedLog: FC<MoveComponentProps<MaterialMove>> = (props) => {
  const move = props.move as StartPlayerTurn
  const { game } = props.context
  const rule = new PlayCardsRule(JSON.parse(JSON.stringify(game)) as MaterialGame)
  rule.play(move)
  const player = rule.nextPlayer
  const name = usePlayerName(player)
  return <Trans defaults="logs.all-pass" values={{ player: name }} />
}
