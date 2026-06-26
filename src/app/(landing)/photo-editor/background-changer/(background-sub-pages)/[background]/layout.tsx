import React from "react";

const BackgroundChangerSubPagesLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className="flex flex-col">
      {children}
    </main>
  );
};

export default BackgroundChangerSubPagesLayout;
