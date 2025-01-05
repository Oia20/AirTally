<h1 align="center">✈️🔢 AirTally</h1>
<p align="center"><i>The open-source counter/tally web app.</i></p>

---

<h2>🚀 Overview</h2>

<p><b>AirTally</b> is a user-friendly tool for counting and tracking anything from personal goals to inventory items.</p>

---

<h2>✨ Features</h2>

<ul>
  <li>📊 <b>Categorization</b>: Organize your tallies into custom categories for easy management.</li>
  <li>🔄 <b>Real-Time Updates</b>: Instantly sync your tallies across devices for seamless tracking.</li>
  <li>🌍 <b>Open Source</b>: Free to use, modify, and contribute.</li>
  <li>☁️ <b>Cloud Sync</b>: Securely save and access your data anywhere.</li>
</ul>


---

<h2>🔧 Installation/Run Locally</h2>

<h3>Clone Repo</h3>

```bash
git clone https://github.com/Oia20/AirTally.git
```

<h3>Client Side</h3>

```bash
cd airTally
npm install
npm run dev
```

<h3>Server side/db</h3>

<h4>Copy .env files</h4>

```bash
cp .env.example .env
```

<h4>Navigate to lib/prisma then copy that env file</h4>

```bash
cd .\src\app\lib\prisma\
cp .env.example .env
```
Then configure your DB connection string, and JWT's

<h4>Push DB schema</h4>

```bash
cd .\src\app\lib\prisma\
npx prisma generate
npx prisma db push
```

<h4>With that you should be all up and running</h4>


<h2>🌱 Contributing</h2> <p>We welcome contributions! Feel free to open an issue or submit a pull request if you'd like to help improve AirTally</p> <ul> <li>Fork the repository</li> <li>Create a new branch (<code>git checkout -b feature-branch</code>)</li> <li>Make your changes</li> <li>Commit your changes (<code>git commit -m 'Add some feature'</code>)</li> <li>Push to the branch (<code>git push origin feature-branch</code>)</li> <li>Open a pull request</li> </ul>
<h2>🛠 Tech Stack</h2>
<table> 
  <tr> 
    <td>
      <b>Frontend</b>
    </td> 
    <td>Next.js</td> 
  </tr> <tr> <td><b>Backend</b></td> 
    <td>Next.js</td> </tr> <tr> 
      <td><b>Database</b></td> 
      <td>Postgres/Prisma</td> </tr> <tr> 
        <td><b>Styling</b></td> 
        <td>Tailwind/CSS</td> </tr> 
</table>
________________________________

<h2>TODO:</h2>

- [ ] Improve landing page
- [ ] Show no foldering, click to add if they have no folders
- [ ] Show better user errors on log in/signup

________________________________

Connected items:
- [ ] Open up increment endpoint to an external API.
- [ ] Docs
________________________________

<h2>📜 License</h2> <p>This project is licensed under the MIT License.</p> <div align="center"> <a href="https://github.com/Oia20/AirTally/issues"> <img alt="Issues" src="https://img.shields.io/github/issues/Oia20/AirTally?color=brightgreen"/> </a> <a href="https://github.com/Oia20/AirTally"> <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Oia20/AirTally?style=social"/> </a> </div>
<p align="center"><i>Give it a go, and start counting anything you'd like!</i></p>



