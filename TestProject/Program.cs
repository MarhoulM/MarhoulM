const string input = "<div><h2>Widgets &trade;</h2><span>5000</span></div>";

string quantity = "";
string output = "";

int firstSpanPos = input.IndexOf("<span>") + 6;
int lastSpanPos = input.IndexOf("</span>");
int quatityLenght = lastSpanPos - firstSpanPos;
quantity = input.Substring(firstSpanPos, quatityLenght);

const string tradeSymbol = "&trade;";
const string regSymbol = "&reg;";
output = input.Replace(tradeSymbol, regSymbol);
int firstDivPos = output.IndexOf("<div>") + 5;
int lastDivPos = output.IndexOf("</div>");
int outputLenght = lastDivPos - firstDivPos;
output = output.Substring(firstDivPos, outputLenght);
Console.WriteLine($"Quantity: {quantity}");
Console.WriteLine($"Output: {output}");