/** @jsxImportSource @emotion/react */
import { OdinOptionsSpec } from '@gamepark/odin/OdinOptions'
import { OdinRules } from '@gamepark/odin/OdinRules'
import { OdinSetup } from '@gamepark/odin/OdinSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { gameAnimations } from './animations/GameAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { OdinScoringDescription } from './scoring/OdinScoringDescription'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="odin"
      Rules={OdinRules}
      optionsSpec={OdinOptionsSpec}
      GameSetup={OdinSetup}
      scoring={new OdinScoringDescription()}
      material={Material}
      locators={Locators}
      animations={gameAnimations}
    >
      <App />
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
