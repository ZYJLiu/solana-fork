---
title: Storing Sol in a PDA
description: Show how to pay out SOL to the player from a chest vault
---

# Store sol in a program and pay it out to players


I big benefit or a blockchain game is that you can reward players for actions in a game. To store sol we first create a program derived address (PDA).
This means that it is an account that the program can sign for. Using the [Anchor Framework](https://www.anchor-lang.com/) this is pretty straight forward as you can see for the chest_vault account below you just need to add a seeds value to the account.

```js 
    #[account]
    pub struct ChestVaultAccount {}

    #[account(
        init,
        seeds = [b"chestVault"],
        bump,
        payer = signer,
        space = 8
    )]
    pub chest_vault: Account<'info, ChestVaultAccount>,
```

Then we can call an instruction on the program to deposit some sol into that account by calling the System program with a cross program invocation. This just means calling a program from within a program. Here you can see we are creating a CPIContext with the account we want to interact with and then pass them to the system program transfer function to transfer 1000000 Lamports (fraction of sol token) into the chest vault. 

```js 
    let cpi_context = CpiContext::new(
        ctx.accounts.system_program.to_account_info(),
        system_program::Transfer {
            from: ctx.accounts.payer.to_account_info().clone(),
            to: ctx.accounts.chest_vault.to_account_info().clone(),
        },
    );
    system_program::transfer(cpi_context, 1000000)?;
```

Then as soon as the player reaches the end of the chest in the game we can transfer the Sol back from the chest vault to the player.

```js 
    **ctx
        .accounts
        .chest_vault
        .to_account_info()
        .try_borrow_mut_lamports()? -= 1000000;
        
    **ctx
        .accounts
        .player
        .to_account_info()
        .try_borrow_mut_lamports()? += 1000000;
```

to change the lamports from the chest account and add them to the player account. Here we can not just call the System program transfer because our PDA is not owned by the System program. When using try_borrow_mut_lamports the account that gets lamports deducted needs to be a signer and the runtime always makes sure that after a transaction all account balances together equal out again. 

You can use this system to reward players for any kind of action in a game. You could for example let players pay a fee to start a game and then when they reach certain goals you transfer some sol back. Or you could let people pay Sol into a price pool and then let the best players get more rewards. 

The full source code ready to deploy you can find in this [Solana Playground example](https://beta.solpg.io/tutorials/tiny-adventure-two)
