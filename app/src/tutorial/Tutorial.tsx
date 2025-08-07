import { Card } from '@gamepark/odin/material/Card'
import { LocationType, MiddleOfTable } from '@gamepark/odin/material/LocationType'
import { MaterialType } from '@gamepark/odin/material/MaterialType'
import { PlayerId } from '@gamepark/odin/PlayerId'
import { CustomMoveType } from '@gamepark/odin/rules/CustomMoveType'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType, isMoveItemTypeAtOnce } from '@gamepark/rules-api'
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
      popup: { text: () => <Trans defaults="tuto.go" components={TutoComponents} />, position: { y: -20 } },
      focus: (game) => {
        return {
          materials: [this.material(game, MaterialType.Card).location(LocationType.MiddleOfTable), this.material(game, MaterialType.Card).id(Card.Blue1)],
          locations: [this.location(LocationType.MiddleOfTable).id(MiddleOfTable.Next).location],
          margin: {
            top: 2,
            bottom: 2
          }
        }
      },
      move: {
        filter: (move, game) => isMoveItemTypeAtOnce(MaterialType.Card)(move) && move.indexes.some((i) => game.items[MaterialType.Card]![i].id === Card.Blue1)
      }
    },
    { popup: { text: () => <Trans defaults="tuto.choice" components={TutoComponents} /> } },
    {
      move: {
        player: opponent1,
        filter: (move, game) =>
          isMoveItemTypeAtOnce(MaterialType.Card)(move) &&
          move.indexes.length === 1 &&
          move.indexes.some((i) => game.items[MaterialType.Card]![i].id === Card.Brown6)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.more" components={TutoComponents} />,
        position: {
          y: -20
        },
        size: {
          width: 100
        }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.Card).location(LocationType.MiddleOfTable)],
        margin: {
          top: 10,
          bottom: 2
        }
      })
    },
    {
      move: {
        player: opponent1
      }
    },
    { popup: { text: () => <Trans defaults="tuto.opponent" components={TutoComponents} /> } },
    {
      move: {
        player: opponent2,
        filter: (move, game) =>
          isMoveItemTypeAtOnce(MaterialType.Card)(move) &&
          move.indexes.length === 1 &&
          move.indexes.some((i) => game.items[MaterialType.Card]![i].id === Card.Orange8)
      }
    },
    {
      move: {
        player: opponent2
      }
    },
    {
      popup: { text: () => <Trans defaults="tuto.you" components={TutoComponents} />, position: { x: 20, y: -20 } },
      focus: (game) => {
        return {
          materials: [
            this.material(game, MaterialType.Card).location(LocationType.MiddleOfTable),
            this.material(game, MaterialType.Card).location(LocationType.Hand).player(me)
          ],
          locations: [this.location(LocationType.MiddleOfTable).id(MiddleOfTable.Next).location],
          margin: {
            top: 2,
            bottom: 2
          }
        }
      }
    },
    {
      popup: { text: () => <Trans defaults="tuto.constraint" components={TutoComponents} />, position: { x: 20, y: -20 } },
      focus: (game) => {
        return {
          materials: [
            this.material(game, MaterialType.Card).location(LocationType.MiddleOfTable),
            this.material(game, MaterialType.Card).location(LocationType.Hand).player(me)
          ],
          locations: [this.location(LocationType.MiddleOfTable).id(MiddleOfTable.Next).location],
          margin: {
            top: 2,
            bottom: 2
          }
        }
      }
    },
    {
      popup: { text: () => <Trans defaults="tuto.twocards" components={TutoComponents} />, position: { x: 20, y: -20 } },
      focus: (game) => {
        return {
          materials: [
            this.material(game, MaterialType.Card).location(LocationType.MiddleOfTable),
            this.material(game, MaterialType.Card)
              .location(LocationType.Hand)
              .player(me)
              .id((id: Card) => [Card.Green2, Card.Green1].includes(id))
          ],
          locations: [this.location(LocationType.MiddleOfTable).id(MiddleOfTable.Next).location],
          margin: {
            top: 2,
            bottom: 2
          }
        }
      },
      move: {
        player: me,
        filter: (move, game) =>
          isMoveItemTypeAtOnce(MaterialType.Card)(move) &&
          move.indexes.length === 2 &&
          move.indexes.every((i) => [Card.Green2, Card.Green1].includes(game.items[MaterialType.Card]![i].id as Card))
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.play.2.expl" components={TutoComponents} />,
        position: {
          y: -20
        },
        size: {
          width: 100
        }
      },
      focus: (game) => {
        return {
          materials: [this.material(game, MaterialType.Card).location(LocationType.MiddleOfTable)],
          margin: {
            top: 10,
            bottom: 2
          }
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.pick" components={TutoComponents} />,
        position: {
          y: -20,
          x: 20
        }
      },
      focus: (game) => {
        return {
          materials: [this.material(game, MaterialType.Card).location(LocationType.MiddleOfTable).locationId(MiddleOfTable.Current)],
          locations: [this.location(LocationType.Hand).location],
          margin: {
            top: 3,
            bottom: 1,
            right: 5
          }
        }
      },
      move: {
        filter: (move) => isMoveItemType(MaterialType.Card)(move)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.pass" components={TutoComponents} />
      },
      move: {
        player: opponent1,
        filter: (move) => isCustomMoveType(CustomMoveType.Pass)(move)
      }
    },
    {
      move: {
        player: opponent2,
        filter: (move, game) =>
          isMoveItemTypeAtOnce(MaterialType.Card)(move) &&
          move.indexes.length === 3 &&
          move.indexes.every((i) => [Card.Brown6, Card.Pink6, Card.Blue6].includes(game.items[MaterialType.Card]![i].id as Card))
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.threecards" components={TutoComponents} />,
        position: {
          y: -20
        },
        size: {
          width: 100
        }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.Card).location(LocationType.MiddleOfTable).locationId(MiddleOfTable.Next)],
        margin: {
          top: 10,
          bottom: 2
        }
      })
    },
    {
      move: {
        player: opponent2
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.more.2" components={TutoComponents} />,
        position: { y: -20 }
      },
      focus: (game) => {
        return {
          materials: [this.material(game, MaterialType.Card).id((id: Card) => [Card.Orange8, Card.Orange5, Card.Orange3].includes(id))],
          locations: [this.location(LocationType.MiddleOfTable).id(MiddleOfTable.Next).location],
          margin: {
            top: 2,
            bottom: 2
          }
        }
      },
      move: {
        filter: (move, game) =>
          isMoveItemTypeAtOnce(MaterialType.Card)(move) &&
          move.indexes.length === 3 &&
          move.indexes.every((i) => [Card.Orange8, Card.Orange5, Card.Orange3].includes(game.items[MaterialType.Card]![i].id as Card))
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.pick.2" components={TutoComponents} />
      },
      move: {}
    },
    {
      move: {
        player: opponent1,
        filter: (move) => isCustomMoveType(CustomMoveType.Pass)(move)
      }
    },
    {
      move: {
        player: opponent2,
        filter: (move) => isCustomMoveType(CustomMoveType.Pass)(move)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.allpass" components={TutoComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.start" components={TutoComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.endtrigger" components={TutoComponents} />,
        size: { width: 100 }
      }
    }
  ]
  version = 1
}
