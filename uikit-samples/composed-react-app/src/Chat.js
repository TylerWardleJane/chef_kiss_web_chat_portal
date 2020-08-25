import React from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';
import {
  SendBirdProvider,
  Channel,
} from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';

export default function Chat({ theme }) {
  const channelURL = "sendbird_group_channel_69687142_93ac789ad5be7b09e638eb2bc4acbf57559fa99d"
  const { nickname, userId, staffId } = useParams()
  return (
    <div style={{ height: '100vh', border: 'none' }}>
      <SendBirdProvider
        appId={process.env.APP_ID}
        userId={userId}
        nickname={nickname}
        theme={{ border: 'none', backgroundColor: 'white'}}
      >
          <div className="sendbird-app__wrap">
          <div className="sendbird-app__conversation-wrap">
            <Channel
              renderChatHeader={() => (<div></div>)}
              channelUrl={channelURL}
            />
          </div>
          </div>
      </SendBirdProvider>
    </div>
  )
}
