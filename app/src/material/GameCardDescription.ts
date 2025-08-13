import { css } from '@emotion/react'
import { Card } from '@gamepark/odin/material/Card'
import { LocationType, MiddleOfTable } from '@gamepark/odin/material/LocationType'
import { MaterialType } from '@gamepark/odin/material/MaterialType'
import { PlayerId } from '@gamepark/odin/PlayerId'
import { SortHelper } from '@gamepark/odin/rules/helper/SortHelper'
import { RuleId } from '@gamepark/odin/rules/RuleId'
import { CardDescription, ItemContext } from '@gamepark/react-game'
import { isMoveItemType, isMoveItemTypeAtOnce, MaterialItem, MaterialMove, MoveItemsAtOnce } from '@gamepark/rules-api'
import isEqual from 'lodash/isEqual'
import Back from '../images/Back.jpg'
import Blue1 from '../images/Blue1.jpg'
import Blue2 from '../images/Blue2.jpg'
import Blue3 from '../images/Blue3.jpg'
import Blue4 from '../images/Blue4.jpg'
import Blue5 from '../images/Blue5.jpg'
import Blue6 from '../images/Blue6.jpg'
import Blue7 from '../images/Blue7.jpg'
import Blue8 from '../images/Blue8.jpg'
import Blue9 from '../images/Blue9.jpg'
import Brown1 from '../images/Brown1.jpg'
import Brown2 from '../images/Brown2.jpg'
import Brown3 from '../images/Brown3.jpg'
import Brown4 from '../images/Brown4.jpg'
import Brown5 from '../images/Brown5.jpg'
import Brown6 from '../images/Brown6.jpg'
import Brown7 from '../images/Brown7.jpg'
import Brown8 from '../images/Brown8.jpg'
import Brown9 from '../images/Brown9.jpg'
import Green1 from '../images/Green1.jpg'
import Green2 from '../images/Green2.jpg'
import Green3 from '../images/Green3.jpg'
import Green4 from '../images/Green4.jpg'
import Green5 from '../images/Green5.jpg'
import Green6 from '../images/Green6.jpg'
import Green7 from '../images/Green7.jpg'
import Green8 from '../images/Green8.jpg'
import Green9 from '../images/Green9.jpg'
import Orange1 from '../images/Orange1.jpg'
import Orange2 from '../images/Orange2.jpg'
import Orange3 from '../images/Orange3.jpg'
import Orange4 from '../images/Orange4.jpg'
import Orange5 from '../images/Orange5.jpg'
import Orange6 from '../images/Orange6.jpg'
import Orange7 from '../images/Orange7.jpg'
import Orange8 from '../images/Orange8.jpg'
import Orange9 from '../images/Orange9.jpg'
import Player1 from '../images/panel/player-1.jpg'
import Player2 from '../images/panel/player-2.jpg'
import Player3 from '../images/panel/player-3.jpg'
import Player4 from '../images/panel/player-4.jpg'
import Player5 from '../images/panel/player-5.jpg'
import Player6 from '../images/panel/player-6.jpg'
import Pink1 from '../images/Pink1.jpg'
import Pink2 from '../images/Pink2.jpg'
import Pink3 from '../images/Pink3.jpg'
import Pink4 from '../images/Pink4.jpg'
import Pink5 from '../images/Pink5.jpg'
import Pink6 from '../images/Pink6.jpg'
import Pink7 from '../images/Pink7.jpg'
import Pink8 from '../images/Pink8.jpg'
import Pink9 from '../images/Pink9.jpg'
import Red1 from '../images/Red1.jpg'
import Red2 from '../images/Red2.jpg'
import Red3 from '../images/Red3.jpg'
import Red4 from '../images/Red4.jpg'
import Red5 from '../images/Red5.jpg'
import Red6 from '../images/Red6.jpg'
import Red7 from '../images/Red7.jpg'
import Red8 from '../images/Red8.jpg'
import Red9 from '../images/Red9.jpg'
import { GameCardHelp } from './help/GameCardHelp'

class GameCardDescription extends CardDescription {
  height = 9
  width = 4.5
  backImage = Back
  images = {
    [Card.Blue1]: Blue1,
    [Card.Blue2]: Blue2,
    [Card.Blue3]: Blue3,
    [Card.Blue4]: Blue4,
    [Card.Blue5]: Blue5,
    [Card.Blue6]: Blue6,
    [Card.Blue7]: Blue7,
    [Card.Blue8]: Blue8,
    [Card.Blue9]: Blue9,
    [Card.Brown1]: Brown1,
    [Card.Brown2]: Brown2,
    [Card.Brown3]: Brown3,
    [Card.Brown4]: Brown4,
    [Card.Brown5]: Brown5,
    [Card.Brown6]: Brown6,
    [Card.Brown7]: Brown7,
    [Card.Brown8]: Brown8,
    [Card.Brown9]: Brown9,
    [Card.Green1]: Green1,
    [Card.Green2]: Green2,
    [Card.Green3]: Green3,
    [Card.Green4]: Green4,
    [Card.Green5]: Green5,
    [Card.Green6]: Green6,
    [Card.Green7]: Green7,
    [Card.Green8]: Green8,
    [Card.Green9]: Green9,
    [Card.Orange1]: Orange1,
    [Card.Orange2]: Orange2,
    [Card.Orange3]: Orange3,
    [Card.Orange4]: Orange4,
    [Card.Orange5]: Orange5,
    [Card.Orange6]: Orange6,
    [Card.Orange7]: Orange7,
    [Card.Orange8]: Orange8,
    [Card.Orange9]: Orange9,
    [Card.Pink1]: Pink1,
    [Card.Pink2]: Pink2,
    [Card.Pink3]: Pink3,
    [Card.Pink4]: Pink4,
    [Card.Pink5]: Pink5,
    [Card.Pink6]: Pink6,
    [Card.Pink7]: Pink7,
    [Card.Pink8]: Pink8,
    [Card.Pink9]: Pink9,
    [Card.Red1]: Red1,
    [Card.Red2]: Red2,
    [Card.Red3]: Red3,
    [Card.Red4]: Red4,
    [Card.Red5]: Red5,
    [Card.Red6]: Red6,
    [Card.Red7]: Red7,
    [Card.Red8]: Red8,
    [Card.Red9]: Red9
  }

