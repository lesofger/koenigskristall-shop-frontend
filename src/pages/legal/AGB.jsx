import React from "react";
import { useEffect } from "react";

const AGB = () => {

  useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
    <main className="prose mx-auto max-w-3xl py-10">
      <h1 className="text-2xl font-bold">Datenschutzerklärung</h1>
        <div className="mt--6 mb-6">
        <hr />
      </div>
      <h2 className="text-xl font-semibold">1. Verantwortlicher</h2>
      <address>
        <div>Maja Charlotte Bremer</div>
        <div>KOENIGSKRISTALL</div>
        <div>Lessingstraße 20</div>
        <div>39108 Magdeburg</div>
        <div>
          E-Mail:{" "}
          <a href="mailto:shop@koenigskristall.de">
            shop@koenigskristall.de
          </a>
        </div>
      </address>
      <div className="mt--6 mb-6">
        <hr />
      </div>

      <h2 className="text-xl font-semibold">2. Allgemeine Hinweise zur Datenverarbeitung</h2>
      <p>
        Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Ihre Daten
        werden ausschließlich auf Grundlage der gesetzlichen Bestimmungen
        (DSGVO, BDSG, TTDSG) verarbeitet. Nachfolgend informieren wir Sie über
        Art, Umfang und Zweck der Verarbeitung in unserem Online-Shop.
      </p>
      <div className="mt--6 mb-6">
        <hr />
      </div>

      <h2 className="text-xl font-semibold">3. Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck der Verwendung</h2>

      <h3>a) Beim Besuch der Website</h3>
      <p>
        Beim Aufrufen unserer Website werden automatisch durch den Browser Ihres
        Endgeräts Informationen an unseren Server gesendet und temporär in
        sogenannten Logfiles gespeichert:
      </p>
      <ul>
        <li>IP-Adresse des anfragenden Rechners</li>
        <li>Datum und Uhrzeit des Zugriffs</li>
        <li>Name und URL der abgerufenen Datei</li>
        <li>Referrer-URL</li>
        <li>verwendeter Browser, ggf. Betriebssystem</li>
      </ul>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
        an der technischen Bereitstellung, Stabilität und Sicherheit).
      </p>

      <h3>b) Bei Bestellungen im Online-Shop</h3>
      <p>
        Zur Abwicklung Ihrer Bestellung verarbeiten wir die für Vertragsschluss
        und -erfüllung erforderlichen Daten:
      </p>
      <ul>
        <li>Vor- und Nachname</li>
        <li>Rechnungs- und Lieferadresse</li>
        <li>E-Mail-Adresse</li>
        <li>Zahlungsdaten (abhängig von der gewählten Zahlungsmethode)</li>
      </ul>
      <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).</p>

      <h3>c) Kontaktaufnahme</h3>
      <p>
        Bei Kontaktaufnahme per E-Mail verarbeiten wir Ihre Angaben zur
        Bearbeitung der Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
        (berechtigtes Interesse), ggf. Art. 6 Abs. 1 lit. b DSGVO bei
        vorvertraglichen Anfragen.
      </p>
      <div className="mt--6 mb-6">
        <hr />
      </div>

      <h2 className="text-xl font-semibold">4. Weitergabe von Daten</h2>
      <p>Eine Übermittlung Ihrer Daten erfolgt nur an folgende Kategorien von Empfängern:</p>
      <ul>
        <li>Zahlungsdienstleister (z. B. PayPal, Stripe) zur Zahlungsabwicklung</li>
        <li>Versanddienstleister (z. B. DHL) zur Zustellung Ihrer Bestellung</li>
        <li>ggf. Steuerberater im Rahmen gesetzlicher Pflichten</li>
      </ul>
      <p>
        Eine darüber hinausgehende Weitergabe erfolgt nicht, es sei denn, wir
        sind gesetzlich dazu verpflichtet oder Sie haben eingewilligt.
      </p>
      <div className="mt--6 mb-6">
        <hr />
      </div>

      <h2 className="text-xl font-semibold">5. Zahlungsdienstleister</h2>
      <p>
        Bei Auswahl der jeweiligen Zahlungsmethode werden Zahlungsdaten direkt
        an den Anbieter übermittelt. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.
      </p>
      <ul>
        <li>
          PayPal:{" "}
          <a
            href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full"
            target="_blank"
            rel="noreferrer"
          >
            Datenschutzhinweise von PayPal
          </a>
        </li>
        <li>
          Stripe:{" "}
          <a
            href="https://stripe.com/de/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Datenschutzhinweise von Stripe
          </a>
        </li>
      </ul>
      <div className="mt--6 mb-6">
        <hr />
      </div>

      <h2 className="text-xl font-semibold">6. Cookies &amp; Tracking</h2>
      <p>
        Wir verwenden Cookies, die für den Betrieb der Website technisch
        erforderlich sind (Art. 6 Abs. 1 lit. f DSGVO). Soweit wir optionale
        Cookies/Tools (z. B. zu Statistik- oder Marketingzwecken) einsetzen,
        holen wir vorab Ihre Einwilligung ein (Art. 6 Abs. 1 lit. a DSGVO i. V. m.
        § 25 Abs. 1 TTDSG). Sie können Ihre Einwilligung jederzeit über die
        Cookie-Einstellungen widerrufen.
      </p>
      <div className="mt--6 mb-6">
        <hr />
      </div>

      <h2 className="text-xl font-semibold">7. Speicherdauer</h2>
      <p>
        Wir speichern personenbezogene Daten nur so lange, wie es für die
        genannten Zwecke erforderlich ist oder gesetzliche
        Aufbewahrungspflichten bestehen (insb. handels- und steuerrechtlich).
      </p>
      <div className="mt--6 mb-6">
        <hr />
      </div>

      <h2 className="text-xl font-semibold">8. Ihre Rechte</h2>
      <ul>
        <li>Auskunft (Art. 15 DSGVO)</li>
        <li>Berichtigung (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch (Art. 21 DSGVO)</li>
        <li>Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
      </ul>
      <p>
        Zur Ausübung Ihrer Rechte genügt eine E-Mail an{" "}
        <a href="mailto:shop@koenigskristall.de">shop@koenigskristall.de</a>.
      </p>
      <div className="mt--6 mb-6">
        <hr />
      </div>

      <h2 className="text-xl font-semibold">9. Beschwerderecht bei der Aufsichtsbehörde</h2>
      <p>
        Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu
        beschweren, insbesondere in dem Mitgliedstaat Ihres Aufenthaltsorts,
        Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes. Für
        unseren Unternehmenssitz zuständig ist:
      </p>
      <address>
        <div>Landesbeauftragte für den Datenschutz Sachsen-Anhalt</div>
        <div>Otto-von-Guericke-Straße 34a</div>
        <div>39104 Magdeburg</div>
        <div>
          E-Mail:{" "}
          <a href="mailto:poststelle@lfd.sachsen-anhalt.de">
            poststelle@lfd.sachsen-anhalt.de
          </a>
        </div>
      </address>
      <div className="mt--6 mb-6">
        <hr />
      </div>

      <h2 className="text-xl font-semibold">10. Sicherheit</h2>
      <p>
        Wir setzen geeignete technische und organisatorische Maßnahmen (TOM)
        ein, um Ihre Daten gegen Manipulation, Verlust, Zerstörung oder
        unbefugten Zugriff zu schützen.
      </p>
      <div className="mt--6 mb-6">
        <hr />
      </div>

      <p><em>Stand: 24. August 2025</em></p>

      <hr />

  
    </main>
  );

};

export default AGB;