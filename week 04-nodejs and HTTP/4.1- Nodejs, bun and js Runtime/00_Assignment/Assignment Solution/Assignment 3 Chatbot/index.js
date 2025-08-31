// const fs = require ("fs")
const { Command } = require('commander');
const program = new Command();

program
    .name("chatbot")
    .description("CLI chatbot with predefined options")
    .version("1.0.0");

program
    .command("ask")
     .description("Choose a chatbot option")
    .option("-g, --greet", "Say hello")
    .option("-j, --joke", "Tell a joke")
    .option("-a, --advice", "Give some advice")

.action((options) => {
    if (options.greet) {
      console.log("🤖 Hello! Hope you're having a great day.");
    } else if (options.joke) {
      console.log("🤖 Why don’t skeletons fight each other? Because they don’t have the guts! 😂");
    } else if (options.advice) {
      console.log("🤖 Remember: consistency beats motivation. Keep going!");
    } else {
      console.log("🤖 Please select an option. Run with --help to see choices.");
    }
  });

program.parse(process.argv);