import { LocationType } from '@gamepark/odin/material/LocationType'
import { MaterialType } from '@gamepark/odin/material/MaterialType'
import { DeckLocator, Locator } from '@gamepark/react-game'
import { playerHandLocator } from './PlayerHandLocator'
import { middleOfTableLocator } from './MiddleOfTableLocator'

export const Locators: Partial<Record<LocationType, Locator<number, MaterialType, LocationType>>> = {
  [LocationType.Hand]: playerHandLocator,
  [LocationType.Deck]: new DeckLocator({ coordinates: { x: -30 }, limit: 20 }),
  [LocationType.Discard]: new DeckLocator({ coordinates: { x: -40 } }),
  [LocationType.MiddleOfTable]: middleOfTableLocator
}
