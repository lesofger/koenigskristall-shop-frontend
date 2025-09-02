import { Calendar, MapPin, Clock } from "lucide-react";

const upcomingMarkets = [
    {
      name: "Gesundheitstag Ummendorf",
      date: "06. September 2025",
      time: "10:00 - 18:00 Uhr",
      location: "Wormsdorferstr. 6",
      plz: "39365 Ummendorf",
      description: "Alles rund um das Thema Gesundheit und Wohlbefinden."
    },
    {
      name: "Landeserntedankfest Magdeburg",
      date: "20. - 21. September 2025",
      time: "10:00 - 18:00 Uhr", 
      location: "Elbauenpark Magdeburg",
      plz:"im Ökodorf",
      description: "Erlebe das 29. Landeserntedankfest im malerischen Elbauenpark Magdeburg."
    },
     {
      name: "Kaiser-Otto-Fest Magdeburg",
      date: "02. - 05. Oktober 2025",
      time: "11:00 - 24:00 Uhr", 
      location: "Domviertel Magdeburg",
      plz:"",
      description: "Viertägige mittelalterliche Erlebniswelt mit historischen Märkten, authentischem Handwerk, Tanz und Musik lassen wir die Zeit des Mittelalters aufleben."
    },
  ];

  function MeetUps(){
    return (
        <>
         {/* Call to Action */}
              <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <div className="space-y-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-4">
                        <Calendar className="w-8 h-8" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-primary mb-6">
                          Triff mich Persönlich
                        </h3>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                          Hier findest du alle Termine, wo du mich und meine Kristalle persönlich antreffen kannst. 
                          Ich freue mich darauf, dich kennenzulernen!
                        </p>
                      </div>
                    </div>
                  </div>
        
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {upcomingMarkets.map((market, idx) => (
          <div
            key={idx}
            className="group bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl hover:bg-white/50 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="space-y-6">
              {/* Market Name */}
              <h4 className="text-xl font-bold text-primary group-hover:text-primary/90 transition-colors">
                {market.name}
              </h4>
              
              {/* Date & Time */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <Calendar className="w-5 h-5 text-primary/70" />
                  <span className="text-sm font-medium">{market.date}</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary/70" />
                  <span className="text-sm">{market.time}</span>
                </div>
                <div className="flex items-start space-x-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary/70 mt-0.5 mb-0.1" />
                  <span className="text-sm">{market.location}</span>
                </div>
                <div className="flex items-start space-x-3 text-muted-foreground ml-8 pt-0">
                  <span className="text-sm">{market.plz}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {market.description}
              </p>
            </div>
          </div>
        ))}
      </div>
        </div>
      </section>
      </>
    );
  }


  export default MeetUps; 