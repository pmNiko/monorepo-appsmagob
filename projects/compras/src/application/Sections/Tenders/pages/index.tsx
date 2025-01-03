import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MunismaCard } from "@shared/ui";
import { TenderProvider } from "../context";
import { TenderCard } from "../components";

const TendersPage = () => {
  const [searchParams] = useSearchParams();
  const [id, setId] = useState<string | null>();

  useEffect(() => setId(searchParams.get("id")), []);

  return (
    <TenderProvider idQueryString={id}>
      <MunismaCard sm={10} md={10} lg={7} mt={5} mb={4} title="Licitaciones">
        <TenderCard />
      </MunismaCard>
    </TenderProvider>
  );
};

export default TendersPage;
