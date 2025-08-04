import { isShuffleItemType, ItemMove, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerId } from '../PlayerId'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class DealCardsRule extends MaterialRulesPart {
  onRuleStart() {
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
    const moves: MaterialMove[] = []
    const deck = this.deck
    for (let i = 0; i < 9; i++) {
      for (const player of this.game.players) {
        const hand = this.getPlayerHand(player)
        if (hand.length + i >= 9) continue
        moves.push(
          ...deck.deal({
            type: LocationType.Hand,
            player: player
          })
        )
      }
    }

    moves.push(this.startPlayerTurn(RuleId.PlayCards, this.remind<PlayerId>(Memory.FirstPlayer)))

    return moves
  }

  getPlayerHand(player: PlayerId) {
    return this.material(MaterialType.Card).location(LocationType.Hand).player(player)
  }

  get deck() {
    return this.material(MaterialType.Card).location(LocationType.Deck).deck()
  }

  get discard() {
    return this.material(MaterialType.Card).location(LocationType.Discard)
  }
}
