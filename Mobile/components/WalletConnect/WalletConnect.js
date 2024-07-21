import '@walletconnect/react-native-compat'
import { useWalletConnectModal, WalletConnectModal } from '@walletconnect/modal-react-native'
import { Pressable } from 'react-native'
import { Text } from 'react-native-svg'

const projectId = 'YOUR_PROJECT_ID'

const providerMetadata = {
  name: 'Level Coins',
  description: 'YOUR_PROJECT_DESCRIPTION',
  url: 'https://your-project-website.com/',
  icons: ['https://your-project-logo.com/'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com'
  }
}

export default function WalleConnect() {
    const {isOpen,open,close,provider,isConnected,address}=useWalletConnectModal()
  return (
    <>
        <Pressable onPress={()=>open()}>
        <Text >{isConnected?"View Account":"connect"}</Text>
        </Pressable>
      <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata} />
    </>
  )
}