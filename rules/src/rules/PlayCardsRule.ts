import { CustomMove, isCustomMoveType, isMoveItemTypeAtOnce, ItemMove, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import groupBy from 'lodash/groupBy'
import isEqual from 'lodash/isEqual'
import orderBy from 'lodash/orderBy'
import uniqWith from 'lodash/uniqWith'
import { Card, getCardColor, getCardValue } from '../material/Card'
import { LocationType, MiddleOfTable } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerId } from '../PlayerId'
import { BasePlayerTurn } from './BasePlayerTurn'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PlayCardsRule extends BasePlayerTurn {
  getPlayerMoves() {
    const playableCards = this.playableCards
    const table = this.table
    const tableSize = table.length

    const moves: MaterialMove[] = []

    const combinations = this.getPlayableCombinations(
      playableCards.getItems().map((item) => item.id as Card),
      tableSize,
      this.tableValue
    )

    const allHandCombination = this.getPlayableCombinations(
      playableCards.getItems().map((item) => item.id as Card),
      playableCards.length,
      this.tableValue
    )

    if (allHandCombination.length) {
      moves.push(
        ...allHandCombination.map((c) =>
          this.hand
            .id((id: Card) => c.includes(id))
            .sort(...this.sort)
            .moveItemsAtOnce({
              type: LocationType.MiddleOfTable,
              id: MiddleOfTable.Next
            })
        )
      )
    }

    moves.push(
      ...combinations.map((c) =>
        this.hand
          .id((id: Card) => c.includes(id))
          .sort(...this.sort)
          .moveItemsAtOnce({
            type: LocationType.MiddleOfTable,
            id: MiddleOfTable.Next
          })
      )
    )

    if (table.length) {
      moves.push(this.customMove(CustomMoveType.Pass))
    }

    return moves
  }

  get sort() {
    return [(item: MaterialItem) => -getCardValue(item.id as Card), (item: MaterialItem) => getCardColor(item.id as Card)]
  }

  get tableValue() {
    const table = this.table
    return !table.length ? 0 : this.concatCardValue(table.getItems().map((item) => item.id as Card))
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.Pass)(move)) return []
    const moves = this.afterPlaceCards()
    moves.push(...this.goToNextPlayer())
    return moves
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemTypeAtOnce(MaterialType.Card)(move) || move.location.type !== LocationType.MiddleOfTable) return []
    const moves = this.afterPlaceCards()
    this.memorize(Memory.LastPlayerThatPlay, this.player)

    const isEndOfRound = this.hand.length === 0
    moves.push(this.customMove(CustomMoveType.TurnTempo, isEndOfRound))
    if (this.hand.length === 0) {
      moves.push(this.startRule(RuleId.EndOfRound))
    } else {
      moves.push(this.startRule(RuleId.PickCard))
    }
    return moves
  }

  goToNextPlayer() {
    const next = this.nextPlayer
    const moves: MaterialMove[] = []

    const lastPlayerThatPlay = this.remind<PlayerId | undefined>(Memory.LastPlayerThatPlay)
    if (lastPlayerThatPlay && next === lastPlayerThatPlay) {
      this.forget(Memory.LastPlayerThatPlay)
      const table = this.table
      if (table.length) {
        moves.push(
          this.table.moveItemsAtOnce({
            type: LocationType.Discard
          })
        )
      }

      moves.push(this.startPlayerTurn(RuleId.PlayCards, next))
      return moves
    } else {
      moves.push(this.startPlayerTurn(RuleId.PlayCards, this.nextPlayer))
    }

    return moves
  }

  afterPlaceCards() {
    const moves: MaterialMove[] = []
    const selected = this.material(MaterialType.Card).selected().getItems()
    for (const item of selected) {
      delete item.selected
    }
    return moves
  }

  get firstPlayer() {
    return this.remind<PlayerId>(Memory.FirstPlayer)
  }

  get table() {
    return this.material(MaterialType.Card).location(LocationType.MiddleOfTable).locationId(MiddleOfTable.Current)
  }

  get playableCards() {
    return this.material(MaterialType.Card).location(LocationType.Hand).player(this.player)
  }

  get hand() {
    return this.material(MaterialType.Card).location(LocationType.Hand).player(this.player)
  }

  kCombinations<T>(arr: T[], k: number): T[][] {
    if (k === 0) return [[]]
    if (arr.length < k) return []
    if (arr.length === k) return [arr]
    const [first, ...rest] = arr
    return [...this.kCombinations(rest, k), ...this.kCombinations(rest, k - 1).map((comb) => [first, ...comb])]
  }

  /**
   * Calcule la valeur concaténée d'un ensemble de cartes (triées décroissant).
   */
  concatCardValue(cards: Card[]): number {
    const values = cards.map((card) => getCardValue(card)).sort((a, b) => getCardValue(b) - getCardValue(a))
    return parseInt(values.join(''), 10)
  }

  /**
   * Renvoie toutes les combinaisons jouables selon les règles.
   * @param hand Les cartes en main
   * @param tableCount Nombre de cartes déjà posées sur la table
   * @param tableValue Valeur concaténée déjà posée sur la table
   */
  getPlayableCombinations(hand: Card[], tableCount: number, tableValue: number): Card[][] {
    const results: Card[][] = []

    // Grouper par couleur
    const byColor = groupBy(hand, (card) => card % 10)
    // Grouper par valeur
    const byValue = groupBy(hand, (card) => Math.floor(card / 10))

    for (const group of [byColor, byValue]) {
      for (const cards of Object.values(group)) {
        for (const count of [tableCount, tableCount + 1]) {
          if (cards.length >= count) {
            for (const comb of this.kCombinations(cards, count)) {
              if (this.concatCardValue(comb) > tableValue) {
                results.push(comb)
              }
            }
          }
        }
      }
    }

    const unique = uniqWith(results, (a, b) => isEqual(orderBy(a), orderBy(b)))
    return unique
  }
}
