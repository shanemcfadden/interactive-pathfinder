export const FlexRowSpacer = ({ auto }: { auto?: boolean }) => {
  return <div className={auto ? "flex-auto" : "w-4"} />;
};
