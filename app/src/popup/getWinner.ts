import { PlayerId } from '@gamepark/odin/PlayerId'
import { ScoreHelper } from '@gamepark/odin/rules/helper/ScoreHelper'
import { MaterialRules } from '@gamepark/rules-api'

export const getWinner = (rules: MaterialRules, round: number): PlayerId => {
  return rules.game.players.find((p) => new ScoreHelper(rules.game, p).isWinningRound(round))!
}
