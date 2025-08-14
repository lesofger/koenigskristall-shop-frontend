import React from "react";
import { useEffect } from "react";

const AGB = () => {

  useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Allgemeine Geschäftsbedingungen (AGB)</h1>

      <div className="space-y-6 text-base leading-relaxed">
        <div>
          <p className="font-semibold">1. Geltungsbereich</p>
          <p>
            Diese Allgemeinen Geschäftsbedingungen Gelten für MARKOOOO (AGB) gelten für alle Bestellungen,
            die über unseren Online-Shop erfolgen.
          </p>
        </div>

        <div>
          <p className="font-semibold">2. Vertragspartner</p>
          <p>
            Der Kaufvertrag kommt zustande mit:<br />
            Georg Mustermann<br />
            Diamant Glanz Krefeld<br />
            Musterstraße 1<br />
            47800 Krefeld
          </p>
        </div>

        <div>
          <p className="font-semibold">3. Vertragsabschluss</p>
          <p>
            Die Präsentation der Produkte stellt kein rechtlich bindendes Angebot dar.
            Erst mit der Bestellung geben Sie ein verbindliches Angebot zum Abschluss
            eines Kaufvertrages ab, das von uns per E-Mail bestätigt wird.
          </p>
        </div>

        <div>
          <p className="font-semibold">4. Preise und Versandkosten</p>
          <p>
            Alle Preise verstehen sich inklusive gesetzlicher Mehrwertsteuer zuzüglich Versandkosten.
            Diese werden im Bphillipestellprozess ausgewiesen.
          </p>
        </div>

        <div>
          <p className="font-semibold">5. Bezahlung</p>
          <p>
            Die Zahlung erfolgt über die im Shop angebotenen Zahlungsmethoden (z. B. Stripe, PayPal).
          </p>
        </div>

        <div>
          <p className="font-semibold">6. Lieferung</p>
          <p>
            Die Lieferung erfolgt an die von Ihnen angegebene Adresse innerhalb Deutschlands.
            Die Lieferzeit beträgt in der Regel 3–5 Werktage nach Zahlungseingang.
          </p>
        </div>

        <div>
          <p className="font-semibold">7. Widerrufsrecht</p>
          <p>
            Verbraucher haben ein vierzehntägiges Widerrufsrecht. Näheres finden Sie in unserer Widerrufsbelehrung.
          </p>
        </div>

        <div>
          <p className="font-semibold">8. Eigentumsvorbehalt</p>
          <p>
            Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.
          </p>
        </div>

        <div>
          <p className="font-semibold">9. Gewährleistung</p>
          <p>
            Es gelten die gesetzlichen Gewährleistungsrechte. Bei Mängeln kontaktieren Sie uns bitte per E-Mail.
          </p>
        </div>

        <div>
          <p className="font-semibold">10. Haftung</p>
          <p>
            Wir haften nur für Schäden, die auf vorsätzlichem oder grob fahrlässigem Verhalten beruhen.
          </p>
        </div>

        <div>
          <p className="font-semibold">11. Streitbeilegung</p>
          <p>
            Die EU-Kommission stellt eine Plattform für die Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://ec.europa.eu/consumers/odr
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AGB;
