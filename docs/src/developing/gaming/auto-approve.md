---
title: How to auto approve transactions
description: To have a fluent game play you may want to be able to auto approve transactions
---

# How to auto approve transaction for fast game play

To have a fluid game play for on-chain games it is beneficials to have an auto approve wallet. 

1. Solflare wallet offers auto-approve functionality with burner wallets, but this limits your players to only one wallet. 

[Burner Auto Approve Wallets](https://twitter.com/solflare_wallet/status/1625950688709644324)<br />

2. Another way to do it is to create a keypair in your game and let the player transfer some sol to that wallet and then use it to pay for transaction fees. Only problem with this is that you need to handle the security for this wallet and the players would need to have access to their seed phrase. 

[Example Source Code](https://github.com/Woody4618/SolPlay_Unity_SDK/blob/main/Assets/SolPlay/Scripts/Services/WalletHolderService.cs)<br />
[Example Game](https://solplay.de/SolHunter/index.html)<br />

3. You can pay the fees yourself, by creating and signing the transactions in the backend and interact with it via an API. See 
<a href="partial-sign-in-backend">Partial sign in Backend section </a> 
just instead of partial sign us sign.