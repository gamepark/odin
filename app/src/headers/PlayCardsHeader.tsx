/** @jsxImportSource @emotion/react */

import { CustomMoveType } from '@gamepark/odin/rules/CustomMoveType'
import { PlayCardsRule } from '@gamepark/odin/rules/PlayCardsRule'
import { PlayMoveButton, useGame, useLegalMove } from '@gamepark/react-game'
import { isCustomMoveType, MaterialGame, MaterialMove } from '@gamepark/rules-api'

export const PlayCardsHeader = () => {
  const pass = useLegalMove((move: MaterialMove) => isCustomMoveType(CustomMoveType.Pass)(move))
  const game = useGame<MaterialGame>()!
  const rule = new PlayCardsRule(game)
  if (rule.canPass) {
    return <PlayMoveButton move={pass}>Passer</PlayMoveButton>
  }
  return <>Jouez des cartes de votre main.</>
}
