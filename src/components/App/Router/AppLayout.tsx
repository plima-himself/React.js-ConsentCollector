import { Outlet } from "react-router-dom";
import * as S from "./styles";

const AppLayout: React.FC = () => {
  return (
    <S.Root>
      <Outlet />
    </S.Root>
  );
};

export default AppLayout;
