import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';
import {
    SendBirdProvider,
    Channel,
    withSendBird,
    sendBirdSelectors,
} from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';

export default function Chat() {
    const { userId, staffId } = useParams()
    const [ channelUrl, setChannelUrl ] = useState(null)

    const FindChannel = withSendBird(() => null,(state) => {
        const sdk = sendBirdSelectors.getSdk(state);
        const channelList = sdk && sdk.GroupChannel && sdk.GroupChannel.createMyGroupChannelListQuery()
        if (channelList && channelList.hasNext) {
            channelList.includeEmpty = true
            channelList.next((channelInList) => {
                if (channelInList) {
                    setChannelUrl(channelInList.find((channel) => {
                        return channel.members.find((member) => member.userId === userId) && channel.members.find((member) => member.userId === staffId)
                    }).url)
                }
            })
        }
        if (!channelUrl && sdk && sdk.GroupChannel) {
            sdk.GroupChannel.createChannelWithUserIds([userId, staffId], true, `${userId} and ${staffId}`, null, null, null, (groupChannel) => {
                setChannelUrl(groupChannel.url)
            })
        }
    });

  return (
    <div style={{ height: '100vh', border: 'none' }}>
      <SendBirdProvider
        appId={process.env.APP_ID}
        userId={staffId}
        theme={{ border: 'none', backgroundColor: 'white'}}
      >
          <FindChannel />
          <div className="sendbird-app__wrap">
          <div className="sendbird-app__conversation-wrap">
              { channelUrl &&
              <Channel
                  renderChatHeader={() => (<div></div>)}
                  channelUrl={channelUrl}
              />}
          </div>
          </div>

      </SendBirdProvider>
    </div>
  )
}
