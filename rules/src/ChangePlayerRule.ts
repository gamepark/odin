import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType, MiddleOfTable } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { RuleId } from './rules/RuleId'

export class ChangePlayerRule extends PlayerTurnRule {
  onRuleStart() {
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
        nextTable.moveItemsAtOnce({
          type: LocationType.MiddleOfTable,
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
