const { program } = require("commander");

const {
  listContact,
  findContactByName,
  removeContact,
  addContact,
  findContactById,
} = require("./contacts.js");

program
  .command("findname <name>")
  .description("Find contact by name")
  .action(findContactByName);
program
  .command("find <id>")
  .description("Find contact by ID")
  .action(findContactById);
program.command("list").description("Contacts list").action(listContact);
program
  .command("add")
  .description("Add contact to list")
  .option("-n|--name [name]", "New contact's name")
  .option("-e|--email [email]", "New contact's email")
  .option("-p|--phone [phone]", "New contact's phone")
  .action(addContact);
program
  .command("remove <id>")
  .description("Remove contact from list")
  .action(removeContact);

program.parse(process.argv);
