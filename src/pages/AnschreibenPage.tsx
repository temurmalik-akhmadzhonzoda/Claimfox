import React from 'react'
import Header from '@/components/ui/Header'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import CvAuthGate from '@/components/CvAuthGate'
import profileImage from '@/assets/images/profilbild.png'

export default function AnschreibenPage() {
  return (
    <CvAuthGate>
      <section className="page cv-page">
        <div className="cv-shell">
          <div className="cv-header">
            <Header title="Anschreiben – Ralf Mitterbauer" subtitle="" subtitleColor="#65748b" />
            <Button className="cv-download" onClick={() => window.print()}>
              PDF herunterladen
            </Button>
          </div>

          <div className="cv-hero">
            <div className="cv-hero-left">
              <h2>Statement of Interest – Head of Product</h2>
              <p>Bad Salzdetfuth (Region Hannover), Deutschland</p>
              <p>Telefon: +49 (0)151 22644067</p>
              <p>E-Mail: ralf.mitterbauer@t-online.de</p>
              <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
            </div>
            <Card className="cv-profile-card">
              <img className="cv-profile-image" src={profileImage} alt="Ralf Mitterbauer" />
              <div>
                <strong>Anschreiben – Ralf Mitterbauer</strong>
              </div>
            </Card>
          </div>

          <Card className="cv-card cv-letter">
            <h3>Anschreiben – Ralf Mitterbauer</h3>
            <div className="cv-letter-space cv-letter-space-2" />
            <p>Bad Salzdetfuth (Region Hannover), Deutschland</p>
            <p>Telefon: +49 (0)151 22644067</p>
            <p>E-Mail: ralf.mitterbauer@t-online.de</p>
            <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
            <div className="cv-letter-space cv-letter-space-3" />
            <h3 className="cv-letter-heading">Statement of Interest – Head of Product</h3>
            <div className="cv-letter-space cv-letter-space-2" />
            <p>Sehr geehrte Damen und Herren,</p>
            <p>
              die Position Head of Product bei der Insurgo GmbH spricht mich sehr an, da sie die Verantwortung für Produktstrategie,
              operative Umsetzung und tiefes Versicherungsverständnis in einer Weise verbindet, die meiner bisherigen Laufbahn entspricht.
            </p>
            <p>
              In meiner aktuellen Rolle verantworte ich die strategische und operative Weiterentwicklung einer zentralen
              Versicherungsplattform. Ich steuere Produktstrategie und Roadmap, übersetze komplexe fachliche Anforderungen in belastbare
              technische Produktkonzepte und arbeite eng mit Entwicklung, Business, Kunden und Partnern zusammen. Dabei lege ich
              besonderen Wert auf Struktur, Nachvollziehbarkeit und eine verlässliche Umsetzung.
            </p>
            <p>
              Meine mehr als 25-jährige Führungs- und Managementerfahrung im Versicherungsumfeld ermöglicht mir einen ganzheitlichen Blick
              auf die gesamte versicherungsseitige Wertschöpfung – von Underwriting, Vertrieb und Brokeranbindung über Policierung und
              Bestandsführung bis hin zu Schadenprozessen, Abrechnung, Qualitätssicherung sowie digitalen Kern- und Plattformlösungen.
              Ergänzt wird dies durch ein tiefes technisches Verständnis und umfangreiche Erfahrung in der erfolgreichen Umsetzung
              komplexer Software- und Plattformprojekte, auch in startup-nahen Strukturen.
            </p>
            <p>
              Neben der fachlichen Motivation ist mir auch der persönliche Rahmen wichtig. Ich bin 55 Jahre alt, Vater von zwei Kindern und
              seit vielen Jahren beruflich wie privat klar verankert. Mein Lebensmittelpunkt ist Bad Salzdetfuth bei Hannover, wo ich auch
              Eigentum besitze.
            </p>
            <p>
              Für die Rolle bei Insurgo ist mir eine ausgewogene Balance zwischen Remote-Arbeit und erforderlichen Präsenzzeiten vor Ort
              wichtig. Gerade in der Anfangsphase halte ich eine erhöhte Präsenz in Berlin für notwendig, um Strukturen aufzubauen,
              Abstimmungen zu festigen und die Zusammenarbeit im Team wirksam zu gestalten. Dass meine Tochter als Leistungssportlerin im
              Wasserball im Sportinternat in Berlin lebt, erleichtert mir diese arbeitsbedingt notwendigen Präsenzzeiten und unterstützt
              eine verlässliche Wahrnehmung meiner Aufgaben.
            </p>
            <p>
              Gerne würde ich meine Erfahrung, meine Haltung und meine Arbeitsweise bei Insurgo einbringen und die Weiterentwicklung Ihrer
              Produkte verantwortungsvoll und nachhaltig mitgestalten. Über ein persönliches Gespräch freue ich mich sehr.
            </p>
            <p>Mit freundlichen Grüßen</p>
            <p>Ralf Mitterbauer</p>
          </Card>
        </div>

        <div className="cv-print">
          <div className="cv-print-header">
            <div>
              <h1>Anschreiben – Ralf Mitterbauer</h1>
              <h2>Statement of Interest – Head of Product</h2>
            </div>
            <div className="cv-print-photo">
              <img src={profileImage} alt="Ralf Mitterbauer" />
            </div>
          </div>
          <div className="cv-print-contact">
            <p>Bad Salzdetfuth (Region Hannover), Deutschland</p>
            <p>Telefon: +49 (0)151 22644067</p>
            <p>E-Mail: ralf.mitterbauer@t-online.de</p>
            <p>LinkedIn: www.linkedin.com/in/ralf-mitterbauer-6a9a319/</p>
          </div>

          <h3>Statement of Interest – Head of Product</h3>
          <p>Sehr geehrte Damen und Herren,</p>
          <p>
            die Position Head of Product bei der Insurgo GmbH spricht mich sehr an, da sie die Verantwortung für Produktstrategie,
            operative Umsetzung und tiefes Versicherungsverständnis in einer Weise verbindet, die meiner bisherigen Laufbahn entspricht.
          </p>
          <p>
            In meiner aktuellen Rolle verantworte ich die strategische und operative Weiterentwicklung einer zentralen
            Versicherungsplattform. Ich steuere Produktstrategie und Roadmap, übersetze komplexe fachliche Anforderungen in belastbare
            technische Produktkonzepte und arbeite eng mit Entwicklung, Business, Kunden und Partnern zusammen. Dabei lege ich
            besonderen Wert auf Struktur, Nachvollziehbarkeit und eine verlässliche Umsetzung.
          </p>
          <p>
            Meine mehr als 25-jährige Führungs- und Managementerfahrung im Versicherungsumfeld ermöglicht mir einen ganzheitlichen Blick
            auf die gesamte versicherungsseitige Wertschöpfung – von Underwriting, Vertrieb und Brokeranbindung über Policierung und
            Bestandsführung bis hin zu Schadenprozessen, Abrechnung, Qualitätssicherung sowie digitalen Kern- und Plattformlösungen.
            Ergänzt wird dies durch ein tiefes technisches Verständnis und umfangreiche Erfahrung in der erfolgreichen Umsetzung
            komplexer Software- und Plattformprojekte, auch in startup-nahen Strukturen.
          </p>
          <p>
            Neben der fachlichen Motivation ist mir auch der persönliche Rahmen wichtig. Ich bin 55 Jahre alt, Vater von zwei Kindern und
            seit vielen Jahren beruflich wie privat klar verankert. Mein Lebensmittelpunkt ist Bad Salzdetfuth bei Hannover, wo ich auch
            Eigentum besitze.
          </p>
          <p>
            Für die Rolle bei Insurgo ist mir eine ausgewogene Balance zwischen Remote-Arbeit und erforderlichen Präsenzzeiten vor Ort
            wichtig. Gerade in der Anfangsphase halte ich eine erhöhte Präsenz in Berlin für notwendig, um Strukturen aufzubauen,
            Abstimmungen zu festigen und die Zusammenarbeit im Team wirksam zu gestalten. Dass meine Tochter als Leistungssportlerin im
            Wasserball im Sportinternat in Berlin lebt, erleichtert mir diese arbeitsbedingt notwendigen Präsenzzeiten und unterstützt
            eine verlässliche Wahrnehmung meiner Aufgaben.
          </p>
          <p>
            Gerne würde ich meine Erfahrung, meine Haltung und meine Arbeitsweise bei Insurgo einbringen und die Weiterentwicklung Ihrer
            Produkte verantwortungsvoll und nachhaltig mitgestalten. Über ein persönliches Gespräch freue ich mich sehr.
          </p>
          <p>Mit freundlichen Grüßen</p>
          <p>Ralf Mitterbauer</p>
        </div>
      </section>
    </CvAuthGate>
  )
}
