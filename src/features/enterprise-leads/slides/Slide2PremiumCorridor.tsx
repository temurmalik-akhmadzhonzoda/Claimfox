import React from 'react'
import LogistikIndustrieDe from '@/assets/images/logistik_industrie_de.png'
import LogistikIndustrieEn from '@/assets/images/logistik_industrie_en.png'
import InsurfoxLogo from '@/assets/logos/Insurfox_Logo_colored_dark.png'

type SlideProps = {
  lang: 'de' | 'en'
}

const premiumContent = {
  de: {
    title: 'Premium Corridor from Model-based Exposure',
    subline: 'Conservative derivation. Exposure ≠ premium ≠ revenue.',
    kpis: {
      exposureDe: 'Lead Exposure DE',
      exposureEea: 'Lead Exposure EEA',
      corridor: 'Premium factor corridor',
      base: 'Base case factor',
      exposureDeValue: '12,900 Mrd. €',
      exposureEeaValue: '133,250 Mrd. €',
      corridorValue: '2,0 % – 4,0 %',
      baseValue: '3,0 %'
    },
    tableTitle: 'Indicative premium corridor (DE & EEA)',
    tableColumns: ['Market', 'Low (2.0%)', 'Base (3.0%)', 'High (4.0%)'],
    marketDe: 'Deutschland',
    marketEea: 'EEA',
    assumptionsTitle: 'Assumptions',
    assumptions: [
      'Premium factor corridor reflects typical multi-line logistics portfolios.',
      'Actual premium depends on mix, retention, cycle, deductibles and underwriting.',
      'This is a sizing corridor, not a revenue forecast.'
    ]
  },
  en: {
    title: 'Premium corridor from model-based exposure',
    subline: 'Conservative derivation. Exposure ≠ premium ≠ revenue.',
    kpis: {
      exposureDe: 'Lead Exposure DE',
      exposureEea: 'Lead Exposure EEA',
      corridor: 'Premium factor corridor',
      base: 'Base case factor',
      exposureDeValue: '12,900 Mrd. €',
      exposureEeaValue: '133,250 Mrd. €',
      corridorValue: '2,0 % – 4,0 %',
      baseValue: '3,0 %'
    },
    tableTitle: 'Indicative premium corridor (DE & EEA)',
    tableColumns: ['Market', 'Low (2.0%)', 'Base (3.0%)', 'High (4.0%)'],
    marketDe: 'Germany',
    marketEea: 'EEA',
    assumptionsTitle: 'Assumptions',
    assumptions: [
      'Premium factor corridor reflects typical multi-line logistics portfolios.',
      'Actual premium depends on mix, retention, cycle, deductibles and underwriting.',
      'This is a sizing corridor, not a revenue forecast.'
    ]
  }
}

const formatMoney = (value: number, lang: 'de' | 'en') => {
  if (lang === 'de') {
    return `${(value / 1e9).toLocaleString('de-DE', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} Mrd. €`
  }
  return `€${(value / 1e9).toLocaleString('en-GB', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}bn`
}

