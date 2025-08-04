import { Card } from '@gamepark/odin/material/Card'
import { LocationType } from '@gamepark/odin/material/LocationType'
import { MaterialType } from '@gamepark/odin/material/MaterialType'
import { OdinOptions } from '@gamepark/odin/OdinOptions'
import { OdinSetup } from '@gamepark/odin/OdinSetup'

const MyHand: Card[] = [Card.Blue1, Card.Green2, Card.Green1, Card.Orange3, Card.Orange5, Card.Pink9]
const Opponent1Hand: Card[] = [Card.Brown6]
const Opponent2Hand: Card[] = [Card.Orange8, Card.Pink6, Card.Blue6]

export const me = 1
export const opponent1 = 2
export const opponent2 = 3

export class TutorialSetup extends OdinSetup {
  setupMaterial(_options: OdinOptions) {
    super.setupMaterial(_options)
    this.fillHands()
  }

  fillHands() {
    const deck = this.deck
    deck.id((i: Card) => MyHand.includes(i)).moveItems({ type: LocationType.Hand, player: me })
    deck.id((i: Card) => Opponent1Hand.includes(i)).moveItems({ type: LocationType.Hand, player: opponent1 })
    deck.id((i: Card) => Opponent2Hand.includes(i)).moveItems({ type: LocationType.Hand, player: opponent2 })
  }

  get deck() {
    return this.material(MaterialType.Card).location(LocationType.Deck).deck()
  }
}
