import { MaterialRulesPart } from '@gamepark/rules-api'
import sum from 'lodash/sum'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'

export class EndHelper extends MaterialRulesPart {
  get isEnded() {
    let ended = false
    for (const player of this.game.players) {
      const hand = this.material(MaterialType.Card).location(LocationType.Hand).player(player)
      this.memorize(Memory.PlayerScore, (s: number[] = []) => [...s, hand.length], player)
      const score = sum(this.remind<number[]>(Memory.PlayerScore, player))
      if (!ended && score >= 15) ended = true
    }

    return ended
  }
}
