import React from "react";

const Impressum = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Impressum</h1>

      <div className="space-y-6 text-base leading-relaxed">
        <div>
          <p className="font-semibold">Angaben gemäß § 5 TMG</p>
          <p>
            Georg Mustermann<br />
            Diamant Glanz Krefeld<br />
            Musterstraße 1<br />
            47800 Krefeld<br />
            Deutschland
          </p>
        </div>

        <div>
          <p className="font-semibold">Kontakt</p>
          <p>
            Telefon: 01234 / 567890<br />
            E-Mail: info@diamantkristall.de
          </p>
        </div>

        <div>
          <p className="font-semibold">Umsatzsteuer-ID</p>
          <p>
            DE123456789<br />
            (gemäß § 27 a Umsatzsteuergesetz)
          </p>
        </div>

        <div>
          <p className="font-semibold">
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
          </p>
          <p>
            Georg Mustermann<br />
            Anschrift wie oben
          </p>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
