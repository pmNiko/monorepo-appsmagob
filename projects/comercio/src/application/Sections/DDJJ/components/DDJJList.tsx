import { LoaderAsync } from "@shared/ui";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDDJJStore } from "../store";
import { DDJJCard } from "./DDJJCard";
import { DDJJDoesNotExists } from "./DDJJDoesNotExists";

/** Listado de declaraciones acorde al periodo seleccionado */
export const DDJJList = ({ isLoading }: { isLoading: boolean }) => {
  const declarations = useDDJJStore((state) => state.declarations);
  const year = useDDJJStore((state) => state.year);
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChangeAccordion = (panel: string) => (
    _event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const collapse = () => setExpanded(false);

  useEffect(() => setExpanded(false), [year]);

  if (declarations.length <= 0) {
    return <DDJJDoesNotExists year={year} />;
  }

  return (
    <LoaderAsync isLoading={isLoading}>
      <Box display="flex" justifyContent="center" my={4}>
        <Box width={"90%"}>
          {declarations?.map((ddjj, i) => (
            <DDJJCard
              key={ddjj.cuitcuil + i}
              ddjj={ddjj}
              expanded={expanded}
              collapse={collapse}
              changeAccordion={handleChangeAccordion}
            />
          ))}
        </Box>
      </Box>
    </LoaderAsync>
  );
};
