import { isMoveItemType, MaterialMove, MoveItem } from '@gamepark/rules-api'
import { LocationType, MiddleOfTable } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurn } from './BasePlayerTurn'
import { CustomMoveType } from './CustomMoveType'
import { RuleId } from './RuleId'

export class PickCardRule extends BasePlayerTurn {
  onRuleStart() {
    if (this.isEndOfRound) {
      return [this.customMove(CustomMoveType.TurnTempo, true), this.startRule(RuleId.EndOfRound)]
    }

    const moves: MaterialMove[] = [this.customMove(CustomMoveType.TurnTempo)]

    if (this.getPlayerMoves().length) return moves
    moves.push(...this.goToNextRule())
    return moves
  }

  get isEndOfRound() {
    return this.material(MaterialType.Card).location(LocationType.Hand).player(this.player).length === 0
  }

  getPlayerMoves(): MaterialMove[] {
    return this.currentTable.moveItems({
      type: LocationType.Hand,
      player: this.player
    })
  }

  afterItemMove(move: MoveItem) {
    if (!isMoveItemType(MaterialType.Card)(move) || move.location.type !== LocationType.Hand) return []
    return this.goToNextRule()
  }

  goToNextRule() {
    const moves: MaterialMove[] = []
    const currentTable = this.currentTable
    if (currentTable.length) {
      moves.push(
        this.currentTable.moveItemsAtOnce({
          type: LocationType.Discard
        })
      )
    }

    const nextTable = this.nextTable
    if (nextTable.length) {
      moves.push(
        this.nextTable.moveItemsAtOnce({
          id: MiddleOfTable.Current
        })
      )
    }
    moves.push(this.startPlayerTurn(RuleId.PlayCards, this.nextPlayer))
    return moves
  }

  get currentTable() {
    return this.material(MaterialType.Card).location(LocationType.MiddleOfTable).locationId(MiddleOfTable.Current)
  }

  get nextTable() {
    return this.material(MaterialType.Card).location(LocationType.MiddleOfTable).locationId(MiddleOfTable.Next)
  }
}
