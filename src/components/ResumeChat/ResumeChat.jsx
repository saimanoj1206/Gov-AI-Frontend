import "./ResumeChat.css";
import { useDispatch } from "react-redux";
import { setResumeChat } from "../../store/slices/historySlice";

const ResumeChat = ({ docView }) => {
  const dispatch = useDispatch();

  const handleResumeChatClick = () => {
    dispatch(setResumeChat(false));
  };

  return (
    <div
      style={{ marginLeft: docView ? "5%" : "9%" }}
      className="resume-container-wrapper"
      onClick={handleResumeChatClick}
    >
      <div className="resume-container resume-chat">
        <span className="resume-text">Resume Conversation</span>
      </div>
    </div>
  );
};

export default ResumeChat;
