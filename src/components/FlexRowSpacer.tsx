export const FlexRowSpacer = ({ auto }: { auto?: boolean }) => (
  <div className={auto ? "flex-auto" : "w-4"} />
);
