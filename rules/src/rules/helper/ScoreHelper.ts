import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import sum from 'lodash/sum'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
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

  getRoundScore(round: number): number {
    return this.remind<number[]>(Memory.PlayerScore, this.player)[round]
  }

  get isWinning() {
    return this.material(MaterialType.Card).location(LocationType.Hand).player(this.player).length === 0
  }
}
