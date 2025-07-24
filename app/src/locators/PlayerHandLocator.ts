import { Card, getCardColor, getCardValue } from '@gamepark/odin/material/Card'
import { LocationType } from '@gamepark/odin/material/LocationType'
import { MaterialType } from '@gamepark/odin/material/MaterialType'
import { Memory } from '@gamepark/odin/rules/Memory'
import { Sort } from '@gamepark/odin/rules/Sort'
import { getRelativePlayerIndex, HandLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import orderBy from 'lodash/orderBy'

export class PlayerHandLocator extends HandLocator {
  coordinates = { x: 0, y: 1 }

  getCoordinates(location: Location, context: MaterialContext) {
    if (context.rules.players.length === 2) {
      return this.getTwoPlayersCoordinates(location, context)
    }

    if (context.rules.players.length === 3) {
      return this.getThreePlayersCoordinates(location, context)
    }

    if (context.rules.players.length === 4) {
      return this.getFourPlayersCoordinates(location, context)
    }

    if (context.rules.players.length === 5) {
      return this.getFivePlayersCoordinates(location, context)
    }

    return this.getSixPlayersCoordinates(location, context)
  }

  getTwoPlayersCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    if (index === 0) return { x: 0, y: context.player ? 14 : 12 }
    return { x: 0, y: -12 }
  }

  getThreePlayersCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    if (index === 0) return { x: 0, y: 14 }
    if (index === 1) return { x: -20, y: -14 }
    return { x: 20, y: -15 }
  }

  getFivePlayersCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    if (index === 0) return { x: context.player ? -15 : -22, y: 14 }
    if (index === 1) return { x: -22, y: -14 }
    if (index === 2) return { x: 0, y: -14 }
    if (index === 3) return { x: 22, y: -14 }
    return { x: 22, y: 14 }
  }

  getSixPlayersCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    if (index === 0) return { x: 0, y: 14 }
    if (index === 1) return { x: -28, y: 14 }
    if (index === 2) return { x: -28, y: -14 }
    if (index === 3) return { x: 0, y: -14 }
    if (index === 4) return { x: 28, y: -14 }
    return { x: 28, y: 14 }
  }

  getFourPlayersCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    if (index === 0) return { x: context.player ? -15 : -20, y: 14 }
    if (index === 1) return { x: context.player ? -15 : -20, y: -14 }
    if (index === 2) return { x: 20, y: -14 }
    return { x: 20, y: 14 }
  }

  gapMaxAngle = 2.4

  getGapMaxAngle(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    const players = context.rules.players.length
    if (players === 2) return 2.4
    if (index === 0 && context.player && players < 6) return 2.4
    if (index === 0 && context.player && players === 6) return 2.2
    if (players === 5) return 1
    if (players === 6) return 1
    return 1.5
  }

  getBaseAngle(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    const players = context.rules.players.length
    if (players < 4) return index === 0 ? 0 : 180
    if (players === 4) return [0, 3].includes(index) ? 0 : 180
    if (players === 5) return [0, 4].includes(index) ? 0 : 180
    return [0, 1, 5].includes(index) ? 0 : 180
  }

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    const transforms = super.placeItem(item, context)
    if (item.selected) {
      transforms.push('translateY(-2em)')
    }
    return transforms
  }

  getItemIndex(item: MaterialItem, context: ItemContext): number {
    const { player, rules, index } = context
    if (player && item.location.player === player) {
      const cards = rules.material(MaterialType.Card).location(LocationType.Hand).player(player)
      const sort = context.rules.remind<number | undefined>(Memory.HandSort) ?? Sort.ValueDesc
      const isValueDescSort = sort === Sort.ValueDesc

      if (sort === Sort.Color) {
        return orderBy(cards.getIndexes(), [(i) => getCardColor(cards.getItem<Card>(i).id), (i) => -getCardValue(cards.getItem<Card>(i).id)]).indexOf(index)
      }

      return orderBy(cards.getIndexes(), [
        (i) => getCardValue(cards.getItem<Card>(i).id) * (!isValueDescSort ? 1 : -1),
        (i) => getCardColor(cards.getItem<Card>(i).id)
      ]).indexOf(index)
    }
    return item.location.x!
  }

  getHoverTransform(item: MaterialItem, context: ItemContext): string[] {
    return ['translateZ(10em)', `rotateZ(${-this.getItemRotateZ(item, context)}${this.rotationUnit})`, 'scale(2)', 'translateY(-20%)']
  }
}

export const playerHandLocator = new PlayerHandLocator()
