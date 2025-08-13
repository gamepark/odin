/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayerId } from '@gamepark/odin/PlayerId'
import { ScoreHelper } from '@gamepark/odin/rules/helper/ScoreHelper'
import { Memory } from '@gamepark/odin/rules/Memory'
import { RuleId } from '@gamepark/odin/rules/RuleId'
import { Avatar, RulesDialog, usePlayerName, useRules } from '@gamepark/react-game'
import times from 'lodash/times'
import { FC, useEffect, useState } from 'react'
import { Trans } from 'react-i18next'
import { MaterialRules } from '@gamepark/rules-api'

export const RoundSummary = () => {
  const rules = useRules<MaterialRules>()!
  const round = rules.remind<number>(Memory.Round)
  const [open, setOpen] = useState(false)
  const players = rules.game.players
  const winner = getWinner(rules, round - 1)
  useEffect(() => {
    if (round === 1 || !rules.game.rule?.id || rules.game.rule.id !== RuleId.EndOfRound) return
    if (!open && winner) {
      setOpen(true)
    }
  }, [round, winner])

  const name = usePlayerName(winner)

  return (
    <RulesDialog open={open} close={() => setOpen(false)}>
      <div css={summaryCss}>
        <h2>
          <Trans defaults="round.summary.title" values={{ player: name }} />
        </h2>
        <table css={tableCss} cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              {players.map((playerId) => (
                <RoundSummaryPlayer playerId={playerId} key={playerId} />
              ))}
            </tr>
          </thead>
          <tbody>
            {times(round - 1).map((n) => (
              <RoundSummaryLine key={n} round={n} />
            ))}
          </tbody>
          <tfoot>
            <RoundSummaryTotal />
          </tfoot>
        </table>
      </div>
    </RulesDialog>
  )
}

export const getWinner = (rules: MaterialRules, round: number): PlayerId => {
  return rules.game.players.find((p) => new ScoreHelper(rules.game, p).isWinningRound(round))!
}

type RoundSummaryPlayerProps = {
  playerId: number
}

const RoundSummaryPlayer: FC<RoundSummaryPlayerProps> = (props) => {
  const { playerId } = props
  const name = usePlayerName(playerId)
  return (
    <th css={headerCss}>
      <div css={avatarContainerCss}>
        <Avatar css={avatarCss} playerId={playerId} />
        <span css={playerNameCss}>{name}</span>
      </div>
    </th>
  )
}

type RoundSummaryLineProps = {
  round: number
}

const RoundSummaryLine: FC<RoundSummaryLineProps> = (props) => {
  const rules = useRules<MaterialRules>()!
  const { round } = props
  const winner = getWinner(rules, round + 1)
  const players = rules.game.players
  return (
    <tr>
      <td css={roundCss}>
        <Trans defaults="score.round" values={{ round: round + 1 }} />
      </td>
      {players.map((p) => (
        <td css={[scoreCss, winner === p ? highlightCss : undefined]} key={p}>
          {new ScoreHelper(rules.game, p).getRoundScore(round + 1)}
        </td>
      ))}
    </tr>
  )
}

const RoundSummaryTotal: FC = () => {
  const rules = useRules<MaterialRules>()!
  const players = rules.game.players

  return (
    <tr>
      <td css={roundCss}>
        <Trans defaults="score.total" />
      </td>
      {players.map((p) => (
        <td css={totalCss} key={p}>
          {new ScoreHelper(rules.game, p).score}
        </td>
      ))}
    </tr>
  )
}

const summaryCss = css`
  min-width: 50em;
  min-height: 24em;
  font-size: 2em;
  > h2 {
    width: 100%;
    text-align: center;
  }
`

const roundCss = css`
  font-weight: bold;
  min-width: 12em;
`

const scoreCss = css`
  text-align: center;
`

const totalCss = css`
  text-align: center;
  font-weight: bold;
`

const highlightCss = css`
  background-color: rgba(173, 204, 173, 0.5);
  font-weight: bold;
`

const tableCss = css`
  margin: 2em;
  min-width: 48em;

  > thead > tr > th,
  > tbody > tr > td {
    border-bottom: 0.15em solid #28b8ce;
  }

  > tbody > tr > td,
  > tfoot > tr > td {
    padding: 1em 0;
  }

  > thead > tr > th:not(:last-of-type),
  > tbody > tr > td:not(:last-of-type),
  > tfoot > tr > td:not(:last-of-type) {
    border-right: 0.15em solid #28b8ce;
  }
`

const headerCss = css`
  padding-bottom: 1em;
  padding-left: 0.5em;
  padding-right: 0.5em;
`

const avatarContainerCss = css`
  display: flex;
  flex-direction: column;
`

const playerNameCss = css`
  text-overflow: ellipsis;
  text-align: center;
  overflow: hidden;
  display: block;
  width: 10em;
  align-self: center;
  white-space: pre-wrap;
`

const avatarCss = css`
  position: relative;
  width: 3em;
  height: 3em;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 0.5em;
`
