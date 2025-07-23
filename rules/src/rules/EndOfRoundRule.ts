import { isMoveItemTypeAtOnce, isShuffleItemType, ItemMove, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerId } from '../PlayerId'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class EndOfRoundRule extends MaterialRulesPart {
  onRuleStart() {
    const moves: MaterialMove[] = []

    // Compute score
    moves.push(this.customMove(CustomMoveType.TurnTempo))
    moves.push(...this.groupToDeckMove)

    return moves
  }

  get dealCards() {
    const moves: MaterialMove[] = []
    const deck = this.deck
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
      moves.push(...this.dealCards)
      const newFirstPlayer = this.newFirstPlayer
      this.memorize(Memory.FirstPlayer, newFirstPlayer)
      moves.push(this.startPlayerTurn(RuleId.PlayCards, this.newFirstPlayer))
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
