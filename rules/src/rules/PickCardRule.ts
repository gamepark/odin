import { isMoveItemType, MaterialMove, MoveItem } from '@gamepark/rules-api'
import { LocationType, MiddleOfTable } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BasePlayerTurn } from './BasePlayerTurn'
import { CustomMoveType } from './CustomMoveType'
import { RuleId } from './RuleId'

export class PickCardRule extends BasePlayerTurn {
  onRuleStart() {
    if (this.isEndOfRound) {
      return [this.startRule(RuleId.EndOfRound)]
    }

    const moves: MaterialMove[] = [this.customMove(CustomMoveType.TurnTempo)]

    const playerMoves = this.getPlayerMoves()
    if (playerMoves.length === 1 && isMoveItemType(MaterialType.Card)(playerMoves[0]) && playerMoves[0].location.type === LocationType.Hand) {
      moves.push(playerMoves[0])
      return moves
    }

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
    return [this.startRule(RuleId.ChangePlayer)]
  }

  get currentTable() {
    return this.material(MaterialType.Card).location(LocationType.MiddleOfTable).locationId(MiddleOfTable.Current)
  }
}
