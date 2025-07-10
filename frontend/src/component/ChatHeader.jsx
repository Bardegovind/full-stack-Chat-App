import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStrore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUser } = useAuthStore();

  return (
    <div className="p-2 w-full px-4 py-2.5 border-b border-base-300 bg-base-100">
      <div className="flex items-center justify-between">
        {/* Left side: Avatar + Name */}
        <div className="flex items-center gap-3">
          <img
            src={selectedUser.profilePic || "/avatar.png"}
            alt={selectedUser.fullName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUser.includes(selectedUser._id) ? "online" : "offline"}
            </p>
          </div>
        </div>

        {/* Right side: X button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="text-base-content hover:text-error"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
