---
title: Solana Gaming SDKs 
description: A list of SDKs that you can use to develope games on Solana 
---

### Unity SDK

The Solana Unity SDK is based on a Solnet fork and the Solanart SDK and maintained by the Team Magic block. It comes with NFT support, Transactions, RPC functions, Phantom Deeplinks, WebGL connector, WebSocket connection support and anchor client code generation.

[Docs](https://solana.unity-sdk.gg/)<br />
[Verified Unity Asset Store Listing](https://assetstore.unity.com/packages/decentralization/infrastructure/solana-sdk-for-unity-246931)<br />
[Example Games](https://github.com/Woody4618/SolPlay_Unity_SDK/tree/main/Assets/SolPlay/Examples)<br />

### Unreal SDK

Originally build by the team of Startatlas. The Unity SDK is currently developed further. (Could need some maintainer)

[Source Code](https://github.com/staratlasmeta/FoundationKit)<br />
[Tutorial](https://www.youtube.com/watch?v=S8fm8mFeUkk)<br />

### Flutter

Flutter is an open source framework by Google for building beautiful, natively compiled, multi-platform applications from a single codebase. For more complex games I would recommend using a GameEngine like Unity or Unreal though.

[Source Code](https://github.com/espresso-cash/espresso-cash-public)<br />

### Next.js/React + Anchor

One of the easiest way to build on Solana is using the Web3js Javascript framework in combination with the Solana Anchor framworks. For more complex games I would recommend using a GameEngine like Unity or Unreal though.
The fastest way to set it up is: 
```js
npx create-solana-dapp your-app
```
I comes with a complete app using Solana wallet adapter and some basic functionality which should ba a good starting point. 
A benefit of using Next.js is that you can use the same code in the backend and in the frontend, which speed up development.

[Web3Js](https://github.com/espresso-cash/espresso-cash-public)<br />
[Solana Cookbook](https://solanacookbook.com/references/basic-transactions.html#how-to-send-sol)<br />


### Python 

Python is an easy to learn programming language which is often used in AI programming. There is a framework called Seahorse which lets you build smart contracts in Python.

[Anchor Playground Example](https://beta.solpg.io/tutorials/hello-seahorse)<br />
[Source and Docs](https://github.com/ameliatastic/seahorse-lang)<br />

### Native C#

The original port of Web3js to C#. It comes with a bunch of functionality like transactions, RPC functions and anchor client code generation. 

[Source and Docs](https://github.com/bmresearch/Solnet/blob/master/docs/articles/getting_started.md)<br />
