import { Button as AntButton } from "antd";

interface PHButtonProps {
  text: string;
}

const PHButton: React.FC<PHButtonProps> = ({ text }) => {
  return (
    <AntButton
      type="primary"
      htmlType="submit"
      block
      style={{
        marginTop: "20px",
        fontWeight: "bold",
        backgroundColor: "#1677ff",
        borderColor: "#1677ff",
        borderRadius: "5px",
      }}
    >
      {text}
    </AntButton>
  );
};

export default PHButton;
