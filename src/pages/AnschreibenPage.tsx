import React from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import CvAuthGate from '@/components/CvAuthGate'
import profileImage from '@/assets/images/rm.png'

export default function AnschreibenPage() {
  return (
    <CvAuthGate>
      <section className="page cv-page">
        <div className="cv-shell">
          <div className="cv-header">
            <Header title="Anschreiben" subtitle="Ralf Mitterbauer" subtitleColor="#65748b" />
            <Button className="cv-download" onClick={() => window.print()}>
              PDF herunterladen
            </Button>
          </div>

          <div className="cv-hero">
            <div className="cv-hero-left">
              <h2>IT Product Owner | Produktmanager Software &amp; Plattformen</h2>
              <p>Uhlandstraße 11 · 31162 Bad Salzdetfuth (Region Hannover)</p>
              <p>Telefon: +49 (0)151 22644067 · E-Mail: ralf.mitterbauer@t-online.de</p>
              <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
            </div>
            <Card className="cv-profile-card">
              <img className="cv-profile-image" src={profileImage} alt="Ralf Mitterbauer" />
              <div>
                <strong>Bewerbung</strong>
                <p>IT Product Owner (JobID: BUM02581) · Standort Hannover</p>
              </div>
            </Card>
          </div>

          <Card className="cv-card">
            <h3>Anschreiben</h3>
            <p>Bewerbung als IT Product Owner (JobID: BUM02581) – Standort Hannover</p>
            <p>Sehr geehrte Damen und Herren,</p>
            <p>
              die ausgeschriebene Position als IT Product Owner bei der TÜV NORD Mobilität GmbH &amp; Co. KG am Standort Hannover
              spricht mich sehr an, da sie meine langjährige Erfahrung in der agilen Weiterentwicklung unternehmenskritischer
              Softwareplattformen ideal mit meiner Affinität zu Mobilität, Technik und prozessgetriebenen Organisationen verbindet.
            </p>
            <p>
              In meiner aktuellen Funktion als IT Product Owner bei der Insurfox GmbH verantworte ich die modulare und skalierbare
              Weiterentwicklung einer IaaS-basierten Softwareplattform für einen zentralen Kernprozess. Mein Aufgabenbereich umfasst
              die Definition der Plattformstrategie und Roadmap, die Priorisierung des Product Backlogs sowie die Koordination von
              Entwicklerteams, internen Fachbereichen und externen Dienstleistern unter Berücksichtigung von Zeit, Qualität und Budget.
            </p>
            <p>
              Zuvor war ich über viele Jahre in produkt-, projekt- und prozessorientierten Rollen tätig – sowohl im internationalen
              Beratungsumfeld als auch in operativer Führungsverantwortung. Diese Kombination ermöglicht mir einen ganzheitlichen Blick
              auf IT-Lösungen, Geschäftsprozesse und deren nachhaltige Umsetzung. Besonders wichtig ist mir dabei die enge Zusammenarbeit
              in crossfunktionalen, agilen Teams sowie die kontinuierliche Weiterentwicklung von Plattformen im Einklang mit strategischen
              Unternehmenszielen.
            </p>
            <p>
              Die TÜV NORD GROUP steht für Qualität, Verantwortung und technische Exzellenz. Die Möglichkeit, die Weiterentwicklung
              zentraler Plattformen im Mobilitätsumfeld aktiv mitzugestalten, reizt mich sehr. Gern bringe ich meine Erfahrung, meine
              strukturierte Arbeitsweise und meine ausgeprägte Schnittstellenkompetenz am Standort Hannover ein.
            </p>
            <p>Über eine Einladung zu einem persönlichen Gespräch freue ich mich sehr.</p>
            <p>Mit freundlichen Grüßen</p>
            <p>Ralf Mitterbauer</p>
          </Card>
        </div>

        <div className="cv-print">
          <div className="cv-print-header">
            <div>
              <h1>Ralf Mitterbauer</h1>
              <h2>IT Product Owner | Produktmanager Software &amp; Plattformen</h2>
            </div>
            <div className="cv-print-photo">
              <img src={profileImage} alt="Ralf Mitterbauer" />
            </div>
          </div>
          <div className="cv-print-contact">
            <p>Uhlandstraße 11</p>
            <p>31162 Bad Salzdetfuth (Region Hannover)</p>
            <p>Telefon: +49 (0)151 22644067</p>
            <p>E-Mail: ralf.mitterbauer@t-online.de</p>
            <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
          </div>

          <h3>Anschreiben</h3>
          <p>Bewerbung als IT Product Owner (JobID: BUM02581) – Standort Hannover</p>
          <p>Sehr geehrte Damen und Herren,</p>
          <p>
            die ausgeschriebene Position als IT Product Owner bei der TÜV NORD Mobilität GmbH &amp; Co. KG am Standort Hannover
            spricht mich sehr an, da sie meine langjährige Erfahrung in der agilen Weiterentwicklung unternehmenskritischer
            Softwareplattformen ideal mit meiner Affinität zu Mobilität, Technik und prozessgetriebenen Organisationen verbindet.
          </p>
          <p>
            In meiner aktuellen Funktion als IT Product Owner bei der Insurfox GmbH verantworte ich die modulare und skalierbare
            Weiterentwicklung einer IaaS-basierten Softwareplattform für einen zentralen Kernprozess. Mein Aufgabenbereich umfasst
            die Definition der Plattformstrategie und Roadmap, die Priorisierung des Product Backlogs sowie die Koordination von
            Entwicklerteams, internen Fachbereichen und externen Dienstleistern unter Berücksichtigung von Zeit, Qualität und Budget.
          </p>
          <p>
            Zuvor war ich über viele Jahre in produkt-, projekt- und prozessorientierten Rollen tätig – sowohl im internationalen
            Beratungsumfeld als auch in operativer Führungsverantwortung. Diese Kombination ermöglicht mir einen ganzheitlichen Blick
            auf IT-Lösungen, Geschäftsprozesse und deren nachhaltige Umsetzung. Besonders wichtig ist mir dabei die enge Zusammenarbeit
            in crossfunktionalen, agilen Teams sowie die kontinuierliche Weiterentwicklung von Plattformen im Einklang mit strategischen
            Unternehmenszielen.
          </p>
          <p>
            Die TÜV NORD GROUP steht für Qualität, Verantwortung und technische Exzellenz. Die Möglichkeit, die Weiterentwicklung
            zentraler Plattformen im Mobilitätsumfeld aktiv mitzugestalten, reizt mich sehr. Gern bringe ich meine Erfahrung, meine
            strukturierte Arbeitsweise und meine ausgeprägte Schnittstellenkompetenz am Standort Hannover ein.
          </p>
          <p>Über eine Einladung zu einem persönlichen Gespräch freue ich mich sehr.</p>
          <p>Mit freundlichen Grüßen</p>
          <p>Ralf Mitterbauer</p>
        </div>
      </section>
    </CvAuthGate>
  )
}
