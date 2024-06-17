import React, { useEffect, useState } from "react";
import { CometChatIncomingCall } from "@cometchat/chat-uikit-react";
import { CometChat, OngoingCallListener } from "@cometchat/chat-sdk-javascript";

const IncomingCallHandler = () => {
  const [call, setCall] = useState(null);
  const [listenerId, setListenerId] = useState("");

  useEffect(() => {
    const listenerId = new Date().toUTCString();
    setListenerId(listenerId);

    CometChat.addCallListener(
      listenerId,
      new CometChat.CallListener({
        onIncomingCallReceived: (call) => {
          console.log("Incoming call:", call);
          setCall(call);
        },
        onIncomingCallRejected: (call) => {
          console.log("Incoming call rejected:", call);
          setCall(null);
        },
        onIncomingCallCancelled: (call) => {
          console.log("Incoming call cancelled:", call);
          setCall(null);
        },
      })
    );

    return () => {
      CometChat.removeCallListener(listenerId);
    };
  }, []);

  useEffect(() => {
    if (!call) {
      CometChat.removeCallListener(listenerId);
    }
  }, [call]);

  if (call) {
    return <CometChatIncomingCall call={call} disableSoundForCalls={true}/>;
  }
  return null;
};

export default IncomingCallHandler;
