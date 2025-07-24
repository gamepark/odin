import { LocationType, MiddleOfTable } from '@gamepark/odin/material/LocationType'
import { ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { gameCardDescription } from '../material/GameCardDescription'
import { MaterialType } from '@gamepark/odin/material/MaterialType'
import { Card } from '@gamepark/odin/material/Card'
import { PlayerId } from '@gamepark/odin/PlayerId'

export class MiddleOfTableLocator extends ListLocator {
  getGap(location: Location): Partial<Coordinates> {
    if (location.id === MiddleOfTable.Current) return { x: 2 }
    return { x: gameCardDescription.width + 0.2 }
  }

  getMaxCount(location: Location, context: MaterialContext): number | undefined {
    return context.rules.material(MaterialType.Card).location(location.type).locationId(MiddleOfTable.Current).length + 1
  }

  getCoordinates(location: Location, _context: MaterialContext): Partial<Coordinates> {
    if (location.id === MiddleOfTable.Current) {
      return { x: -12, y: 0 }
    }

    return { x: 0, y: 0 }
  }

  getItemIndex(item: MaterialItem<PlayerId, LocationType, Card>, context: ItemContext): number {
    const cards = context.rules
      .material(MaterialType.Card)
      .location(item.location.type)
      .locationId(item.location.id)
      .getItems<Card>()
      .map((item) => item.id)
    cards.sort((a, b) => b - a)
    return cards.indexOf(item.id)
  }
}

export const middleOfTableLocator = new MiddleOfTableLocator()
