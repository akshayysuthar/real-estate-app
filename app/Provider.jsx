import Header from "@/components/Header";

const Provider = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="mt-28 mx-auto">{children}</div>
    </div>
  );
};

export default Provider;
