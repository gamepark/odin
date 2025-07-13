import { isShuffleItemType, ItemMove, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class DealCardsRule extends MaterialRulesPart {
  onRuleStart() {
    const deck = this.deck
    const discard = this.discard
    const moves: MaterialMove[] = []
    if (!discard.length) {
      moves.push(...this.dealToPlayersAndGo())
      return moves
    }

    moves.push(
      discard.moveItemsAtOnce({
        type: LocationType.Deck
      })
    )

    moves.push(this.material(MaterialType.Card).shuffle())

    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (!isShuffleItemType(MaterialType.Card)(move)) return []
    return this.dealToPlayersAndGo()
  }

  dealToPlayersAndGo(): MaterialMove[] {
    const deck = this.deck
    const moves: MaterialMove[] = []
    for (const player of this.game.players) {
      moves.push(
        deck.dealAtOnce(
          {
            type: LocationType.Hand,
            player: player
          },
          9
        )
      )
    }

    return moves
  }

  get deck() {
    return this.material(MaterialType.Card).location(LocationType.Deck).deck()
  }

  get discard() {
    return this.material(MaterialType.Card).location(LocationType.Discard)
  }
}
