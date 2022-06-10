import React, { useState } from 'react'

// utility
import { connectWallet } from '../utils';

import MessageDialogue from './MessageDialogue';

const ConnectButton = () => {
    const [isOpenMessageDailogue, setIsOpenMessageDialogue] = useState(false)
    const [messageData, setMessageData] = useState('')
    const [walletAddress, setWalletAddress] = useState('')

    const handleConnect = async () => {
        try {
            setIsOpenMessageDialogue(true)
            setMessageData(`Check if the Zelcore wallet is ready`)

            // close dialogue after 1s
            setTimeout(() => {
                setIsOpenMessageDialogue(false)
            }, 2000)

            const result = await connectWallet()

            if(result.status === 'success') {
                console.log(result)
                setIsOpenMessageDialogue(true)
                setMessageData(`${ 'Wallet connection success, wallet address is ' + result.data[0] }`)

                // close dialogue after 1s
                setTimeout(() => {
                    setIsOpenMessageDialogue(false)
                }, 3000)

                setWalletAddress(result.data[0]);

                localStorage.setItem('accountAddress', JSON.stringify(result.data))
            }

        } catch (error) {
            setIsOpenMessageDialogue(true)
            setMessageData(`${ error.message + ', make sure wallet is ready' }`)

            // close dialogue after 3s
            setTimeout(() => {
                setIsOpenMessageDialogue(false)
            }, 3000)
        }
    }

    return (
        <>
            <button 
                className='bg-indigo-500 px-4 py-2 rounded text-white shadow' 
                onClick={handleConnect}>
                    Connect Wallet
            </button>
            <div style={{width: "60px", overflow: "hidden"}}>
                { walletAddress }
            </div>

            <MessageDialogue message={messageData} isOpen={isOpenMessageDailogue} />
        </>
        
    )
}

export default ConnectButton