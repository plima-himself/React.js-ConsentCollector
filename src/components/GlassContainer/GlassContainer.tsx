import * as S from "./styles";

type GlassContainerProps = {
  className?: string;
  children: React.ReactNode;
};

const GlassContainer: React.FC<GlassContainerProps> = ({
  className,
  children,
}) => {
  return <S.Root className={className}>{children}</S.Root>;
};

export default GlassContainer;
