import { ListLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class PlayAreaLocator extends ListLocator {
  gap = { x: 3 }

  getCoordinates(location: Location) {
    if (location.player === 1) return { x: 0, y: 10 }
    return { x: 0, y: -10 }
  }

  getRotateZ(location: Location) {
    if (location.player === 1) return 0
    return 180
  }
}

export const playAreaLocator = new PlayAreaLocator()
