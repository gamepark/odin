import { MaterialRulesPart } from '@gamepark/rules-api'
import { ScoreHelper } from './ScoreHelper'

export class EndHelper extends MaterialRulesPart {
  get isEnded() {
    return this.game.players.some((p) => new ScoreHelper(this.game, p).score >= 15)
  }
}
