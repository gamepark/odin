import { Card } from '@gamepark/odin/material/Card'
import { LocationType } from '@gamepark/odin/material/LocationType'
import { MaterialType } from '@gamepark/odin/material/MaterialType'
import { PlayerId } from '@gamepark/odin/PlayerId'
import { MaterialTutorial } from '@gamepark/react-game'
import { TutorialStep } from '@gamepark/react-game/src/components/tutorial/MaterialTutorial'
import { isMoveItemType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { me, opponent1, opponent2, TutorialSetup } from './TutorialSetup'

const TutoComponents = {
  bold: <strong />,
  italic: <em />
}
export class Tutorial extends MaterialTutorial {
  options = {
    players: [{ id: me }, { id: opponent1 }, { id: opponent2 }]
  }
  setup = new TutorialSetup()
  players = [{ id: me }, { id: opponent1 }, { id: opponent2 }]
  steps: TutorialStep<PlayerId, MaterialType, LocationType>[] = [
    { popup: { text: () => <Trans defaults="tuto.welcome" components={TutoComponents} /> } },
    { popup: { text: () => <Trans defaults="tuto.goal" components={TutoComponents} /> } },
    { popup: { text: () => <Trans defaults="tuto.round" components={TutoComponents} /> } },
    { popup: { text: () => <Trans defaults="tuto.end" components={TutoComponents} /> } },
    {
      popup: { text: () => <Trans defaults="tuto.go" components={TutoComponents} /> },
      focus: (game) => {
        return {
          materials: [this.material(game, MaterialType.Card).id(Card.Blue1)],
          locations: []
        }
      },
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.Card)(move) && game.items[MaterialType.Card]![move.itemIndex].id === Card.Blue1
      }
    },
    { popup: { text: () => <Trans defaults="tuto.choice" components={TutoComponents} /> } },
    { popup: { text: () => <Trans defaults="tuto.more" components={TutoComponents} /> } },
    { popup: { text: () => <Trans defaults="tuto.opponent" components={TutoComponents} /> } },
    { popup: { text: () => <Trans defaults="tuto.you" components={TutoComponents} /> } },
    { popup: { text: () => <Trans defaults="tuto.constraint" components={TutoComponents} /> } },
    { popup: { text: () => <Trans defaults="tuto.twocards" components={TutoComponents} /> } },
    { popup: { text: () => <Trans defaults="tuto.play.2.expl" components={TutoComponents} /> } },
    { popup: { text: () => <Trans defaults="tuto.pick" components={TutoComponents} /> } },
    { popup: { text: () => <Trans defaults="tuto.opponent.pass" components={TutoComponents} /> } },
    { popup: { text: () => <Trans defaults="tuto.threecards" components={TutoComponents} /> } },
    { popup: { text: () => <Trans defaults="tuto.more.2" components={TutoComponents} /> } },
    { popup: { text: () => <Trans defaults="tuto.pick.2" components={TutoComponents} /> } },
    { popup: { text: () => <Trans defaults="tuto.allpass" components={TutoComponents} /> } },
    { popup: { text: () => <Trans defaults="tuto.start" components={TutoComponents} /> } },
    { popup: { text: () => <Trans defaults="tuto.endtrigger" /> } }
  ]
  version = 1
}
