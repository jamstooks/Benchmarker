import React from "react";

import DialogContent from "@material-ui/core/DialogContent";
import SelectEntities from "./SelectEntities";
import SelectData from "./SelectData";
import ViewData from "./ViewData";
import FabDialog from "../components/FabDialog";

import "../app.css";

const Benchmarker = () => (
  <div>
    <ViewData />
    <div className="fab-left-top">
      <FabDialog fabIcon="school" direction="right" transitionDuration={700}>
        <DialogContent>
          <SelectEntities />
        </DialogContent>
      </FabDialog>
    </div>
    <div className="fab-bottom-right">
      <FabDialog
        fabIcon="filter_list"
        direction="up"
        color="secondary"
        transitionDuration={700}
      >
        <DialogContent>
          <SelectData />
        </DialogContent>
      </FabDialog>
    </div>
  </div>
);

export default Benchmarker;
