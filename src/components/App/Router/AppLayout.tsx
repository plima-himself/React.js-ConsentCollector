import { Outlet } from "react-router-dom";
import * as S from "./styles";
import NavigationTabs from "components/NavigationTabs";
import { DEFAULT_APP_TABS } from "./constants";
import { MOBILE_BREAKPOINT_PX } from "config";
import useScreenSize from "hooks/useScreenSize";

const AppLayout: React.FC = () => {
  const { width } = useScreenSize();

  return (
    <S.Root>
      <S.Container>
        <NavigationTabs
          tabs={DEFAULT_APP_TABS}
          orientation={
            width <= MOBILE_BREAKPOINT_PX ? "horizontal" : "vertical"
          }
        />

        <S.OutletContainer>
          <Outlet />
        </S.OutletContainer>
      </S.Container>
    </S.Root>
  );
};

export default AppLayout;
