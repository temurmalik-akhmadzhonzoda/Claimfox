import { useMemo, useState, type CSSProperties } from 'react'
import { useI18n } from '@/i18n/I18nContext'
import { insuranceDataFields, type InsuranceDataField, type InsuranceDataPhase } from '@/components/inside-insurfox/insuranceDataFields'

type PhaseFilter = 'All' | InsuranceDataPhase

function includesText(value: string, query: string) {
  return value.toLowerCase().includes(query.toLowerCase())
}

export default function DataFieldExplorer() {
  const { t, lang } = useI18n()
  const isDe = lang === 'de'
  const [search, setSearch] = useState<string>('')
  const [phase, setPhase] = useState<PhaseFilter>('All')
  const [role, setRole] = useState<string>('All')
  const [aiOnly, setAiOnly] = useState<boolean>(false)

  function phaseLabel(value: InsuranceDataPhase) {
    if (!isDe) return value
    const labels: Record<InsuranceDataPhase, string> = {
      Registration: 'Registrierung',
      Fleet: 'Flotte',
      Driver: 'Fahrer',
      Underwriting: 'Underwriting',
      Claims: 'Schaden',
      Monitoring: 'Monitoring',
      Renewal: 'Erneuerung'
    }
    return labels[value]
  }

  function roleLabel(value: string) {
    if (!isDe) return value
    const labels: Record<string, string> = {
      'Corporate Client': 'Unternehmenskunde',
      'Claims Adjuster': 'Schadensachbearbeitung',
      'Fleet Operator': 'Flottenbetrieb',
      Carrier: 'Versicherer'
    }
    return labels[value] ?? value
  }

  function maskLabel(value: string) {
    if (!isDe) return value
    const labels: Record<string, string> = {
      'Company Onboarding': 'Unternehmens-Onboarding',
      'Fleet Profile': 'Flottenprofil',
      'Driver Profile': 'Fahrerprofil',
      'Underwriting Form': 'Underwriting-Formular',
      'FNOL Form': 'FNOL-Formular',
      'Fleet Monitoring': 'Flotten-Monitoring',
      'Renewal Assessment': 'Erneuerungsbewertung'
    }
    return labels[value] ?? value
  }

  const roles = useMemo(() => {
    const allRoles = insuranceDataFields.flatMap((item) => item.role)
    return Array.from(new Set(allRoles)).sort((a, b) => a.localeCompare(b))
  }, [])

  const filtered = useMemo(() => {
    return insuranceDataFields.filter((field) => {
      if (phase !== 'All' && field.phase !== phase) return false
      if (role !== 'All' && !field.role.includes(role)) return false
      if (aiOnly && !field.aiUsage) return false
      if (!search.trim()) return true
      const q = search.trim()
      return (
        includesText(field.fieldName, q) ||
        includesText(field.mask, q) ||
        includesText(maskLabel(field.mask), q) ||
        includesText(phaseLabel(field.phase), q) ||
        field.role.some((r) => includesText(r, q))
        || field.role.some((r) => includesText(roleLabel(r), q))
      )
    })
  }, [aiOnly, phase, role, search, isDe])

  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <div className="print-hide" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '0.55rem', alignItems: 'end' }}>
        <label style={filterLabelStyle}>
          <span style={filterTitleStyle}>{t('insideInsurfox.explorer.search')}</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('insideInsurfox.explorer.searchPlaceholder')}
            style={inputStyle}
          />
        </label>
        <label style={filterLabelStyle}>
          <span style={filterTitleStyle}>{t('insideInsurfox.explorer.phase')}</span>
          <select value={phase} onChange={(e) => setPhase(e.target.value as PhaseFilter)} style={inputStyle}>
            <option value="All">{t('insideInsurfox.explorer.all')}</option>
            <option value="Registration">{phaseLabel('Registration')}</option>
            <option value="Fleet">{phaseLabel('Fleet')}</option>
            <option value="Driver">{phaseLabel('Driver')}</option>
            <option value="Underwriting">{phaseLabel('Underwriting')}</option>
            <option value="Claims">{phaseLabel('Claims')}</option>
            <option value="Monitoring">{phaseLabel('Monitoring')}</option>
            <option value="Renewal">{phaseLabel('Renewal')}</option>
          </select>
        </label>
        <label style={filterLabelStyle}>
          <span style={filterTitleStyle}>{t('insideInsurfox.explorer.role')}</span>
          <select value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle}>
            <option value="All">{t('insideInsurfox.explorer.all')}</option>
            {roles.map((r) => (
              <option key={r} value={r}>{roleLabel(r)}</option>
            ))}
          </select>
        </label>
        <label style={{ ...filterLabelStyle, alignSelf: 'center' }}>
          <span style={filterTitleStyle}>{t('insideInsurfox.explorer.aiOnly')}</span>
          <input type="checkbox" checked={aiOnly} onChange={(e) => setAiOnly(e.target.checked)} />
        </label>
      </div>

      <div style={{ color: '#334155', fontSize: '0.85rem', fontWeight: 600 }}>
        {t('insideInsurfox.explorer.results')}: {filtered.length}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr style={headRowStyle}>
              <th style={thStyle}>{t('insideInsurfox.explorer.columns.field')}</th>
              <th style={thStyle}>{t('insideInsurfox.explorer.columns.phase')}</th>
              <th style={thStyle}>{t('insideInsurfox.explorer.columns.mask')}</th>
              <th style={thStyle}>{t('insideInsurfox.explorer.columns.role')}</th>
              <th style={thStyle}>{t('insideInsurfox.explorer.columns.purpose')}</th>
              <th style={thStyle}>{t('insideInsurfox.explorer.columns.aiUsage')}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row: InsuranceDataField) => (
              <tr key={row.id}>
                <td style={tdStrongStyle}>{row.fieldName}</td>
                <td style={tdStyle}>{phaseLabel(row.phase)}</td>
                <td style={tdStyle}>{maskLabel(row.mask)}</td>
                <td style={tdStyle}>{row.role.map((r) => roleLabel(r)).join(', ')}</td>
                <td style={tdStyle}>{row.purpose}</td>
                <td style={tdStyle}>{row.aiUsage ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const filterLabelStyle: CSSProperties = {
  display: 'grid',
  gap: '0.3rem'
}

const filterTitleStyle: CSSProperties = {
  color: '#475569',
  fontSize: '0.78rem',
  fontWeight: 700
}

const inputStyle: CSSProperties = {
  border: '1px solid #dbe2ea',
  borderRadius: 8,
  minHeight: 36,
  padding: '0.4rem 0.55rem',
  background: '#fff',
  color: '#0f172a'
}

const tableStyle: CSSProperties = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
  fontSize: '0.84rem'
}

const headRowStyle: CSSProperties = {
  background: '#f1f5f9'
}

const thStyle: CSSProperties = {
  textAlign: 'left',
  color: '#334155',
  padding: '0.55rem',
  borderBottom: '1px solid #dbe2ea',
  fontWeight: 700,
  whiteSpace: 'nowrap'
}

const tdStyle: CSSProperties = {
  color: '#334155',
  padding: '0.55rem',
  borderBottom: '1px solid #e2e8f0',
  verticalAlign: 'top'
}

const tdStrongStyle: CSSProperties = {
  ...tdStyle,
  color: '#0f172a',
  fontWeight: 700
}
