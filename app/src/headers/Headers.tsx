/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/odin/rules/RuleId'
import { ComponentType } from 'react'
import { PickCardsHeader } from './PickCardsHeader'
import { PlayCardsHeader } from './PlayCardsHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.PlayCards]: PlayCardsHeader,
  [RuleId.PickCard]: PickCardsHeader
}
