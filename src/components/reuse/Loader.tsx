import { Flex, Spin } from "antd";

const contentStyle: React.CSSProperties = {
  padding: 50,
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const Loader = () => {
  return (
    <div>
      <Flex gap="middle" vertical>
        <Flex gap="middle">
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        </Flex>
      </Flex>
    </div>
  );
};

export default Loader;
