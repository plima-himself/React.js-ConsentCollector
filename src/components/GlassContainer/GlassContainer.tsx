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
    <S.Root
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={className}
    >
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
