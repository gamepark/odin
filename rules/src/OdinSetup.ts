import { getEnumValues, MaterialGameSetup } from '@gamepark/rules-api'
import { OdinOptions } from './OdinOptions'
import { OdinRules } from './OdinRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { RuleId } from './rules/RuleId'
import { Card } from './material/Card'
import { PlayerId } from './PlayerId'

/**
 * This class creates a new Game based on the game options
 */
export class OdinSetup extends MaterialGameSetup<PlayerId, MaterialType, LocationType, OdinOptions> {
  Rules = OdinRules

  setupMaterial(_options: OdinOptions) {
    this.material(MaterialType.Card).createItems(getEnumValues(Card).map((id) => ({ id, location: { type: LocationType.Deck } })))
    this.material(MaterialType.Card).shuffle()
  }

  start() {
    this.startRule(RuleId.DealCards)
  }
}
