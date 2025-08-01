/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation, usePlayerId } from '@gamepark/react-game'
import { FC } from 'react'
import { PlayerPanels } from './panels/PlayerPanels'
import { HandSortButtons } from './sort/HandSortButtons'

type GameDisplayProps = {
  players: number
}

export const GameDisplay: FC<GameDisplayProps> = ({ players }) => {
  const margin = { top: 7, left: 0, right: 0, bottom: 0 }
  const player = usePlayerId()
  const size = getTableSize(players, !player)
  return (
    <>
      <GameTable {...size} margin={margin} css={process.env.NODE_ENV !== 'development' && tableBorder}>
        <GameTableNavigation css={navigationCss(players)} />
        <PlayerPanels />
        <HandSortButtons xMin={size.xMin} yMin={size.yMin} />
      </GameTable>
    </>
  )
}

const navigationCss = (players: number) => css`
  top: ${players === 2 ? 9 : 18}em;
`

const getTableSize = (players: number, isSpectator: boolean) => {
  switch (players) {
    case 2:
      return { xMin: -30, xMax: 30, yMin: -20, yMax: isSpectator ? 20 : 21 }
    case 3:
      return { xMin: -35, xMax: 35, yMin: -22, yMax: 22 }
    case 4:
      return { xMin: -35, xMax: 35, yMin: -22, yMax: 22 }
    case 5:
      return { xMin: -35, xMax: 35, yMin: -22, yMax: 22 }
    default:
      return { xMin: -40, xMax: 40, yMin: -20, yMax: 22 }
  }
}

const tableBorder = css`
  border: 1px solid white;
`
