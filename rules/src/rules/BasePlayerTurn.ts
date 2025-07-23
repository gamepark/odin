import { PlayerTurnRule } from '@gamepark/rules-api'
import orderBy from 'lodash/orderBy'
import { PlayerId } from '../PlayerId'
import { Memory } from './Memory'

export class BasePlayerTurn extends PlayerTurnRule {
  get nextPlayer() {
    const playerIndex = this.game.players.indexOf(this.firstPlayer)
    const players = orderBy(this.game.players, (id: number) => {
      const index = this.game.players.indexOf(id)
      return (index - playerIndex + this.game.players.length) % this.game.players.length
    })

    return players[(players.indexOf(this.player) + 1) % players.length]
  }

  get firstPlayer() {
    return this.remind<PlayerId>(Memory.FirstPlayer)
  }
}
