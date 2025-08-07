import { MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
import { Card, getCardColor, getCardValue } from '../../material/Card'

export class SortHelper extends MaterialRulesPart {
  get sortByValue() {
    return [(item: MaterialItem) => -getCardValue(item.id as Card), (item: MaterialItem) => getCardColor(item.id as Card)]
  }
}
