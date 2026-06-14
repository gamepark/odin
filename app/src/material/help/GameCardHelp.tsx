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
        <Trans i18nKey="help.card" components={HelpComponents} />
      </h2>
      <div css={containerStyle}>
        <h2 css={sectionTitleStyle}>
          <Trans i18nKey="help.goal" components={HelpComponents} />
        </h2>
        <p>
          <Trans i18nKey="help.goal.how" components={HelpComponents} />
        </p>

        <h2 css={sectionTitleStyle}>
          <Trans i18nKey="help.expl" components={HelpComponents} />
        </h2>
        <p>
          <Trans i18nKey="help.round" components={HelpComponents} />
        </p>
        <p>
          <Trans i18nKey="help.turn" components={HelpComponents} />
        </p>
        <ul css={listStyle}>
          <li>
            <Trans i18nKey="help.play" components={HelpComponents} />
            <br />
            <Trans i18nKey="help.play.1" components={HelpComponents} />
            <br />
            <Trans i18nKey="help.play.2" components={HelpComponents} />
            <br />
            <Trans i18nKey="help.play.3" components={HelpComponents} />
          </li>
          <li>
            <Trans i18nKey="help.pass" components={HelpComponents} />
          </li>
        </ul>
        <p>
          <Trans i18nKey="help.after" components={HelpComponents} />
        </p>

        <h2 css={sectionTitleStyle}>
          <Trans i18nKey="help.endturn" components={HelpComponents} />
        </h2>
        <p>
          <Trans i18nKey="help.endturn.how" components={HelpComponents} />
        </p>

        <h2 css={sectionTitleStyle}>
          <Trans i18nKey="help.endround" components={HelpComponents} />
        </h2>
        <p>
          <Trans i18nKey="help.endturn.how" components={HelpComponents} />
        </p>
        <ul css={listStyle}>
          <li>
            <Trans i18nKey="help.empty" components={HelpComponents} />
          </li>
          <li>
            <Trans i18nKey="help.specialplay" components={HelpComponents} />
          </li>
        </ul>
        <p>
          <Trans i18nKey="help.points" components={HelpComponents} />
        </p>

        <h2 css={sectionTitleStyle}>
          <Trans i18nKey="help.endgame" components={HelpComponents} />
        </h2>
        <p>
          <Trans i18nKey="help.endgame.how" components={HelpComponents} />
        </p>
      </div>
    </>
  )
}
