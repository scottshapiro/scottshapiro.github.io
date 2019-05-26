---
title: Ledger Nano X Hardware Wallet Review
author: Scott Shapiro
layout: post
---

After waiting for a couple months, I finally received and unboxed my Ledger Nano X. I’m a huge fan of hardware wallets and owning the keys to my coins. 

The killer feature that was missing in the Keepkey, Trezors, and Ledger Nano S that I used was mobile support. Not an OTG (on the go) cable with Android-only support but Bluetooth! It needs to work with iOS too. What good is a wallet if it needs to be physically tethered or doesn’t work with all mobile devices?

## Hardware
The hardware is solid, especially with the metal swivel cover. I’d feel safe carrying it in my pocket and doing all the things I do - cycling, skiing, working - everyday. 

Button clicks are loud! Trezor is much quieter. Crypto usage should be discreet. 

Nano X is bigger than nano s. Maybe 50% larger by volume (anyone up for the water displacement method?). This is a little bit of a downside for a carry-on-keychain scenario. 

One-handed operation to hit both buttons is tough. Two-button operation is a constant with the Nano X. This works with one hand if the Nano is on a table and you can use two fingers (pointer and middle). But I would trade off a little accuracy for consistent one-handedness (eg a 3rd button or a jog-wheel and button). 

## Setup hardware
Out of the box, the device powered in per instructions with low battery. Ledger’s FAQs state that devices ship with 25% batter. Battery probably contributes to the larger format and is a worthwhile trade off. So I plugged in a USB-C charger and could get setup while charging. 

![Low battery after unboxing](/images/ledgerbattery.jpg)

I chose the path of restoring with a 12 word nemonic I had memorized instead of creating a new one. Awesome that Ledger allows 12, 18, and 24 word seeds. Entry using two buttons was tedious and reminiscent of Nokia predictive text. But I got it right on the first try all from memory. Pin setup was also easy and allows a min. of 4 digits. 

## Ledger live sync took a few tries
Ledger Live is the mobile or desktop app that you use to manage your wallet.  Nano S connects via a cable but the X connects over Bluetooth. This took a few tries to get right. 

Bluetooth is such a finicky protocol. My first attempt failed. I had to reboot the Nano X to get my iPad to recognize it. 

On my next try, it picked up the iPad pair request but still failed. On the third try, I managed to accept the pair request on Nano x before iPad. This felt like 2007 car Bluetooth versus today’s almost seamless sync. Crypto wallets will get there one day too. 

![successful sync](/images/ledgerready.jpg)

## Installing bitcoin app
Since I had created this nemonic for a bitcoin wallet many years ago, I setup bitcoin as my first app. I installed the app using Ledger Live, it synced my wallet, and I could see my transaction history. Awesome. 

![bitcoin history](/images/ledgerbtc.png)

Operations between LL and the Nano X are often laggy. LL will ask you to open the Bitcoin app on your Nano X and it’ll take 5 seconds to acknowledge and move forward. I’m now used to it but at first I could tell what was happening. 

## Security
Choosing this wallet, I’m making a bet that Bluetooth is secure. What good is owning your keys if an MITM or other remote attack can steal them?

Ledger implemented many security steps in its flows. Sometimes it feels overwhelming, like needing to re-enter my pin upon plugging into a USB charger. Or having the default digit in a pin entry be random (so that a keystroke attack fails). But I always remind myself that I’d rather have it this way than a product that is too lax. 

## Wishlist
In the few hours I’ve tinkered, I’m very happy with this purchase but have a few ideas for what would make the Nano X even better. 

The biggest benefit will come from improving the Ledger Live software to make it less laggy and more robust. Making for a smoother Bluetooth sync is key. So is reducing lag between cross-device operations. 

Selfishly, I’m interested in adding more coins (I hear Monero is coming soon), and more wallet management. For example changing the auto-lock timeout setting or even displaying device battery life. Push me a notification if battery is <20%. Input/output is so much richer on a phone or tablet than a hardware wallet. 

Some of the hardware wallet UX is wonky too. There’s a “+” item to install an app but then it tells you go to Ledger Live. I suppose this helps guide long time Ledger users who did more of the operations on-device. It’s also hard to tell what state you’re in. State ownership between mobile app and wallet aren’t as clearly defined as Trezor’s model where the wallet is much more a slave to the app. 

Last and most intriguing is Lightning Network support. To move funds off chain, I have to send them to a 3rd party LN wallet that’s just like any other send destination. Ledger (and other hardware wallets) could build this into their software just like I can do with my Zap wallet and myriad other forms of mobile LN wallets popping up. 
