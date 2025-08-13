import React from "react";
import { useEffect } from "react";

const Datenschutz = () => {

  useEffect(() => {
        window.scrollTo(0, 0);
      }, []);


  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Datenschutzerklärung</h1>

      <div className="space-y-6 text-base leading-relaxed">
        <div>
          <p>
            Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir
            verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen
            Bestimmungen (DSGVO, TMG).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">1. Kontakt mit uns</h2>
          <p>
            Wenn Sie per Formular auf der Website oder per E-Mail Kontakt mit uns
            aufnehmen, werden Ihre angegebenen Daten zwecks Bearbeitung der Anfrage
            und für den Fall von Anschlussfragen sechs Monate bei uns gespeichert.
            Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Speicherung von Zugriffsdaten</h2>
          <p>
            Bei jedem Zugriff auf unsere Website werden automatisch Informationen
            allgemeiner Natur erfasst (z. B. IP-Adresse, verwendeter Browser, Uhrzeit).
            Diese Daten lassen keine Rückschlüsse auf Ihre Person zu und dienen der
            Sicherstellung eines störungsfreien Betriebs.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Cookies</h2>
          <p>
            Unsere Website verwendet Cookies, um bestimmte Funktionen zu ermöglichen
            und die Benutzerfreundlichkeit zu verbessern. Sie können Ihren Browser so
            einstellen, dass Sie über das Setzen von Cookies informiert werden oder dies
            komplett unterbinden.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Ihre Rechte</h2>
          <p>
            Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung,
            Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu.
            Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das
            Datenschutzrecht verstößt, können Sie sich bei der zuständigen
            Aufsichtsbehörde beschweren.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Kontakt zum Datenschutz</h2>
          <p>
            Bei Fragen zur Verarbeitung Ihrer personenbezogenen Daten wenden Sie sich bitte an:
          </p>
          <p>
            Georg Mustermann<br />
            Diamant Glanz Krefeld<br />
            Musterstraße 1<br />
            47800 Krefeld<br />
            E-Mail: info@diamantkristall.de
          </p>
        </div>
      </div>
    </div>
  );
};

export default Datenschutz;
