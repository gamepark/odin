import { MaterialGame, MaterialMove, MaterialRules, PositiveSequenceStrategy, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayCardsRule } from './rules/PlayCardsRule'
import { RuleId } from './rules/RuleId'
import { DealCardsRule } from './rules/DealCardsRule'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class OdinRules
  extends MaterialRules<number, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<number, MaterialType, LocationType>, MaterialMove<number, MaterialType, LocationType>>
{
  rules = {
    [RuleId.PlayCards]: PlayCardsRule,
    [RuleId.DealCards]: DealCardsRule
  }

  locationsStrategies = {
    [MaterialType.Card]: {
      [LocationType.Hand]: new PositiveSequenceStrategy(),
      [LocationType.PlayArea]: new PositiveSequenceStrategy(),
      [LocationType.Deck]: new PositiveSequenceStrategy()
    }
  }

  giveTime(): number {
    return 60
  }
}
