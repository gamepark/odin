/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/odin/rules/RuleId'
import { ComponentType } from 'react'
import { PlayCardsHeader } from './PlayCardsHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.PlayCards]: PlayCardsHeader
}
