string pangram = "The quick brown fox jumps over the lazy dog";
string [] pangramSplit = pangram.Split(" ");
string finalSentence = "";

foreach (var word in pangramSplit){
   string result = new string (word.Reverse().ToArray());
   finalSentence += result + " ";
}
Console.WriteLine(finalSentence);
