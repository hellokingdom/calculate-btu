import {
  Cell,
  Checkbox,
  FormControl,
  Grid,
  HFlow,
  Radio,
  TextField,
} from "bold-ui";

import React, { useEffect, useState } from "react";
import { useFormState } from "react-use-form-state";

interface IProps {
  componentTitle: string;
  sampleList: string[];
}

const App = () => {
  const [formState, { text, radio, checkbox }] = useFormState();
  const [area, setArea] = useState(0);
  const [btu, setBTU] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(JSON.stringify(formState, null, 2));
  };

  useEffect(() => {
    const { width, height, length, factor, details } = formState.values;
    const btu = area * parseInt(factor.slice(2, 3));
    setArea(width * 3.281 * (length * 3.281) * (height * 3.281));
    if (details.length) {
      const sum = details.reduce(
        (total: any, amount: any) => parseFloat(total) * parseFloat(amount),
        btu
      );
      setBTU(Math.round(sum));
    } else {
      setBTU(Math.round(btu));
    }
  }, [formState.values, area]);

  return (
    <>
      <>
        <form onSubmit={handleSubmit}>
          <Grid wrap>
            <Cell xs={12}>
              <TextField
                {...text("width")}
                label="Width(m)"
                placeholder="Width(m)"
                error={formState.errors.width}
                required
              />
            </Cell>
            <Cell xs={12}>
              <TextField
                {...text("length")}
                label="Length(m)"
                error={formState.errors.length}
                placeholder="Length(m)"
                required
              />
            </Cell>
            <Cell xs={12}>
              <TextField
                {...text("height")}
                label="Height(m)"
                error={formState.errors.height}
                placeholder="Height(m)"
                required
              />
            </Cell>
            <Cell xs={12}>
              <FormControl
                label="Room type"
                error={formState.errors.factor}
                required
              >
                <HFlow>
                  <Radio {...radio("factor", "a-5")} label="Lounge" />
                  <Radio {...radio("factor", "b-4")} label="Bedroom" />
                  <Radio {...radio("factor", "c-5")} label="Dining Room" />
                  <Radio {...radio("factor", "d-3")} label="Kitchen" />
                  <Radio {...radio("factor", "e-3")} label="Hallway" />
                  <Radio {...radio("factor", "f-3")} label="Bathroom" />
                </HFlow>
              </FormControl>
            </Cell>
            <Cell xs={12}>
              <FormControl label="Details" error={formState.errors.factor}>
                <HFlow>
                  <Checkbox
                    {...checkbox("details", "0.9")}
                    label="Double Glazing"
                  />
                  <Checkbox
                    {...checkbox("details", "1.15")}
                    label="North Facing"
                  />
                  <Checkbox
                    {...checkbox("details", "1.2")}
                    label="French Windows"
                  />
                </HFlow>
              </FormControl>
            </Cell>
            <Cell xs={12}></Cell>
            <Cell xs={12}>
              <h4>
                Volume of your room: {Math.round(area)}
                <br />
                {Number.isInteger(btu) && <>Calcuated BTU: {btu}</>}
              </h4>
            </Cell>
          </Grid>
        </form>
      </>
    </>
  );
};

export default App;
