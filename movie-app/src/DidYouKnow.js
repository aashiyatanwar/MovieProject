import React from "react";
import MainTrivia from "./MainTrivia";
import MainCrazyEdits from "./MainCrazyCredits";
import { Card } from "@material-ui/core";

const DidYouKnow = () => {
  return (
    <Card>
      <section className="section-title">
        <h3 style={{color:"black"}}>Did You Know!?</h3>
        <div className="underline"></div>
      </section>
      <div>
        <MainTrivia />
        <MainCrazyEdits />
      </div>
    </Card>
  );
};

export default DidYouKnow;
