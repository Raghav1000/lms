import { ConfigProvider } from "antd";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const AntdConfigProvider = ({ children }: Props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedColor: "black",
            borderRadius: 3,
          },
        },
        token: {
          colorPrimary: "ffb700",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdConfigProvider;
