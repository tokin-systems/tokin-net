#### IMPLEMENTATION NOTES


M: subscribes to E
E: has a message he wants to send to M
M

wallet:
  every user has a wallet

identifer:
  every wallet has a unique identifier

subscribes: 
  wallet with subscriber list (identifiers) of those who have access
  - A subscribes to B but B does not subscribe to A
    - A gets all Bs messages/published
  - A subscribes to B and B subscribes to A
    - A gets all Bs messages/published
    - B gets all As messages/published

reciever
sender


// obfuscation step (METHOD 1 fast, METHOD 2 slow)]
// validation step(s)
// defuscation step (METHOD 1 slow, METHOD 2 fast)
// validation step(s)


// METHOD 1

// need assurance that tokens are globally unique to each store
// can use time for universal uniq

 // stores are immutable no making changes -- baddies could find tokens and change payload

// 0 www:here  6G**9    1
// 1 www:there 7U0I&    2
// 2 www:here  6*57H



// www:here
// [null, [3, 6*57H], null, [1, 6G**9], null]

// www:there
// [{ 7U0I&: 2 }, {}, {}]


// security
// -- snoops on the line
// -- requests failing (state kept between)
// speed
// -- how much is being sent
// -- how often is it being sent


// METHOD 2

// 0 red
// 1 blue
// 2 green

0: [www:store2, 0]
1: [www:store3, 2]
2: [www:store1, 1]

0

// www:store1 [null, green|pubkey, null, null]
// www:store2 [null, red|pubkey, null, null]
// www:store3 [null, null, blue|pubkey, null]
// ...

torrents... on anyone who keeps data up...



store can fill up arbitrary init size... then unusable