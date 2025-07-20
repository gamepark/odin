import { HandLocator, ItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'

export class PlayerHandLocator extends HandLocator {
  coordinates = { x: 0, y: 1 }

  getCoordinates(location: Location) {
    if (location.player === 1) return { x: 0, y: 20 }
    return { x: 0, y: -20 }
  }

  gapMaxAngle = 2.4

  getBaseAngle(location: Location) {
    if (location.player === 1) return 0
    return 180
  }

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    const transforms = super.placeItem(item, context)
    if (item.selected) {
      console.log('Selected')
      transforms.push('translateY(-2em)')
    }
    return transforms
  }
}

export const playerHandLocator = new PlayerHandLocator()
