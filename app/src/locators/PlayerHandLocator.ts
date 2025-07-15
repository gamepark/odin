import { HandLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class PlayerHandLocator extends HandLocator {
  coordinates = { x: 0, y: 1 }

  getCoordinates(location: Location) {
    if (location.player === 1) return { x: 0, y: 20 }
    return { x: 0, y: -20 }
  }

  getBaseAngle(location: Location) {
    if (location.player === 1) return 0
    return 180
  }
}

export const playerHandLocator = new PlayerHandLocator()
