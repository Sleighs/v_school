![https://coursework.vschool.io/content/images/2015/05/caesar.png](https://coursework.vschool.io/content/images/2015/05/caesar.png)

> In cryptography, a Caesar cipher, also known as Caesar's cipher, the shift cipher, Caesar's code or Caesar shift, is one of the simplest and most widely known encryption techniques. It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet." -Wikipedia
> 

For this exercise, you will be implementing a Caeser cipher using Javascript. Your program will receive two inputs:

1. The text to be encoded
2. The number positions to shift each letter (to the right)

For example:

![https://coursework.vschool.io/content/images/2016/05/Screen-Shot-2016-05-10-at-2-17-56-PM.png](https://coursework.vschool.io/content/images/2016/05/Screen-Shot-2016-05-10-at-2-17-56-PM.png)

You only have to shift letters that are part of the 26-letter alphabet. Any other characters (such as spaces) should be printed as they were received. The shift value will always be on the interval [0, 26].

Here is some code to get you started:

From terminal:

```
# cd into your caesar-cipher folder first, then run:
npm install readline-sync

```

In your code:

```
var readline = require('readline-sync');
var input = readline.question('What phrase would you like to encrypt? ').toLowerCase();
var shift = parseInt(readline.question('How many letters would you like to shift? '));

```