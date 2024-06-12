import React, { useEffect, useState } from "react";
import { CometChatIncomingCall } from "@cometchat/chat-uikit-react";
import { CometChat } from "@cometchat/chat-sdk-javascript";

const IncomingCallHandler = () => {
  const [call, setCall] = useState(null);

  useEffect(() => {
    const listenerID = new Date().toISOString();

    CometChat.addCallListener(
      listenerID,
      new CometChat.CallListener({
        onIncomingCallReceived: (call) => {
          // Handle incoming call
          console.log("Incoming call:", call);
          // Display the incoming call component
          setCall(call);
        },
        onIncomingCallCancelled: (call) => {
          // Handle incoming call cancelled
          console.log("Incoming call cancelled:", call);
          setCall(null);
        },
      })
    );

    return () => {
      CometChat.removeCallListener(listenerID);
    };
  }, []);
  if (call) {
    return <CometChatIncomingCall call={call} />;
  }
  return null;
};

export default IncomingCallHandler;