  canShortClick(move: MaterialMove, context: ItemContext) {
    const canShortClick = super.canShortClick(move, context)
    if (canShortClick || !context.player) return canShortClick
    return (
      isMoveItemType(MaterialType.Card)(move) &&
      move.location.player === context.player &&
      move.location.type === LocationType.Hand &&
      move.itemIndex === context.index
    )
  }

  /*canDragItem(context: ItemContext, legalMoves: MaterialMove[]): boolean {
    const { rules, index } = context
    if (rules.game.rule?.id === RuleId.PlayCards && rules.game.rule.player === context.player) {
      const card = rules.material(MaterialType.Card).index(index)
      const item = card.getItem<Card>()!
      if (this.isIgnored(item, context)) return false
      return (
        (item.location.type === LocationType.Hand && item.location.player === context.player) ||
        (item.location.type === LocationType.MiddleOfTable && item.location.id === MiddleOfTable.Next)
      )
    }
    return super.canDragItem(context, legalMoves)
  }*/

  canDrag(move: MaterialMove, context: ItemContext): boolean {
    if (isMoveItemTypeAtOnce(MaterialType.Card)(move)) return false
    return super.canDrag(move, context)
  }

  getShortClickLocalMove(context: ItemContext) {
    const { rules, index } = context
    const card = rules.material(MaterialType.Card).index(index)
    const item = card.getItem<Card>()!
    if (this.isIgnored(item, context)) return
    if (rules.game.rule?.id !== RuleId.PlayCards || rules.game.rule.player !== context.player) return
    if (item.location.type === LocationType.MiddleOfTable && item.location.id === MiddleOfTable.Next) {
      return card.moveItem({ type: LocationType.Hand, player: context.player })
    } else if (item.location.type === LocationType.Hand && item.location.player === context.player) {
      return card.moveItem({ type: LocationType.MiddleOfTable, id: MiddleOfTable.Next })
    }

    return
  }

  isIgnored(item: MaterialItem<PlayerId, LocationType, Card>, context: ItemContext) {
    const { rules } = context
    if (!rules.game.tutorial) return false
    if (rules.game.tutorial.step < 4) return true
    return (
      [12, 13, 25, 26, 27].includes(rules.game.tutorial.step) ||
      ([4].includes(rules.game.tutorial.step) && item.id !== Card.Blue1) ||
      ([14, 15].includes(rules.game.tutorial.step) && ![Card.Green2, Card.Green1].includes(item.id)) ||
      ([21].includes(rules.game.tutorial.step) && ![Card.Orange8, Card.Orange5, Card.Orange3].includes(item.id))
    )
  }

  getItemExtraCss(item: MaterialItem, context: ItemContext) {
    const { rules, player } = context
    if (item.location.type !== LocationType.MiddleOfTable || item.location.id !== MiddleOfTable.Next) return
    if (rules.game.rule?.id !== RuleId.PlayCards || rules.game.rule.player !== player) return
    const sortHelper = new SortHelper(rules.game)
    const selectedIndexes = rules
      .material(MaterialType.Card)
      .location(LocationType.MiddleOfTable)
      .locationId(MiddleOfTable.Next)
      .sort(...sortHelper.sortByValue)
      .getIndexes()

    const legalMoves = rules.getLegalMoves(player!)
    const moves: MoveItemsAtOnce | undefined = legalMoves.find(
      (move) => isMoveItemTypeAtOnce(MaterialType.Card)(move) && isEqual(selectedIndexes, move.indexes)
    ) as MoveItemsAtOnce | undefined

    return css`
      > div > div:before {
        content: '';
        height: 100%;
        width: 100%;
        position: absolute;
        border-top: 0.2em solid ${moves ? 'green' : 'red'};
        border-radius: 0.3em;
        transform: translateZ(0.01em);
      }
    `
  }

  getImages() {
    const images = super.getImages()
    images.push(Player1)
    images.push(Player2)
    images.push(Player3)
    images.push(Player4)
    images.push(Player5)
    images.push(Player6)
    return images
  }

  help = GameCardHelp
}

export const gameCardDescription = new GameCardDescription()
