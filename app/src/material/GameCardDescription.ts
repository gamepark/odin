import { CardDescription, ItemContext } from '@gamepark/react-game'
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

import { Card } from '@gamepark/odin/material/Card'
import { MaterialType } from '@gamepark/odin/material/MaterialType'
import { RuleId } from '@gamepark/odin/rules/RuleId'
import { LocationType, MiddleOfTable } from '@gamepark/odin/material/LocationType'

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

  getShortClickLocalMove(context: ItemContext) {
    const { rules, index } = context
    const card = rules.material(MaterialType.Card).index(index)
    const item = card.getItem()!
    if (rules.game.rule?.id === RuleId.PlayCards && rules.game.rule.player === context.player && context.player === item.location.player) {
      const table = rules.material(MaterialType.Card).location(LocationType.MiddleOfTable).locationId(MiddleOfTable.Current).length
      const selected = rules.material(MaterialType.Card).location(LocationType.Hand).player(rules.game.rule.player).selected().length

      if (item.selected) return card.unselectItem()
      if (selected > table + 1) return
      return card.selectItem()
    }

    return
  }
}

export const gameCardDescription = new GameCardDescription()
