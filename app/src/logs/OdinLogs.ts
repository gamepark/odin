/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType, MiddleOfTable } from '@gamepark/odin/material/LocationType'
import { MaterialType } from '@gamepark/odin/material/MaterialType'
import { PlayerId } from '@gamepark/odin/PlayerId'
import { ChangePlayerRule } from '@gamepark/odin/rules/ChangePlayerRule'
import { CustomMoveType } from '@gamepark/odin/rules/CustomMoveType'
import { Memory } from '@gamepark/odin/rules/Memory'
import { RuleId } from '@gamepark/odin/rules/RuleId'
import { LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemTypeAtOnce, isStartPlayerTurn, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { AllPassedLog } from './entries/AllPassedLog'
import { PassLog } from './entries/PassLog'
import { PlayCardsLog } from './entries/PlayCardsLog'

export class OdinLogs implements LogDescription<MaterialMove, PlayerId, MaterialGame> {
  getMovePlayedLogDescription(move: MaterialMove, context: MoveComponentContext<MaterialMove, PlayerId, MaterialGame>): MovePlayedLogDescription | undefined {
    if (isMoveItemTypeAtOnce(MaterialType.Card)(move) && move.location.type === LocationType.MiddleOfTable && move.location.id === MiddleOfTable.Next) {
      return {
        Component: PlayCardsLog,
        player: context.action.playerId,
        css: colorLogCss(context.action.playerId)
      }
    }

    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return {
        Component: PassLog,
        player: context.action.playerId,
        css: colorLogCss(context.action.playerId)
      }
    }

    if (context.game.rule?.id === RuleId.ChangePlayer && isStartPlayerTurn(move)) {
      const rule = new ChangePlayerRule(JSON.parse(JSON.stringify(context.game)) as MaterialGame)
      if (!rule.remind(Memory.LastPlayerThatPlay)) {
        return {
          Component: AllPassedLog,
          player: rule.nextPlayer,
          css: logCss
        }
      }
    }

    return
  }
}

const colorLogCss = (playerId: PlayerId) => css`
  background-color: ${getLogColor(playerId)}80;
  color: ${getLogTextColor(playerId)};
  ${logCss}
`

const logCss = css`
  font-size: 2em;
`

const getLogTextColor = (playerId: PlayerId) => {
  switch (playerId) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return 'black'
    case 6:
    default:
      return 'black'
  }
}

const getLogColor = (playerId: PlayerId) => {
  switch (playerId) {
    case 1:
      return '#7dd2e2'
    case 2:
      return '#324b50'
    case 3:
      return '#95b0b5'
    case 4:
      return '#eebb9b'
    case 5:
      return '#b48668'
    case 6:
    default:
      return '#d0bdee'
  }
}
