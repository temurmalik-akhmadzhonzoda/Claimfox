import React, { useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Header from '@/components/ui/Header'

const AUTH_KEY = 'cf_intern_auth'

const playbookSections = [
  {
    title: '1. Zweck dieses Playbooks',
    body:
      'Dieses Playbook ist die verbindliche technische Leitlinie für alle Entwickler:innen, die an KI-, Daten- oder Backend-Systemen arbeiten.'
  },
  {
    title: 'Es beantwortet:',
    body:
      'Welche KI darf implementiert werden? Welche Daten dürfen verarbeitet werden? Wie sieht die Referenzarchitektur aus? Welche technischen Schutzmaßnahmen sind Pflicht? Wie wird Compliance im Code umgesetzt?',
    emphasis: '➡️ Regel: Wenn etwas hier nicht erlaubt ist, wird es nicht gebaut.'
  },
  {
    title: '2. Grundprinzipien (nicht verhandelbar)',
    body: '2.1 Infrastructure First · Betrieb ausschließlich auf IaaS · keine externen KI-APIs (SaaS / Black Box)'
  },
  {
    title: '2.2 KI ist unterstützend – nicht entscheidend',
    body: 'KI liefert Scores, Wahrscheinlichkeiten, Empfehlungen · keine autonomen Entscheidungen mit Rechtswirkung · Human-in-the-Loop ist Pflicht'
  },
  {
    title: '2.3 Compliance wird im Code erzwungen',
    body: 'Datenschutz ≠ Dokumentation · Datenschutz = Architektur + Validierung + technische Sperren'
  }
]

const allowlistData = [
  'vehicle: mileage, error_codes, maintenance_state',
  'telematics: speed, braking_events, acceleration, load_weight',
  'operations: route_id, trip_duration, damage_event'
]

const blacklistData = ['health_data', 'biometric_data', 'private_location_tracking', 'social_media_data']

export default function InternPage() {
  const [isAuthed, setIsAuthed] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(AUTH_KEY) === 'true'
  })
  const [showPlaybook, setShowPlaybook] = useState(false)
  const [username, setUsername] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  const isValid = useMemo(() => username.trim().toLowerCase() === 'ralf' && pin.trim() === '1704', [username, pin])

  function handleLogin(event: React.FormEvent) {
    event.preventDefault()
    if (!isValid) {
      setError('Zugangsdaten prüfen.')
      return
    }
    setError('')
    setIsAuthed(true)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(AUTH_KEY, 'true')
    }
  }

  if (!isAuthed) {
    return (
      <section className="page" style={{ gap: '2rem' }}>
        <div style={{ width: '100%', maxWidth: 520, margin: '0 auto' }}>
          <Header title="Intern" subtitle="Zugriff nur für autorisierte Personen." subtitleColor="#65748b" />
          <Card>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label className="form-field">
                Benutzername
                <input className="text-input" value={username} onChange={(event) => setUsername(event.target.value)} />
              </label>
              <label className="form-field">
                PIN
                <input
                  className="text-input"
                  type="password"
                  inputMode="numeric"
                  value={pin}
                  onChange={(event) => setPin(event.target.value)}
                />
              </label>
              {error && <span className="error-text">{error}</span>}
              <Button type="submit">Freigeben</Button>
            </form>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="page intern-page" style={{ gap: '2.5rem' }}>
      <div className="intern-shell">
        <div className="intern-hero">
          <Header title="Intern" subtitle="KI-, Daten- und Backend-Guidelines für unser System." subtitleColor="#65748b" />
          <div className="intern-hero-metrics">
            <span>Native KI-Systeme</span>
            <span>IaaS first</span>
            <span>Compliance by design</span>
          </div>
        </div>

        {!showPlaybook ? (
          <div className="intern-grid">
            <Card
              title="Developer Playbook"
              subtitle="Native KI-Systeme auf IaaS · Insurance · Fleet · Logistics"
              interactive
              onClick={() => setShowPlaybook(true)}
              className="intern-card"
            >
              <p>
                Technische Leitlinie für KI-Implementierung, Architektur, Compliance und sichere Datenverarbeitung.
              </p>
              <Button style={{ alignSelf: 'flex-start' }}>Öffnen</Button>
            </Card>
            <Card title="Compliance Checklists" subtitle="Governance & Audit" className="intern-card">
              <p>Vorlagen für Audit-Trails, Modellfreigaben und Security Reviews. (in Vorbereitung)</p>
            </Card>
            <Card title="Data Contracts" subtitle="Allowlist & Validation" className="intern-card">
              <p>Schema-Definitionen für Datenpipelines, Pseudonymisierung und Mandantentrennung. (in Arbeit)</p>
            </Card>
          </div>
        ) : (
          <div className="intern-playbook">
            <div className="intern-playbook-header">
              <Button variant="secondary" onClick={() => setShowPlaybook(false)}>
                Zurück
              </Button>
              <div>
                <h1>Playbook</h1>
                <p>Native KI-Systeme auf IaaS · Insurance · Fleet · Logistics</p>
              </div>
            </div>

            <div className="intern-playbook-grid">
              {playbookSections.map((section) => (
                <Card key={section.title} className="intern-playbook-card">
                  <h3>{section.title}</h3>
                  <p>{section.body}</p>
                  {section.emphasis && <p className="intern-emphasis">{section.emphasis}</p>}
                </Card>
              ))}
            </div>

            <Card className="intern-architecture">
              <h2>3. Referenzarchitektur (verbindlich)</h2>
              <pre>
{`┌─────────────────────┐
│  Data Sources       │
│  (Telematik, IoT)   │
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│ Data Ingestion      │
│ - Validation        │
│ - Pseudonymisierung │
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│ Feature Store       │
│ - Allowlist         │
│ - Versionierung     │
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│ Model Training      │
│ - Reproduzierbar    │
│ - Isoliert          │
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│ Model Registry      │
│ - Versionen         │
│ - Freigaben         │
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│ Inference Service   │
│ - Explainability    │
│ - Logging           │
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│ Decision Support API│
│ (kein Auto-Decision)│
└─────────────────────┘`}
              </pre>
            </Card>

            <Card className="intern-playbook-card">
              <h2>4. Erlaubte KI-Systeme (Whitelist)</h2>
              <h4>4.1 Analytische KI (Core)</h4>
              <ul>
                <li>Risiko-Scoring (Flotte, Schaden, Route)</li>
                <li>Schadenwahrscheinlichkeit</li>
                <li>Kosten- & Dauerprognosen</li>
                <li>Anomalie- & Betrugserkennung</li>
              </ul>
              <p>Modelle: Tree-Based Models · GLM · Zeitreihenmodelle · erklärbare ML-Modelle</p>
              <h4>4.2 Assistive KI</h4>
              <ul>
                <li>Priorisierung von Schäden</li>
                <li>Handlungsempfehlungen für Sachbearbeiter</li>
                <li>Warnsysteme (z. B. Wartung)</li>
              </ul>
              <h4>4.3 Dokumenten-KI</h4>
              <ul>
                <li>OCR</li>
                <li>NLP auf Schadenberichten</li>
                <li>Rechnungs- & Gutachtenanalyse</li>
              </ul>
            </Card>

            <Card className="intern-playbook-card">
              <h2>5. Verbotene KI-Systeme (Blacklist)</h2>
              <ul className="intern-blocklist">
                <li>Autonome Schadenablehnung</li>
                <li>Automatische Vertragskündigung</li>
                <li>Personenbezogenes Fahrer-Scoring</li>
                <li>Dauerüberwachung einzelner Fahrer</li>
                <li>Soziale oder verhaltensbasierte Scores</li>
              </ul>
              <p className="intern-emphasis">➡️ Diese Logik darf nicht existieren – auch nicht „optional“.</p>
            </Card>

            <Card className="intern-playbook-card">
              <h2>6. Datenrichtlinien (technisch verbindlich)</h2>
              <h4>6.1 Erlaubte Daten (Default Allowlist)</h4>
              <ul>
                {allowlistData.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h4>6.2 Personenbezug (nur pseudonymisiert)</h4>
              <p>✔ Fahrer-Token (Hash, kein Klarname) · ✔ Ereigniszeitpunkte · ✔ Unfallkontext</p>
              <p>Pflicht: Tokenisierung vor Speicherung · keine Re-Identifikation möglich · keine Langzeitprofile</p>
              <h4>6.3 Technisch verbotene Daten</h4>
              <div className="intern-blocklist">
                {blacklistData.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <p className="intern-emphasis">➡️ Muss durch Schema Validation, API Gateways, Data Contracts blockiert werden.</p>
            </Card>

            <div className="intern-playbook-grid">
              <Card className="intern-playbook-card">
                <h2>7. KI-Governance (Pflichtfeatures)</h2>
                <ul>
                  <li>Modell-ID & Version liefern</li>
                  <li>Trainingsdaten-Version referenzieren</li>
                  <li>Inferenz-Logs erzeugen</li>
                  <li>Feature-Einfluss erklärbar machen</li>
                  <li>Audit-fähig sein</li>
                </ul>
              </Card>
              <Card className="intern-playbook-card">
                <h2>8. Logging & Audit (kein Optional)</h2>
                <ul>
                  <li>Input-Schema (anonymisiert)</li>
                  <li>Modell-Version</li>
                  <li>Output-Score</li>
                  <li>Timestamp</li>
                  <li>Mandant</li>
                </ul>
                <p className="intern-emphasis">➡️ Ohne Logs kein Go-Live.</p>
              </Card>
            </div>

            <div className="intern-playbook-grid">
              <Card className="intern-playbook-card">
                <h2>9. Security & Mandantentrennung</h2>
                <ul>
                  <li>strikte Tenant-Isolation</li>
                  <li>getrennte Feature Stores</li>
                  <li>getrennte Model Registries</li>
                  <li>kein Cross-Tenant-Training</li>
                </ul>
              </Card>
              <Card className="intern-playbook-card">
                <h2>10. Deployment-Regeln</h2>
                <ul>
                  <li>IaaS only</li>
                  <li>keine SaaS-KI</li>
                  <li>kein externes Modell-Hosting</li>
                  <li>CI/CD mit Model Approval Step</li>
                </ul>
              </Card>
            </div>

            <Card className="intern-playbook-card">
              <h2>11. Definition of Done (für jedes KI-Feature)</h2>
              <ul>
                <li>Daten Allowlist eingehalten</li>
                <li>kein autonomer Entscheid</li>
                <li>Explainability vorhanden</li>
                <li>Audit-Logs aktiv</li>
                <li>Security Review bestanden</li>
              </ul>
            </Card>

            <Card className="intern-playbook-card intern-golden-rule">
              <h2>12. Goldene Entwickler-Regel</h2>
              <p>
                Wenn ihr euch fragt, ob etwas erlaubt ist – dann ist es das vermutlich nicht.
                <br />
                Erst klären, dann bauen.
              </p>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
