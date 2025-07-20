import { isMoveItemType, MaterialMove, MoveItem, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType, MiddleOfTable } from '../material/LocationType'
import { RuleId } from './RuleId'

export class PickCard extends PlayerTurnRule {
  onRuleStart() {
    if (this.getPlayerMoves().length) return []
    return this.goToNextRule()
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
    moves.push(
      this.currentTable.moveItemsAtOnce({
        type: LocationType.Discard
      })
    )

    moves.push(
      this.nextTable.moveItemsAtOnce({
        id: MiddleOfTable.Current
      })
    )

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
