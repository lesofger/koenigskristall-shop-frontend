import React from "react";
import handLogo from "@/assets/überMichLogoHand.png";
import downArrow from "@/assets/downArrow.png";

const About = () => {
  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-b from-white to-blue-50 py-12 px-4">
      <div className="max-w-2xl w-full bg-white/80 rounded-3xl shadow-xl p-8 md:p-12 flex flex-col items-center text-center border border-gray-100">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Schön, dass Du hier bist!</h3>
        <img
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-contain shadow mb-6 border border-gray-200 bg-white"
          src={handLogo}
          alt="Maja"
        />
        <p className="text-lg md:text-xl font-medium mb-4 text-gray-700">
          Hier möchte ich dir kurz etwas über mich und meine Liebe zu Kristallen erzählen.
        </p>
        <img
          className="w-8 h-8 mb-4 animate-bounce"
          src={downArrow}
          alt="arrow"
        />
        <p className="text-base md:text-lg mb-4 text-gray-700 items-start">
          <strong>Ich bin Maja</strong> und habe vor einiger Zeit mein Herzensprojekt Koenigskristall zum Leben erweckt.<br />
          Mit unglaublich viel Liebe und Leidenschaft habe ich meinen eigenen Shop eröffnet.<br />
          Ich möchte Euch mitnehmen auf eine wundervolle Reise in die Spiritualität und Magie.<br />
          Schon seit langer Zeit beschäftige ich mich mit der Kraft der Kristalle und möchte mein Wissen gerne mit euch teilen.<br />
          Ich möchte euch zeigen, wie sich euer Leben zum positiven verändert wird, sobald ihr die richtigen Kristalle in eurem Leben habt.<br />
          Der erste Schritt in die richtige Richtung ist bereits getan, denn Du bist hier auf meiner Seite gelandet.<br />
          Schau dich gerne um und lass dich von deiner Intuition leiten.
        </p>
        <p className="text-lg font-semibold text-blue-700 mt-6">Dein Kristall wartet bereits auf dich!</p>
      </div>
    </div>
  );
};

export default About;
