const PROFILE_PT = "./js/content-pt.json";
const PROFILE_EN = "./js/content-en.json";

//Main Execution
window.onload = async () => {
  //Defining fixed points in Document Object Model
  const pt = document.getElementById("lang-pt");
  const en = document.getElementById("lang-en");

  //Loading page with preferred Language settings
  await configureLanguage(
    navigator.language === "pt-BR" ? PROFILE_PT : PROFILE_EN
  );

  //Listeners
  pt.onclick = async () => {
    await configureLanguage(PROFILE_PT);
  };

  en.onclick = async () => {
    await configureLanguage(PROFILE_EN);
  };
};

/* 
  ---------- 
  Procedures
  ----------
*/

async function getProfileData(filePath) {
  var profileData = null;

  await fetch(filePath)
    .then(async (res) => {
      profileData = await res.json();
    })
    .catch((err) => {
      console.log(`Failed when trying to retrieve profile data: ${err}`);
    });

  return profileData;
}

function configureAboutSection(about) {
  const profileSection = document.getElementById("profile-details");
  profileSection.innerHTML = `
  <h3>${about.title}</h3>
  <p>${about.description}</p>
`;
}

async function configureLanguage(langFile) {
  var data = await getProfileData(langFile);
  const about = data.overview;
  configureAboutSection(about);
}