export default function Slide2PremiumCorridor({ lang }: SlideProps) {
  const premiumStrings = premiumContent[lang]
  const industryImage = lang === 'en' ? LogistikIndustrieEn : LogistikIndustrieDe
  const exposureDe = 12.9e9
  const exposureEea = 133.25e9

  return (
    <div className="enterprise-premium-slide">
      <div className="enterprise-premium-header">
        <h1>{premiumStrings.title}</h1>
        <p>{premiumStrings.subline}</p>
      </div>
      <div className="enterprise-premium-content">
        <div className="enterprise-premium-kpis">
          <div className="enterprise-premium-card"><span>{premiumStrings.kpis.exposureDe}</span><strong>{premiumStrings.kpis.exposureDeValue}</strong></div>
          <div className="enterprise-premium-card"><span>{premiumStrings.kpis.exposureEea}</span><strong>{premiumStrings.kpis.exposureEeaValue}</strong></div>
          <div className="enterprise-premium-card"><span>{premiumStrings.kpis.corridor}</span><strong>{premiumStrings.kpis.corridorValue}</strong></div>
          <div className="enterprise-premium-card"><span>{premiumStrings.kpis.base}</span><strong>{premiumStrings.kpis.baseValue}</strong></div>
        </div>
        <div className="enterprise-premium-stack">
          <div className="enterprise-table-card enterprise-premium-table">
            <h3>{premiumStrings.tableTitle}</h3>
            <table>
              <thead>
                <tr>
                  {premiumStrings.tableColumns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{premiumStrings.marketDe}</td>
                  <td className="num">{formatMoney(exposureDe * 0.02, lang)}</td>
                  <td className="num">{formatMoney(exposureDe * 0.03, lang)}</td>
                  <td className="num">{formatMoney(exposureDe * 0.04, lang)}</td>
                </tr>
                <tr>
                  <td>{premiumStrings.marketEea}</td>
                  <td className="num">{formatMoney(exposureEea * 0.02, lang)}</td>
                  <td className="num">{formatMoney(exposureEea * 0.03, lang)}</td>
                  <td className="num">{formatMoney(exposureEea * 0.04, lang)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="enterprise-premium-image">
            <h3 className="enterprise-premium-image-title">Partners and verified leads</h3>
            <img src={industryImage} alt="Partners and verified leads" />
          </div>
        </div>
        <div className="enterprise-premium-charts">
          <div className="enterprise-table-card enterprise-premium-chart">
            <h3>Germany – Indicative premium corridor</h3>
            <svg width="260" height="180" role="img" aria-label="Germany premium corridor">
              <line className="axis" x1="20" y1="120" x2="240" y2="120" />
              <rect className="bar bar-low" x="40" y="85" width="28" height="35" />
              <rect className="bar bar-base" x="116" y="70" width="28" height="50" />
              <rect className="bar bar-high" x="192" y="55" width="28" height="65" />
              <text className="bar-value" x="54" y="78" textAnchor="middle">258 Mio €</text>
              <text className="bar-value" x="130" y="63" textAnchor="middle">387 Mio €</text>
              <text className="bar-value" x="206" y="48" textAnchor="middle">516 Mio €</text>
              <g className="legend">
                <line className="legend-line bar-low" x1="20" y1="155" x2="36" y2="155" />
                <text className="legend-text" x="42" y="158">Low (2.0%)</text>
                <line className="legend-line bar-base" x1="118" y1="155" x2="134" y2="155" />
                <text className="legend-text" x="140" y="158">Base (3.0%)</text>
                <line className="legend-line bar-high" x1="206" y1="155" x2="222" y2="155" />
                <text className="legend-text" x="228" y="158">High (4.0%)</text>
              </g>
            </svg>
          </div>
          <div className="enterprise-table-card enterprise-premium-chart">
            <h3>EEA – Indicative premium corridor</h3>
            <svg width="260" height="180" role="img" aria-label="EEA premium corridor">
              <line className="axis" x1="20" y1="120" x2="240" y2="120" />
              <rect className="bar bar-low" x="40" y="70" width="28" height="50" />
              <rect className="bar bar-base" x="116" y="50" width="28" height="70" />
              <rect className="bar bar-high" x="192" y="35" width="28" height="85" />
              <text className="bar-value" x="54" y="62" textAnchor="middle">2.7 Mrd €</text>
              <text className="bar-value" x="130" y="42" textAnchor="middle">4.0 Mrd €</text>
              <text className="bar-value" x="206" y="27" textAnchor="middle">5.3 Mrd €</text>
              <g className="legend">
                <line className="legend-line bar-low" x1="20" y1="155" x2="36" y2="155" />
                <text className="legend-text" x="42" y="158">Low (2.0%)</text>
                <line className="legend-line bar-base" x1="118" y1="155" x2="134" y2="155" />
                <text className="legend-text" x="140" y="158">Base (3.0%)</text>
                <line className="legend-line bar-high" x1="206" y1="155" x2="222" y2="155" />
                <text className="legend-text" x="228" y="158">High (4.0%)</text>
              </g>
            </svg>
          </div>
          <div className="enterprise-table-card enterprise-premium-logo-card">
            <img src={InsurfoxLogo} alt="Insurfox" />
          </div>
        </div>
      </div>
      <div className="enterprise-premium-assumptions">
        <h2>{premiumStrings.assumptionsTitle}</h2>
        <ul>
          {premiumStrings.assumptions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
