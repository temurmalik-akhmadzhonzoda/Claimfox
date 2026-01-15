import React from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'

export default function SetupPage() {
  return (
    <section className="page setup-page">
      <div className="setup-shell">
        <Header
          title="Setup"
          subtitle="Zielarchitektur für Insurfox (IaaS, multi-stakeholder, account-basiert)"
          subtitleColor="#65748b"
        />

        <div className="setup-grid">
          <Card className="setup-card">
            <h3>Kernprinzipien</h3>
            <ul>
              <li>Platform Core ≠ CMS: Prozesslogik gehört in dedizierte Services, nicht ins CMS.</li>
              <li>Event-driven: Status, Dokumente, Freigaben, Claims und Policen laufen asynchron.</li>
              <li>Multi-Tenant: Mandanten, Rollen und Datenräume mit Tenant Isolation.</li>
              <li>PII strikt getrennt: Marketing/CRM bekommt nur das Nötigste.</li>
            </ul>
          </Card>

          <Card className="setup-card">
            <h3>Schichtenmodell</h3>
            <ul>
              <li>Experience Layer: Customer, Company, Partner und Admin Portale (Next.js/Nuxt).</li>
              <li>Identity &amp; Access: IdP (Keycloak/Auth0/Azure AD B2C), RBAC + ABAC, MFA.</li>
              <li>Platform Core: Tenant, User, Policy, Quote, Workflow, Claims, Documents, Integration.</li>
              <li>Data Layer: PostgreSQL, S3 (EU), Redis, Search, Event Bus.</li>
              <li>CMS Layer: Strapi/Directus für Content, strikt entkoppelt vom Core.</li>
            </ul>
          </Card>

          <Card className="setup-card">
            <h3>Identity &amp; Access (IAM)</h3>
            <ul>
              <li>Identity Provider: Keycloak (EU Self-hosted) oder Auth0/Azure AD B2C.</li>
              <li>SSO/OIDC für Partner optional.</li>
              <li>RBAC Rollen + ABAC Regeln (Tenant, Policy, Region, Shipment).</li>
              <li>MFA für Partner/Ops, optional für Endkunden.</li>
              <li>HubSpot nicht als Login/IAM nutzen.</li>
            </ul>
          </Card>

          <Card className="setup-card">
            <h3>Platform Core (Domain Services)</h3>
            <ul>
              <li>Tenant Service: Unternehmen + Mandanteneinstellungen.</li>
              <li>User/Profile Service: Personen- &amp; Unternehmensdaten, KYC optional.</li>
              <li>Insurance Product &amp; Policy: Produkte, Deckung, Policen, Prämien.</li>
              <li>Quote/Offer + Workflow: Angebotsflow, Underwriting, Policy, Renewal.</li>
              <li>Claims + Documents + Audit + Notifications + Integrations.</li>
            </ul>
          </Card>

          <Card className="setup-card">
            <h3>Data Layer</h3>
            <ul>
              <li>PostgreSQL für relationale Prozesse.</li>
              <li>S3 Object Storage (EU) für Dokumente.</li>
              <li>Redis für Sessions, Rate-Limits, Caching.</li>
              <li>Search via Meilisearch/OpenSearch.</li>
              <li>Event Bus: Kafka, RabbitMQ oder NATS.</li>
            </ul>
          </Card>

          <Card className="setup-card">
            <h3>CMS / Content</h3>
            <ul>
              <li>Strapi oder Directus für Blog, FAQ, Help Center.</li>
              <li>Kein PII im CMS.</li>
              <li>Entkoppelt vom Platform Core.</li>
            </ul>
          </Card>

          <Card className="setup-card">
            <h3>HubSpot Rolle</h3>
            <ul>
              <li>CRM/Marketing, nicht Source of Truth.</li>
              <li>Nur minimale Daten: Lead, Company, Deal Status.</li>
              <li>Keine Policendetails, Claims, Dokumente oder Risk-Daten.</li>
              <li>Integration: Platform Events → CRM Sync Service → HubSpot API.</li>
            </ul>
          </Card>

          <Card className="setup-card">
            <h3>Datenmodell &amp; Stakeholder</h3>
            <ul>
              <li>Tenant = Organisation (Spedition, Versicherer, Broker).</li>
              <li>User ↔ Tenant Membership mit Rollen und Rechten.</li>
              <li>Policy/Quote/Claim mit owner + counterparty und Access Policy.</li>
              <li>Data Rooms für gezieltes Sharing von Dokumenten.</li>
            </ul>
          </Card>

          <Card className="setup-card">
            <h3>Registrierungs- &amp; Account-Flow</h3>
            <ul>
              <li>Email-Verifikation, Tenant anlegen oder Invite.</li>
              <li>Consent für Terms/Privacy, Marketing optional.</li>
              <li>PII im Profile Service, Company im Tenant Service.</li>
              <li>HubSpot nur CRM-relevante Felder.</li>
            </ul>
          </Card>

          <Card className="setup-card">
            <h3>Prozessflüsse (End-to-End)</h3>
            <ul>
              <li>Quote → Underwriting → Offer → Policy mit Workflow-Orchestrierung.</li>
              <li>Claims: Meldung, Dokumente, Tasks, Status-Events.</li>
              <li>Events triggern Notifications und CRM Sync.</li>
            </ul>
          </Card>

          <Card className="setup-card">
            <h3>Security, Compliance, Audit</h3>
            <ul>
              <li>Row-Level Security, Tenant Isolation, Least Privilege.</li>
              <li>Audit Logs für Zugriff, Änderungen, Dokumente.</li>
              <li>Encryption at-rest + in-transit, KMS optional.</li>
              <li>Retention &amp; Deletion gemäß Aufbewahrung.</li>
              <li>WAF, Rate Limiting, MFA für Ops/Partner.</li>
            </ul>
          </Card>

          <Card className="setup-card">
            <h3>Tech-Empfehlung (pragmatisch)</h3>
            <ul>
              <li>Next.js Portale mit shared UI.</li>
              <li>NestJS Modular Monolith → später Services.</li>
              <li>Postgres + Redis, NATS/RabbitMQ.</li>
              <li>S3 EU + CDN, Strapi, Sentry + OpenTelemetry.</li>
            </ul>
          </Card>

          <Card className="setup-card">
            <h3>Minimaler MVP</h3>
            <ul>
              <li>Registrierung/Login + Rollen.</li>
              <li>Tenant/Company + Invites.</li>
              <li>Quote Request Flow + Status.</li>
              <li>Dokument Upload + Freigaben.</li>
              <li>HubSpot Sync + Audit Logs.</li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}
