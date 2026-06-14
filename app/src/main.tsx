import { OdinOptionsSpec } from '@gamepark/odin/OdinOptions'
import { OdinRules } from '@gamepark/odin/OdinRules'
import { OdinSetup } from '@gamepark/odin/OdinSetup'
import { GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { OdinLogs } from './logs/OdinLogs'
import { Material } from './material/Material'
import { OdinScoringDescription } from './scoring/OdinScoringDescription'
import { Tutorial } from './tutorial/Tutorial'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="odin"
      Rules={OdinRules}
      optionsSpec={OdinOptionsSpec}
      GameSetup={OdinSetup}
      logs={new OdinLogs()}
      tutorial={new Tutorial()}
      scoring={new OdinScoringDescription()}
      material={Material}
      locators={Locators}
      animations={gameAnimations}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
