import { LocationType } from '@gamepark/odin/material/LocationType'
import { MaterialType } from '@gamepark/odin/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { playerHandLocator } from './PlayerHandLocator'
import { playAreaLocator } from './PlayAreaLocator'

export const Locators: Partial<Record<LocationType, Locator<number, MaterialType, LocationType>>> = {
  [LocationType.Hand]: playerHandLocator,
  [LocationType.PlayArea]: playAreaLocator,
  [LocationType.Deck]: new Locator({ coordinates: { x: -30 } })
}
