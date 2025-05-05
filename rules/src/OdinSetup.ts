import { MaterialGameSetup } from '@gamepark/rules-api'
import { OdinOptions } from './OdinOptions'
import { OdinRules } from './OdinRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class OdinSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, OdinOptions> {
  Rules = OdinRules

  setupMaterial(_options: OdinOptions) {
    // TODO
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}
