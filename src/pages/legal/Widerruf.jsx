import React from "react";

const Widerruf = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Widerrufsbelehrung</h1>

      <div className="space-y-6 text-base leading-relaxed">
        <div>
          <p>
            Verbraucher haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
            diesen Vertrag zu widerrufen.
          </p>
        </div>

        <div>
          <p className="font-semibold">Widerrufsfrist</p>
          <p>
            Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein
            von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in
            Besitz genommen haben bzw. hat.
          </p>
        </div>

        <div>
          <p className="font-semibold">Um Ihr Widerrufsrecht auszuüben, müssen Sie uns:</p>
          <p>
            Georg Mustermann<br />
            Diamant Glanz Krefeld<br />
            Musterstraße 1<br />
            47800 Krefeld<br />
            E-Mail: info@diamantkristall.de
          </p>
          <p>
            mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief
            oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
            Sie können dafür das unten stehende Muster-Widerrufsformular verwenden, das
            jedoch nicht vorgeschrieben ist.
          </p>
        </div>

        <div>
          <p className="font-semibold">Folgen des Widerrufs</p>
          <p>
            Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir
            von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme
            zusätzlicher Kosten, die sich daraus ergeben, dass Sie eine andere Art der
            Lieferung als die von uns angebotene günstigste Standardlieferung gewählt haben),
            unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen,
            an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
          </p>
          <p>
            Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der
            ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde
            ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser
            Rückzahlung Entgelte berechnet.
          </p>
          <p>
            Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten
            haben oder bis Sie den Nachweis erbracht haben, dass Sie die Waren
            zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt ist.
          </p>
        </div>

        <div>
          <p>
            Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen
            ab dem Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten,
            an uns zurückzusenden oder zu übergeben.
            Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von vierzehn Tagen
            absenden.
          </p>
          <p>
            Sie tragen die unmittelbaren Kosten der Rücksendung der Waren.
          </p>
        </div>

        <div>
          <p className="font-semibold">Muster-Widerrufsformular</p>
          <p>
            Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus
            und senden Sie es zurück an:
          </p>

          <p>
            Georg Mustermann<br />
            Diamant Glanz Krefeld<br />
            Musterstraße 1<br />
            47800 Krefeld<br />
            E-Mail: info@diamantkristall.de
          </p>

          <p>
            Hiermit widerrufe ich den von mir abgeschlossenen Vertrag über den Kauf der folgenden Waren:<br />
            – Bestellt am: ____________<br />
            – Erhalten am: ____________<br />
            – Name des Verbrauchers: ____________<br />
            – Anschrift des Verbrauchers: ____________<br />
            – Datum: ____________<br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Widerruf;
