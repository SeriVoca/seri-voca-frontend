export type ModalContainerProps = {
  children: React.ReactNode;
};

export const ModalContainer = ({ children }: ModalContainerProps) => {
  return <div className="rounded-md bg-white px-[1.5rem] py-[1.25rem]">{children}</div>;
};
