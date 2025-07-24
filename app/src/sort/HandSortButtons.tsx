/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faArrowUp19 } from '@fortawesome/free-solid-svg-icons/faArrowUp19'
import { faArrowDown19 } from '@fortawesome/free-solid-svg-icons/faArrowDown19'
import { faPalette } from '@fortawesome/free-solid-svg-icons/faPalette'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LocationType } from '@gamepark/odin/material/LocationType'
import { CustomMoveType } from '@gamepark/odin/rules/CustomMoveType'
import { Memory } from '@gamepark/odin/rules/Memory'
import { Sort } from '@gamepark/odin/rules/Sort'
import { ItemMenuButton, transformCss, useMaterialContext } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { playerHandLocator } from '../locators/PlayerHandLocator'

type Props = {
  xMin: number
  yMin: number
}

export const HandSortButtons = ({ xMin, yMin }: Props) => {
  const { t } = useTranslation()
  const context = useMaterialContext()
  const player = context.player
  if (!player) return null
  const location = { type: LocationType.Hand, player }
  if (playerHandLocator.countItems(location, context) < 2) return null
  const transform = playerHandLocator.placeLocation(location, context)
  const sort = context.rules.remind<Sort | undefined>(Memory.HandSort) ?? Sort.ValueDesc
  const isValueDescSort = sort === Sort.ValueDesc
  return (
    <>
      <ItemMenuButton
        label={t(`sort.color`)}
        labelPosition="left"
        css={[position(xMin, yMin), transformCss(...transform, 'translateY(-8.5em)', 'translateX(8em)')]}
        move={context.rules.customMove(CustomMoveType.SortHand, Sort.Color)}
        options={{ transient: true }}
      >
        <FontAwesomeIcon icon={faPalette} />
      </ItemMenuButton>
      <ItemMenuButton
        label={t(`sort.value`)}
        labelPosition="left"
        css={[position(xMin, yMin), transformCss(...transform, 'translateY(-8.5em)', 'translateX(-4em)')]}
        move={context.rules.customMove(CustomMoveType.SortHand, !isValueDescSort ? Sort.ValueDesc : Sort.ValueAsc)}
        options={{ transient: true }}
      >
        <FontAwesomeIcon icon={!isValueDescSort ? faArrowUp19 : faArrowDown19} />
      </ItemMenuButton>
    </>
  )
}

const position = (xMin: number, yMin: number) => css`
  position: absolute;
  left: ${-xMin}em;
  top: ${-yMin}em;
`
