import { isMoveItemTypeAtOnce, isShuffleItemType, ItemMove, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerId } from '../PlayerId'
import { CustomMoveType } from './CustomMoveType'
import { EndHelper } from './helper/EndHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class EndOfRoundRule extends MaterialRulesPart {
  onRuleStart() {
    const moves: MaterialMove[] = [this.customMove(CustomMoveType.TurnTempo, true)]
    moves.push(...this.onRoundEnd())

    // Only move cards if game is not ended
    if (moves.length === 1) {
      moves.push(...this.groupToDeckMove)
    }

    return moves
  }

  onRoundEnd(): MaterialMove[] {
    if (!new EndHelper(this.game).isEnded) {
      this.memorize(Memory.Round, (r: number) => {
        return r + 1
      })
      return []
    }
    return [this.endGame()]
  }

  get deck() {
    return this.material(MaterialType.Card).location(LocationType.Deck).deck()
  }

  get groupToDeckMove() {
    const moves: MaterialMove[] = []

    moves.push(
      this.material(MaterialType.Card)
        .location((l) => l.type !== LocationType.Deck)
        .moveItemsAtOnce({
          type: LocationType.Deck
        })
    )
    return moves
  }

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (isMoveItemTypeAtOnce(MaterialType.Card)(move) && move.location.type === LocationType.Deck) {
      moves.push(this.deck.shuffle())
    }

    if (isShuffleItemType(MaterialType.Card)(move)) {
      const newFirstPlayer = this.newFirstPlayer
      this.memorize(Memory.FirstPlayer, newFirstPlayer)
      moves.push(this.startRule(RuleId.DealCards))
    }

    return moves
  }

  get newFirstPlayer(): PlayerId {
    return this.game.players[(this.game.players.indexOf(this.firstPlayer) + 1) % this.game.players.length]
  }

  get firstPlayer() {
    return this.remind<PlayerId>(Memory.FirstPlayer)
  }
}
