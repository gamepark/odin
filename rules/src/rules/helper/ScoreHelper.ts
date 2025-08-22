import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import sum from 'lodash/sum'
import { PlayerId } from '../../PlayerId'
import { Memory } from '../Memory'

export class ScoreHelper extends MaterialRulesPart {
  constructor(
    game: MaterialGame,
    readonly player: PlayerId
  ) {
    super(game)
  }

  isWinningRound(round: number): boolean {
    return this.getRoundScore(round) === 0
  }

  get score() {
    return sum(this.remind<number[]>(Memory.PlayerScore, this.player))
  }

  getRoundScore(round: number): number | undefined {
    return this.remind<number[] | undefined>(Memory.PlayerScore, this.player)?.[round - 1]
  }
}
