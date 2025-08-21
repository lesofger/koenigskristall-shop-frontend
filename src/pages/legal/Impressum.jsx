import React from "react";
import { useEffect } from "react";

const Impressum = () => {

  useEffect(() => {
        window.scrollTo(0, 0);
      }, []);


  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Impressum</h1>

      <div className="space-y-6 text-base leading-relaxed">
        <div>
          <p className="font-semibold">Angaben gemäß § 5 TMG</p>
          <p>
            Maja Charlotte Bremer<br />
            KOENIGSKRISTALL<br />
            Lessingstaße 20<br />
            39108 Magdeburg<br />
            Deutschland
          </p>
        </div>

        <div>
          <p className="font-semibold">Kontakt</p>
          <p>
            Telefon: 01739579951<br />
            E-Mail: shop@koenigskristall.de
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
            Maja Charlotte Bremer<br />
            Anschrift wie oben
          </p>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
