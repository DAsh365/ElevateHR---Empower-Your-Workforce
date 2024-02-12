// Ahoy, matey! Hoist the sails and let's embark on an adventure with ElevateHR - Empower Your Workforce!

const inquirer = require("inquirer");
const mysql = require("mysql2");
const { table } = require("table");
const ascii = require("ascii-art");

// Avast! Set up ye database connection, ye scallywags!
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_tracker_db",
});

// Aye, behold the view of all our crew members!
function viewAllCrews() {
  connection.query(
    { sql: "SELECT name FROM crew", rowsAsArray: true },
    (err, results) => {
      if (err) throw err;
      results.unshift(["Crew"]);
      console.log(table(results));
      mainMenu();
    }
  );
}

// Arr! Look at the treasure in our positions!
function viewAllPositions() {
  connection.query(
    { sql: "SELECT title, salary FROM positions", rowsAsArray: true },
    (err, results) => {
      if (err) throw err;
      results.unshift(["Title", "Salary"]);
      console.log(table(results));
      mainMenu();
    }
  );
}

// Shiver me timbers! Feast yer eyes on our scurvy pirates!
function viewAllPirates() {
  connection.query(
    {
      sql: `SELECT p.id, p.first_name, p.last_name, pos.title, c.name AS crew_name, pos.salary, CONCAT(m.first_name , ' ' , m.last_name) AS captain_name
      FROM pirate p 
      LEFT JOIN positions pos ON pos.id = p.position_id 
      LEFT JOIN crew c ON c.id = pos.crew_id 
      LEFT JOIN pirate m ON m.id = p.captain_id`,
      rowsAsArray: true,
    },
    (err, pirates) => {
      if (err) throw err;
      pirates.unshift([
        "ID",
        "First Name",
        "Last Name",
        "Title",
        "Crew",
        "Salary",
        "Captain",
      ]);
      console.log(table(pirates));
      mainMenu();
    }
  );
}

// Avast ye, add a new crew to our fleet!
function addCrew() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "crewName",
        message: "Arr! Enter the name of the crew:",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO crew SET ?",
        { name: answers.crewName },
        (err) => {
          if (err) throw err;

          console.log("Crew added successfully. Shiver me timbers!");
          mainMenu();
        }
      );
    });
}

// Ahoy! Add a new position for our braveheart pirates!
function addPosition() {
  connection.query("SELECT * FROM crew", (err, crew) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "positionName",
          message: "Enter the name of the position:",
        },
        {
          type: "input",
          name: "salary",
          message:
            "Yar! Enter the treasure for this position (use only 2 decimal points and no commas):",
          validate: function (value) {
            const valid =
              !isNaN(parseFloat(value)) && Number.isFinite(parseFloat(value));
            return valid || "Arr! Please enter a valid treasure.";
          },
        },
        {
          type: "list",
          name: "crewId",
          message: "Select the crew for the position:",
          choices: crew.map((crew) => ({
            name: crew.name,
            value: crew.id,
          })),
        },
      ])
      .then((answers) => {
        connection.query(
          "INSERT INTO positions SET ?",
          {
            title: answers.positionName,
            salary: answers.salary,
            crew_id: answers.crewId,
          },
          (err) => {
            if (err) throw err;

            console.log("Position added successfully. Yo ho ho!");
            mainMenu();
          }
        );
      });
  });
}

// Avast, add a new pirate to our ranks!
function addPirate() {
  connection.query("SELECT * FROM positions", (err, positions) => {
    if (err) throw err;
    connection.query("SELECT * FROM pirate", (err, pirate) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "Arr! Enter the first name of the pirate:",
          },
          {
            type: "input",
            name: "lastName",
            message: "Avast ye! Enter the last name of the pirate:",
          },
          {
            type: "list",
            name: "positionId",
            message: "Select the position for the pirate:",
            choices: positions.map((pos) => ({
              name: pos.title,
              value: pos.id,
            })),
          },
          {
            type: "list",
            name: "captainId",
            message: "Arr! Select the captain for the pirate:",
            choices: [
              { name: "None", value: null },
              ...pirate.map((pirate) => ({
                name: `${pirate.first_name} ${pirate.last_name}`,
                value: pirate.id,
              })),
            ],
          },
        ])
        .then((answers) => {
          connection.query(
            "INSERT INTO pirate SET ?",
            {
              first_name: answers.firstName,
              last_name: answers.lastName,
              position_id: answers.positionId,
              captain_id: answers.captainId,
            },
            (err) => {
              if (err) throw err;

              console.log("Pirate added successfully. Yo ho ho!");
              mainMenu();
            }
          );
        });
    });
  });
}

// Ahoy! Let's set sail with ElevateHR - Empower Your Workforce!
async function generateTitle() {
  const titleText = "ElevateHR!";

  return new Promise((resolve, reject) => {
    ascii.font(titleText, "doom", (err, rendered) => {
      if (err) {
        reject(err);
      } else {
        console.log(rendered);
        resolve();
        try {
          mainMenu();
        } catch (error) {
          console.error("An error occurred in mainMenu:", error);
        }
      }
    });
  });
}

// Avast, matey! Welcome to the main menu!
async function mainMenu() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would ye like to do?",
        choices: [
          "Add a crew",
          "View all crews",
          "Add a position",
          "View all positions",
          "Add a pirate",
          "View all pirates",
          "Exit",
        ],
      },
    ]);

    switch (answers.action) {
      case "View all crews":
        viewAllCrews();
        break;
      case "View all positions":
        viewAllPositions();
        break;
      case "View all pirates":
        viewAllPirates();
        break;
      case "Add a crew":
        addCrew();
        break;
      case "Add a position":
        addPosition();
        break;
      case "Add a pirate":
        addPirate();
        break;
      case "Exit":
        connection.end();
        console.log("Shiver me timbers! Farewell, matey!");
        break;
      default:
        console.log("Arrr! That's not a valid choice. Try again.");
        mainMenu();
    }
  } catch (error) {
    console.error("Ye scallywag! An error occurred:", error);
  }
}

// Avast ye, prepare to set sail with ElevateHR - Empower Your Workforce!
generateTitle();