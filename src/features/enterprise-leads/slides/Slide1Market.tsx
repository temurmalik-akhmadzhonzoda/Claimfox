import React from 'react'
import { enterpriseStrings } from '@/i18n/strings'
import KarteDeEu from '@/assets/images/karte_de_eu.png'
import KarteDeEuEn from '@/assets/images/karte_eu_de_englisch.png'

const compositionRows = [
  { label: 'Motor (Kraftfahrt)', value: '€ 34.015 bn' },
  { label: 'Property (Sach)', value: '€ 11.306 bn' },
  { label: 'Liability (Haftpflicht)', value: '€ 8.932 bn' },
  { label: 'Transport', value: '€ 2.467 bn' },
  { label: 'Technical Lines', value: '€ 3.044 bn' },
  { label: 'Cyber', value: '€ 0.330 bn' }
]

const stackRows = [
  { label: 'Fleet Motor', value: '€ 34.015 bn' },
  { label: 'Cargo', value: '€ 2.467 bn' },
  { label: 'Liability', value: '€ 8.932 bn' },
  { label: 'Property', value: '€ 11.306 bn' },
  { label: 'Technical', value: '€ 3.044 bn' },
  { label: 'Cyber', value: '€ 0.330 bn' }
]

type SlideProps = {
  lang: 'de' | 'en'
}

export default function Slide1Market({ lang }: SlideProps) {
  const copy = enterpriseStrings[lang]
  const mapImage = lang === 'en' ? KarteDeEuEn : KarteDeEu

  return (
    <div className="enterprise-grid-only">
      <h1>German and European Markets</h1>
      <div className="enterprise-grid-3">
        <div className="enterprise-table-stack">
          <div className="enterprise-table-card enterprise-table-card-left">
            <h3>German Market</h3>
            <table>
              <thead>
                <tr>
                  <th className="label">Line of Business</th>
                  <th className="num">Market Volume</th>
                </tr>
              </thead>
              <tbody>
                {compositionRows.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td className="num">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="enterprise-table-card enterprise-table-card-left">
            <h3>Germany - Logistic / Cargo</h3>
            <table>
              <thead>
                <tr>
                  <th className="label">Insurance Segment</th>
                  <th className="num">Market Volume</th>
                </tr>
              </thead>
              <tbody>
                {stackRows.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td className="num">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="enterprise-map-card">
          <div className="enterprise-map-heading">
            <span className="heading-line heading-line-left" aria-hidden="true" />
            <div className="heading-text">
              <span className="heading-title">AI-IAAS B2B PLATFORM</span>
              <span className="heading-subtitle">For Brokers and Insurance Operations</span>
              <span className="heading-note">Enterprise-grade. Core-system agnostic.</span>
            </div>
            <span className="heading-line heading-line-right" aria-hidden="true" />
          </div>
          <img src={mapImage} alt={copy.marketImageAlt} />
        </div>
        <div className="enterprise-table-stack">
          <div className="enterprise-table-card">
            <h3>EEA Market - GWP (Solvency II)</h3>
            <table>
              <thead>
                <tr>
                  <th className="label">Line of Business</th>
                  <th className="num">Market Volume</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Motor vehicle liability</td><td className="num">€ 68.511 bn</td></tr>
                <tr><td>Other motor</td><td className="num">€ 57.203 bn</td></tr>
                <tr><td>Property (Fire &amp; other damage)</td><td className="num">€ 101.823 bn</td></tr>
                <tr><td>General liability</td><td className="num">€ 42.442 bn</td></tr>
                <tr><td>Medical expense</td><td className="num">€ 113.123 bn</td></tr>
                <tr className="total-row"><td>Total non-life</td><td className="num">€ 457.220 bn</td></tr>
              </tbody>
            </table>
          </div>
          <div className="enterprise-table-card">
            <h3>EEA - Logistic / Cargo</h3>
            <table>
              <thead>
                <tr>
                  <th className="label">Line of Business</th>
                  <th className="num">Market Volume</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Motor</td><td className="num">~€ 149 bn (36%)</td></tr>
                <tr><td>Property</td><td className="num">~€ 113 bn (27%)</td></tr>
                <tr><td>General liability</td><td className="num">~€ 50 bn (12%)</td></tr>
                <tr><td>Other</td><td className="num">~€ 105 bn (25%)</td></tr>
                <tr className="total-row"><td>Total P&amp;C</td><td className="num">€ 419 bn (100%)</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <p className="enterprise-footnote">{copy.cover.summary}</p>
    </div>
  )
}
