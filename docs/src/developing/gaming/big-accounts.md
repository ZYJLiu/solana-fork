---
title: How to handle big accounts with zero copy
description: Stack and heap size is rather limited on Solana so here is some help
---

# How to handle big accounts

The heap and stack memory in the solana runtime are very limited. We have 4Kb to work with on the stack and 32Kb on the heap. 
These limits are quickly reached when building a game. 
By default in Anchor all accounts being loaded will be on the stack. If you reach the stack limit you will an error similar to this: 

```js
Stack offset of -30728 exceeded max offset of -4096 by 26632 bytes, please minimize large stack variables
```

So prevent this to a certain degree you can Box your account. What this means is that the account will move to the head and there will only be saved a pointer on the Stack. 
This can be done like this: 

```js
#[derive(Accounts)]
pub struct Example {
    pub my_acc: Box<Account<'info, MyData>>
}
```

If your account gets bigger than it gets a bit more complicated. Solana does not allow Cross Program Invocations with account bigger than 10Kb.
Anchor does use a CPI to initialize all new accounts. So it calls the System Progamm internally to create a new account. 
If you need an even bigger account size you need to look into Zero Copy serialization. 
You should only use zero copy for large accounts that can not be Borsh deserialised without hitting the heap or stack limits. 
With zero copy deserialization, all bytes from the account's backing `RefCell<&mut [u8]>` are simply re-interpreted as a reference to
the data structure. No allocations or copies necessary. This is how we can get around the stack and heap limitations.

For the account you want to serialize with zero copy you need to add this zero_copy to the account: 

```js
#[account(zero_copy)]
```

Then you can define the repr which definies how the data will be packed. By default repr[c] will be used, so the C serialization. 
This will by default break options and enums in your structs because the C serialization is different from the Borsh serialization.
You can also use  

```js
#[repr(packed)]
```

which should remove all the extra space that the C serialization adds.

Here is a list of different repr types <br/>
[Repr types](https://doc.rust-lang.org/nomicon/other-reprs.html)<br/>
[Space needed for different data types](https://book.anchor-lang.com/anchor_references/space.html)<br/>

Next you replace Account with AccountLoader and then in you anchor program you can access the data using .load_mut()?

```js

pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
    Ok(())
}

pub fn set_data(ctx: Context<SetData>, string_to_set: String) -> Result<()> {
    ctx.accounts
        .data_holder
        .load_mut()?
        .long_string
        .copy_from_slice(string_to_set.as_bytes());
    msg!("big string set successfully");
    Ok(())
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, seeds = [b"big_account", signer.key().as_ref()], bump, payer=signer, space= 10 * 1024 as usize)]
    pub data_holder: AccountLoader<'info, BigAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}

#[account(zero_copy)]
#[repr(packed)]
pub struct BigAccount {
    pub long_string: [u8; 920],
}

#[derive(Accounts)]
pub struct SetData<'info> {
    #[account(mut)]
    pub data_holder: AccountLoader<'info, BigAccount>,
    #[account(mut)]
    pub writer: Signer<'info>,
}
```

If you need even bigger accounts up to 64Mb you can not use the Anchor initialization anymore. You have two options for this. 
1. Use realloc to increase the account size 10Kb at a time. 
2. Create the Account with a seperate call and initialize it yourself. The 10Kb limit does not exist when you create a new instruction with a create account instruction. 


Here is a game anchor progam that uses Zero Copy for a game grid: <br/> 
[Anchor Programm](https://github.com/Woody4618/SolPlay_Unity_SDK/blob/main/Assets/SolPlay/Examples/SolHunter/AnchorProgram/src/state/game.rs)

