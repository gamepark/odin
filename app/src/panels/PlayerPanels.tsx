/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayerId } from '@gamepark/odin/PlayerId'
import { CustomMoveType } from '@gamepark/odin/rules/CustomMoveType'
import { ScoreHelper } from '@gamepark/odin/rules/helper/ScoreHelper'
import { StyledPlayerPanel, useAnimation, usePlayers, useRules } from '@gamepark/react-game'
import { isCustomMoveType, MaterialMove, MaterialRules } from '@gamepark/rules-api'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import Player1 from '../images/panel/player-1.jpg'
import Player2 from '../images/panel/player-2.jpg'
import Player3 from '../images/panel/player-3.jpg'
import Player4 from '../images/panel/player-4.jpg'
import Player5 from '../images/panel/player-5.jpg'
import Player6 from '../images/panel/player-6.jpg'
import Star from '../images/panel/star.png'

export const PlayerPanels = () => {
  const players = usePlayers<number>({ sortFromMe: true })
  const { t } = useTranslation()
  const rules = useRules<MaterialRules>()!
  const root = document.getElementById('root')
  const animation = useAnimation<MaterialMove>((animation) => isCustomMoveType(CustomMoveType.Pass)(animation.move))
  if (!root) {
    return null
  }

  const speakingPlayer = animation && rules.getActivePlayer()
  const speak = animation ? t('speak.pass') : undefined

  return createPortal(
    <>
      {players.map((player, index) => (
        <StyledPlayerPanel
          activeRing
          key={player.id}
          player={player}
          css={[panelPosition(players.length, index), backgroundCss(player.id)]}
          counters={[
            {
              image: Star,
              value: new ScoreHelper(rules.game, player.id).score
            }
          ]}
          speak={speakingPlayer === player.id && speak}
        />
      ))}
    </>,
    root
  )
}

const backgroundCss = (player: PlayerId) => {
  return css`
    background-image: url(${panelImage(player)});
    background-size: 100% 100%;
    background-repeat: no-repeat;
  `
}

const panelImage = (player: PlayerId) => {
  switch (player) {
    case 1:
      return Player1
    case 2:
      return Player2
    case 3:
      return Player3
    case 4:
      return Player4
    case 5:
      return Player5
    default:
      return Player6
  }
}

const panelPosition = (players: number, index: number) => {
  const panelCss = getPanelPositionCss(players)
  return css`
    position: absolute;
    ${panelCss[index]}
  `
}

const getPanelPositionCss = (players: number) => {
  if (players === 2) return [BottomRightPanel, TopRightPanel]
  if (players === 3) return [BottomRightPanel, TopLeftPanel, TopRightPanel]
  if (players === 4) return [BottomLeftPanel, TopLeftPanel, TopRightPanel, BottomRightPanel]
  if (players === 5) return [BottomLeftPanel, TopLeftPanel, TopCenterPanel, TopRightPanel, BottomRightPanel]
  return [BottomCenterPanel, BottomLeftPanel, TopLeftPanel, TopCenterPanel, TopRightPanel, BottomRightPanel]
}

const TopLeftPanel = css`
  left: 1em;
  top: 8.5em;
`

const TopCenterPanel = css`
  left: 50%;
  transform: translateX(-50%);
  top: 8.5em;
`

const TopRightPanel = css`
  right: 1em;
  top: 8.5em;
`

const BottomLeftPanel = css`
  left: 1em;
  bottom: 1em;
`

const BottomCenterPanel = css`
  left: 50%;
  transform: translateX(-50%);
  bottom: 1em;
`

const BottomRightPanel = css`
  right: 1em;
  bottom: 1em;
`
