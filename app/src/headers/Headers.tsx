/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/odin/rules/RuleId'
import { ComponentType } from 'react'
import { ChangePlayerHeader } from './ChangePlayerHeader'
import { EndOfRoundHeader } from './EndOfRoundHeader'
import { PickCardsHeader } from './PickCardsHeader'
import { PlayCardsHeader } from './PlayCardsHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.PlayCards]: PlayCardsHeader,
  [RuleId.PickCard]: PickCardsHeader,
  [RuleId.ChangePlayer]: ChangePlayerHeader,
  [RuleId.EndOfRound]: EndOfRoundHeader
}
