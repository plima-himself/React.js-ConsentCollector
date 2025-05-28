import { Link, useLocation } from "react-router-dom";
import * as S from "./styles";

import { NavigationTab } from "./types";
import { Tab, TabsProps } from "@mui/material";

type NavigationTabsProps = Pick<TabsProps, "orientation"> & {
  tabs: NavigationTab[];
  className?: string;
};

const NavigationTabs: React.FC<NavigationTabsProps> = ({
  tabs,
  orientation,
  className,
}) => {
  const location = useLocation();

  return (
    <S.Root
      aria-label="Navigations tab."
      role="navigation"
      value={tabs.findIndex((tab) => location.pathname.startsWith(tab.to))}
      {...{ orientation, className }}
    >
      {tabs.map((tabProps) => (
        <Tab
          key={tabProps.to}
          component={Link}
          {...tabProps}
          sx={{
            alignItems: orientation === "horizontal" ? "center" : "flex-end",
            color: "#bdbdbd",
            "&.Mui-selected": {
              color: "#fafafa",
            },
          }}
        />
      ))}
    </S.Root>
  );
};

export default NavigationTabs;
