import { PlayerTurnRule } from '@gamepark/rules-api'

export class PlayCardsRule extends PlayerTurnRule {
  getPlayerMoves() {
    return []
  }
}
