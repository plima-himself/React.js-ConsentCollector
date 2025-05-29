import { Typography } from "@mui/material";
import * as S from "./styles";

type GlassContainerProps = {
  title?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

const GlassContainer: React.FC<GlassContainerProps> = ({
  title,
  className,
  children,
}) => {
  return (
    <S.Root className={className}>
      {title && (
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
      )}

      {children}
    </S.Root>
  );
};

export default GlassContainer;
