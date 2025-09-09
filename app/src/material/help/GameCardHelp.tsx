/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Trans } from 'react-i18next'

const containerStyle = css`
  font-size: 0.7em;
`

const sectionTitleStyle = css`
  font-weight: bold;
`

const listStyle = css`
  list-style-type: disc;
`

const HelpComponents = {
  bold: <strong />
}

export const GameCardHelp = () => {
  return (
    <>
      <h2>
        <Trans defaults="help.card" components={HelpComponents} />
      </h2>
      <div css={containerStyle}>
        <h2 css={sectionTitleStyle}>
          <Trans defaults="help.goal" components={HelpComponents} />
        </h2>
        <p>
          <Trans defaults="help.goal.how" components={HelpComponents} />
        </p>

        <h2 css={sectionTitleStyle}>
          <Trans defaults="help.expl" components={HelpComponents} />
        </h2>
        <p>
          <Trans defaults="help.round" components={HelpComponents} />
        </p>
        <p>
          <Trans defaults="help.turn" components={HelpComponents} />
        </p>
        <ul css={listStyle}>
          <li>
            <Trans defaults="help.play" components={HelpComponents} />
            <br />
            <Trans defaults="help.play.1" components={HelpComponents} />
            <br />
            <Trans defaults="help.play.2" components={HelpComponents} />
            <br />
            <Trans defaults="help.play.3" components={HelpComponents} />
          </li>
          <li>
            <Trans defaults="help.pass" components={HelpComponents} />
          </li>
        </ul>
        <p>
          <Trans defaults="help.after" components={HelpComponents} />
        </p>

        <h2 css={sectionTitleStyle}>
          <Trans defaults="help.endturn" components={HelpComponents} />
        </h2>
        <p>
          <Trans defaults="help.endturn.how" components={HelpComponents} />
        </p>

        <h2 css={sectionTitleStyle}>
          <Trans defaults="help.endround" components={HelpComponents} />
        </h2>
        <p>
          <Trans defaults="help.endturn.how" components={HelpComponents} />
        </p>
        <ul css={listStyle}>
          <li>
            <Trans defaults="help.empty" components={HelpComponents} />
          </li>
          <li>
            <Trans defaults="help.specialplay" components={HelpComponents} />
          </li>
        </ul>
        <p>
          <Trans defaults="help.points" components={HelpComponents} />
        </p>

        <h2 css={sectionTitleStyle}>
          <Trans defaults="help.endgame" components={HelpComponents} />
        </h2>
        <p>
          <Trans defaults="help.endgame.how" components={HelpComponents} />
        </p>
      </div>
    </>
  )
}
