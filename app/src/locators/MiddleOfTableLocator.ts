import { Card } from '@gamepark/odin/material/Card'
import { LocationType, MiddleOfTable } from '@gamepark/odin/material/LocationType'
import { MaterialType } from '@gamepark/odin/material/MaterialType'
import { PlayerId } from '@gamepark/odin/PlayerId'
import { SortHelper } from '@gamepark/odin/rules/helper/SortHelper'
import { DropAreaDescription, ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { gameCardDescription } from '../material/GameCardDescription'

export class MiddleOfTableLocator extends ListLocator {
  getGap(location: Location): Partial<Coordinates> {
    if (location.id === MiddleOfTable.Current) return { x: 2 }
    return { x: gameCardDescription.width + 0.2 }
  }

  getCoordinates(location: Location, _context: MaterialContext): Partial<Coordinates> {
    if (location.id === MiddleOfTable.Current) return { x: -12, y: 0 }
    return { x: 0, y: 0 }
  }

  getAreaCoordinates(_location: Location, _context: MaterialContext): Partial<Coordinates> {
    return { x: 9, y: 0 }
  }

  getItemIndex(item: MaterialItem<PlayerId, LocationType, Card>, context: ItemContext): number {
    const sortHelper = new SortHelper(context.rules.game)
    const cards = context.rules
      .material(MaterialType.Card)
      .location(item.location.type)
      .locationId(item.location.id)
      .sort(...sortHelper.sortByValue)
      .getItems<Card>()
      .map((item) => item.id)
    return cards.indexOf(item.id)
  }

  location = {
    type: LocationType.MiddleOfTable,
    id: MiddleOfTable.Next
  }

  locationDescription = new MiddlOfTableDescription()
}

class MiddlOfTableDescription extends DropAreaDescription {
  constructor() {
    super({
      height: gameCardDescription.height + 0.5,
      width: gameCardDescription.width * 5 + 0.5,
      borderRadius: 0.3
    })
  }

  /*canDropItem(context: ItemContext, location: Location, dropMoves: MaterialMove[]): boolean {
    const { rules, index } = context
    if (location.id !== MiddleOfTable.Next) return false
    if (rules.game.rule?.id === RuleId.PlayCards && rules.game.rule.player === context.player) {
      const item = rules.material(MaterialType.Card).getItem(index)
      return item.location.type === LocationType.Hand
    }
    return super.canDropItem(context, location, dropMoves)
  }*/

  /*getBestDropMove(_moves: MaterialMove[], _location: Location, context: ItemContext) {
    const { rules, index } = context
    const card = rules.material(MaterialType.Card).index(index)
    const item = card.getItem()!
    if (item.location.type !== LocationType.Hand) return
    return card.moveItem({ type: LocationType.MiddleOfTable, id: MiddleOfTable.Next })
  }*/

  canLongClick() {
    return false
  }
}

export const middleOfTableLocator = new MiddleOfTableLocator()
