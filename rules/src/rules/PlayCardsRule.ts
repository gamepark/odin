import { CustomMove, isCustomMoveType, Material, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import groupBy from 'lodash/groupBy'
import isEqual from 'lodash/isEqual'
import mapValues from 'lodash/mapValues'
import orderBy from 'lodash/orderBy'
import uniqWith from 'lodash/uniqWith'
import { Card, getCardColor, getCardValue } from '../material/Card'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { RuleId } from './RuleId'

export class PlayCardsRule extends PlayerTurnRule {
  getPlayerMoves() {
    const playableCards = this.playableCards
    const table = this.middleOfTable
    const tableSize = table.length

    const canPass = this.canPass
    if (canPass) {
      return [this.customMove(CustomMoveType.Pass)]
    }

    if (!table.length && !this.playedCards.length) {
      return playableCards.moveItems({
        type: LocationType.PlayArea,
        player: this.player
      })
    }

    const combinations = this.getPlayableCombinations(
      playableCards.getItems().map((item) => item.id as Card),
      tableSize + 1,
      this.tableValue
    )

    const playedCardsIds = this.playedCards.getItems().map((item) => item.id as Card)
    const applyableCombinations = playableCards.length ? combinations.filter((c) => playedCardsIds.every((id) => c.includes(id))) : combinations
    const cards = this.hand.id<Card>((id) => applyableCombinations.some((c) => c.includes(id)))

    return cards.moveItems({
      type: LocationType.PlayArea,
      player: this.player
    })
  }

  get canPass() {
    const table = this.middleOfTable
    const playedCards = this.playedCards
    return !table.length ? playedCards.length === 1 : playedCards.length >= table.length
  }

  get tableValue() {
    const table = this.middleOfTable
    return !table.length ? 0 : this.concatCardValue(table.getItems().map((item) => item.id as Card))
  }

  get cardByColors() {
    const hand = this.hand
    const indexes = hand.getIndexes()
    return mapValues(
      groupBy(indexes, (index) => getCardColor(hand.getItem(index).id as Card)),
      (i) => hand.index(i).sort((item) => -getCardValue(item.id as Card))
    )
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.Pass)(move)) return []
    const moves: MaterialMove[] = []
    moves.push(
      this.playedCards.moveItemsAtOnce({
        type: LocationType.MiddleOfTable
      })
    )

    const table = this.middleOfTable
    if (table.length) {
      moves.push(this.startRule(RuleId.PickCard))
    } else {
      moves.push(this.startPlayerTurn(RuleId.PlayCards, this.nextPlayer))
    }
    return moves
  }

  getCardsValue(cards: Material) {
    const items = cards.getItems()
    let factor = Math.pow(10, items.length - 1)
    let value = 0
    for (const item of items) {
      value += factor * getCardValue(item.id as Card)
      factor /= 10
    }

    return value
  }

  get playedCards() {
    return this.material(MaterialType.Card).location(LocationType.PlayArea).player(this.player)
  }

  get middleOfTable() {
    return this.material(MaterialType.Card).location(LocationType.MiddleOfTable)
  }

  get playableCards() {
    return this.material(MaterialType.Card)
      .location((l) => l.type === LocationType.Hand || l.type === LocationType.PlayArea)
      .player(this.player)
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
    const values = cards.map((card) => Math.floor(card / 10)).sort((a, b) => b - a)
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
