import { hideItemId, hideItemIdToOthers, MaterialGame, MaterialMove, PositiveSequenceStrategy, SecretMaterialRules, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerId } from './PlayerId'
import { DealCardsRule } from './rules/DealCardsRule'
import { EndOfRoundRule } from './rules/EndOfRoundRule'
import { PickCardRule } from './rules/PickCardRule'
import { PlayCardsRule } from './rules/PlayCardsRule'
import { RuleId } from './rules/RuleId'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class OdinRules
  extends SecretMaterialRules<PlayerId, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>>
{
  rules = {
    [RuleId.PlayCards]: PlayCardsRule,
    [RuleId.DealCards]: DealCardsRule,
    [RuleId.PickCard]: PickCardRule,
    [RuleId.EndOfRound]: EndOfRoundRule
  }

  hidingStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: hideItemId,
      [LocationType.Hand]: hideItemIdToOthers
    }
  }
  locationsStrategies = {
    [MaterialType.Card]: {
      [LocationType.Hand]: new PositiveSequenceStrategy(),
      [LocationType.Deck]: new PositiveSequenceStrategy(),
      [LocationType.MiddleOfTable]: new PositiveSequenceStrategy(),
      [LocationType.Discard]: new PositiveSequenceStrategy()
    }
  }

  giveTime(): number {
    return 60
  }
}
