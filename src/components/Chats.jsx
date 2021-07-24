import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../Contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleLogOut = async () => {
    await auth.signOut();
    history.push("/");
  };
  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      history.push("./");
      return;
    }

    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": "7785f8ea-a860-4ab2-bb2b-c138fa0ddd1e",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users", formdata, {
              headers: {
                "private-key": "52630b93-9792-4b3e-a642-da8e43098a16",
              },
            })
            .then(() => setLoading(false))
            .catch((error)=> console.log(error))
        });
      });
  }, [user, history]);
  if(!user || loading) return 'Loading...'
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">WhatsChat </div>
        <div className="logout-tab" onClick={handleLogOut}>
          Log Out
        </div>
      </div>
      <ChatEngine
        height="90vh"
        projectID="7785f8ea-a860-4ab2-bb2b-c138fa0ddd1e"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
