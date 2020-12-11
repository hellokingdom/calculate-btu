import { DireflowComponent } from "direflow-component";
import App from "./App";

export default DireflowComponent.create({
  component: App,
  configuration: {
    tagname: "calculate-btu",
    useShadow: true,
  },
  plugins: [
    {
      name: "material-ui",
    },
  ],
});
