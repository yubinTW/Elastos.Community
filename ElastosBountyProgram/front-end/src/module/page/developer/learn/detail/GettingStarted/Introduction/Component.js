import React from 'react'
import '../../style.scss';

export default class extends React.Component {

    render () {
        return (
            <div className="p_developerLearnDetail">
                <h3>Overview</h3>
                This is material for any developer who has some experience with programming languages like Javascript/NodeJS, HTML5, Java, Swift, C++, Golang, etc and wants to get started with various github projects that are open sourced by Elastos.
                This includes the core development of the product such as the Elastos Runtime environment, Elastos Blockchain, creating and integrating ELA into wallets, or creating applications using the SDK if you're a DApp developer.
                In order to make it very easy for any developer(even to someone who's not very familiar with blockchain) Elastos provides an SDK that makes it easy to start developing a decentralized application integrated with blockchain technology without having to fully learn about how blockchain works underneath.
                <h3>The Four Pillars of Elastos Ecosystem</h3>
                <h5>Blockchain and Smart Contracts</h5>
                As the operating system’s trusted zone, the blockchain can implement “trust”.
                The Elastos main chain uses Bitcoin’s POW mechanism to ensure the reliability of data transmission through joint mining with Bitcoin.
                At the same time, Elastos provides services and extends third-party applications through its side chains.
                <h5>Elastos Carrier</h5>
                Elastos Carrier is a completely decentralized P2P network service platform.
                For Elastos, it is an important support infrastructure for decentralized application development and operation.
                It is the Elastos P2P Network Platform part of the architecture diagram.
                <h5>Elastos Runtime</h5>
                Elastos Runtime runs on the user’s equipment to achieve a “reliable runtime environment.”
                By developing Elastos DApp, independent developers can use (play) digital assets such as digital audio and video playback.
                VM guarantees digital assets will run under blockchain control, providing users with the ability to consume and invest in digital content.
                <h5>Elastos SDK</h5>
                This is the traditional APP (i.e. Wechat, QQ, Taobao, and other mobile phone software).
                These APPs can extend their capabilities by introducing the Elastos SDK, gaining typical blockchain abilities like identity authentication and trusted records.
                <h5>Some of the features of Elastos</h5>
                <ul>
                    <li>The Elastos public chain is clean and simple, and hidden from third-party applications and services.</li>
                    <li>Elastos prevents overload of the main chain by having a few predefined sidechains built into the Elastos Carrier platform.</li>
                    <li>Elastos promotes the property rights of digital content. Elastos has the capability to issue tokens for digital assets or applications and to establish the ownership of digital content through smart contracts.</li>
                    <li>Elastos Runtime runs on the OS of customers’ mobile devices. Apps are free to run and their performance is comparable to existing mobile apps. Elastos supports traditional programming languages, making it relatively easy to write code. Elastos also supports popular programming frameworks.</li>
                    <li>The separation of apps from the network ensures that digital content won’t be leaked.</li>
                    <li>Even when Elastos apps are running on operating systems such as iOS, Android and Windows, the local OS won’t be able to sabotage the property rights of digital assets. The value of digital assets is preserved.</li>
                    <li>For non-Elastos apps such as Android or iOS apps, users can access the Elastos Smart Web through the Elastos SDK. Users can log into non-Elastos apps using their Elastos Smart Web ID. Users can also keep their non-Elastos app data in their Elastos cloud storage.</li>
                    <li>Both Elastos smart contracts and Elastos Dapps run on the Elastos Smart Web. This creates a closed platform and avoids the necessity of moving on and off the blockchain. This closed platform creates a special economic zone where users can feel secure while trading digital assets. This enables a closed cycle of production, transaction, and consumption that is necessary for creating wealth.</li>
                </ul>
            </div>
        )
    }
}
