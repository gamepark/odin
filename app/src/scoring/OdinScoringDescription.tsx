import { OdinRules } from '@gamepark/odin/OdinRules'
import { PlayerId } from '@gamepark/odin/PlayerId'
import { ScoreHelper } from '@gamepark/odin/rules/helper/ScoreHelper'
import { Memory } from '@gamepark/odin/rules/Memory'
import { ScoringDescription, ScoringValue } from '@gamepark/react-game'
import times from 'lodash/times'
import { Trans } from 'react-i18next'

export class OdinScoringDescription implements ScoringDescription {
  getScoringKeys(rules: OdinRules) {
    return [...times(rules.remind<number>(Memory.Round)).map((n) => `round.${n + 1}`), 'total']
  }

  getScoringHeader(key: string): ScoringValue {
    if (key.startsWith('round.')) {
      return <Trans defaults="score.round" values={{ round: key.split('.')[1] }} />
    }

    return <Trans defaults="score.total" />
  }

  getScoringPlayerData(key: string, player: PlayerId, rules: OdinRules): ScoringValue | null {
    const helper = new ScoreHelper(rules.game, player)
    if (key.startsWith('round.')) {
      return helper.getRoundScore(parseInt(key.split('.')[1])) ?? 0
    }

    return helper.score
  }
}
