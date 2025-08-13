import { MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const PassLog: FC<MoveComponentProps<MaterialMove>> = (props) => {
  const { context } = props
  const player = context.action.playerId
  const name = usePlayerName(player)
  return <Trans defaults="logs.pass" values={{ player: name }} />
}
