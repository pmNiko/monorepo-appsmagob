import { LoaderAsync, MunismaCard, Selector } from "@shared/ui";
import { Box } from "@mui/material";
import { SalaryTable } from "../components";
import { useSalaries } from "../hooks";

const SalariesPage = () => {
  const handleSalaries = useSalaries();

  return (
    <MunismaCard
      sm={11}
      md={10}
      lg={10}
      mt={5}
      mb={4}
      title="Gasto sueldos del personal municipal"
    >
      <Box
        sx={{ textAlign: "center", justifyContent: "space-between" }}
        px={2}
        pb={4}
      >
        <Box>
          <Selector
            label="Periodos"
            options={handleSalaries.options}
            defaultValue
            disabled={handleSalaries.isLoading}
            width="20rem"
            setSelected={handleSalaries.selector}
            selected={handleSalaries.selected}
          />
        </Box>

        <Box minHeight={550} mt={3}>
          <LoaderAsync isLoading={handleSalaries.isLoading}>
            <SalaryTable {...handleSalaries.salaries} />
          </LoaderAsync>
        </Box>
      </Box>
    </MunismaCard>
  );
};

export default SalariesPage;
