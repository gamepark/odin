/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Card, CardColor, getCardColor, getCardValue } from '@gamepark/odin/material/Card'
import { MaterialType } from '@gamepark/odin/material/MaterialType'
import { PlayCardsRule } from '@gamepark/odin/rules/PlayCardsRule'
import { MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { MaterialMove, MoveItemsAtOnce } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const PlayCardsLog: FC<MoveComponentProps<MaterialMove>> = (props) => {
  const { context } = props
  const move = props.move as MoveItemsAtOnce
  const player = context.action.playerId
  const name = usePlayerName(player)
  const rule = new PlayCardsRule(context.game)
  const cards = rule.material(MaterialType.Card).index(move.indexes).getItems()
  const ids = move.reveal ? Object.values(move.reveal).map((o) => o.id as Card) : cards.map((c) => c.id as Card)
  return <Trans defaults="logs.play-cards" values={{ player: name }} components={{ cards: <CardDisplay ids={ids} /> }} />
}

const CardDisplay: FC<{ ids: Card[] }> = ({ ids }) => {
  return (
    <span css={cardsCss}>
      {ids
        .sort((a, b) => getCardValue(b) - getCardValue(a))
        .map((id) => (
          <span key={id} css={colorCss(getCardColor(id))}>
            {getCardValue(id)}
          </span>
        ))}
    </span>
  )
}

const cardsCss = css`
  padding: 0.2em 0.4em;
  border-radius: 0.3em;
  background-color: rgba(255, 255, 255, 0.3);
`

const colorCss = (color: CardColor) => css`
  color: ${getHtmlColor(color)};
  padding-left: 0.1em;
  padding-right: 0.1em;
  font-weight: bold;
`

const getHtmlColor = (color: CardColor) => {
  switch (color) {
    case CardColor.Blue:
      return '#3E73B5'
    case CardColor.Red:
      return '#A7292D'
    case CardColor.Green:
      return '#4EB26C'
    case CardColor.Orange:
      return '#E87A22'
    case CardColor.Pink:
      return '#EE73A8'
    case CardColor.Brown:
      return '#523A2E'
  }
}
