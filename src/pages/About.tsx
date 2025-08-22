import AboutMe from "@/components/AboutMe";
import BottomFooter from "@/components/BottomFooter";
import { useEffect } from "react"
import React from "react";

const About = () => {
      useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div>
      <AboutMe />
      
      <BottomFooter />
      
    </div>
  );
};

export default About;