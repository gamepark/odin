import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'

export class PickCard extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    return []
  }
}
