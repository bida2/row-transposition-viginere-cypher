# Row Transposition Cipher + Viginere's Cipher 
A simple JavaScript set of functions that implements [Row Transposition cipher](https://www.geeksforgeeks.org/columnar-transposition-cipher/) and [Viginere's cipher](https://www.geeksforgeeks.org/vigenere-cipher/).

The algorithm runs in the following manner:
  1. Supply a string to be encoded in the first field (example words are 'love', 'fruit', 'hate', 'cipher', 'traditional'
  2. Enter a key that will be used for encryption in the second field for the first cipher we are going to run (Row Transposition cipher) - choose another word - examples 
  are 'key', 'hello', 'beat', 'game'
  3. Enter a key for the second cipher (Viginere's) - examples are 'bull', 'broke', 'pull', 'pierce'
  4. There are two results - the first result is after the first cipher runs - **for example, if the string to be encoded is "love" and the key for the first cipher is "hey", 
  you will get a string in the format "XoelXv", where the 'X' symbols are random English alphabet symbols**. 
  The second result uses the result of the first cipher and produces a Viginere's cipher encoded string - **for example, if we enter "love" as our initial string to be encoded, the first cipher uses "key" as its cipher key - an example result can be "foelkv".
  If we use the Viginere's cipher with key "fruit" on cipher 1's result string, the result here will be "kfytda".**
  
  
