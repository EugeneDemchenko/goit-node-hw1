const fs = require("fs").promises;
const { resolve } = require("path");
const contactsPath = resolve("./db/contacts.json");
const rl = require("readline");
const { promisify } = require("util");

const interface = rl.createInterface(process.stdin, process.stdout);
const question = promisify(interface.question).bind(interface);

async function listContact() {
  const content = await fs.readFile(contactsPath, { encoding: "utf-8" });
  const contacts = JSON.parse(content);
  contacts.forEach((contact) => {
    console.log(
      `${contact.id}\nName:\t${contact.name}\nPhone:\t${contact.phone}\nEmail:\t${contact.email}\n`
    );
  });
}

async function findContactByName(name) {
  const content = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(content);
  const contact = contacts.find((c) => c.name.includes(name));
  console.log(
    `${contact.name}\nPhone:\t${contact.phone}\nEmail:\t${contact.email}\n`
  );
}
async function findContactById(id) {
  const content = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(content);
  const contact = contacts.find((c) => c.id.includes(id));
  console.log(
    `${contact.name}\nPhone:\t${contact.phone}\nEmail:\t${contact.email}\n`
  );
}

async function addContact({ name, email, phone }) {
  const content = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(content);
  const contact = {
    id: String(contacts.length + 1),
    name,
    email,
    phone,
  };
  const duplicate = contacts.find((c) => c.name === contact.name);
  if (duplicate !== undefined) {
    const answer = await question(
      "Contact with this name is already exist. Owerwrite? (y/n)\n"
    );
    if (answer.toLowerCase() === "y") {
      duplicate.email = contact.email;
      duplicate.phone = contact.phone;
    }
  } else {
    contacts.push(contact);
  }
  await fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function removeContact(contactId) {
  const content = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(content);
  const filter = contacts.filter((c) => c.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(filter, undefined, 2));
  console.log(`${contacts[contactId - 1].name} removed from list`);
}

module.exports = {
  listContact,
  findContactByName,
  addContact,
  removeContact,
  findContactById,
};
