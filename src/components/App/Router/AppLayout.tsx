import { Outlet } from "react-router-dom";
import * as S from "./styles";
import NavigationTabs from "components/NavigationTabs";
import { DEFAULT_APP_TABS } from "./constants";
import { MOBILE_BREAKPOINT_PX } from "config";
import { useMediaQuery } from "@mui/material";

const AppLayout: React.FC = () => {
  const isMobile = useMediaQuery(`(max-width:${MOBILE_BREAKPOINT_PX}px)`);

  return (
    <S.Root>
      <S.Container sx={{ flexDirection: isMobile ? "column" : "row" }}>
        <NavigationTabs
          tabs={DEFAULT_APP_TABS}
          orientation={isMobile ? "horizontal" : "vertical"}
        />

        <S.OutletContainer>
          <Outlet />
        </S.OutletContainer>
      </S.Container>
    </S.Root>
  );
};

export default AppLayout;
