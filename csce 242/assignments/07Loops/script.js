const drawBtn = document.getElementById('draw');
const scene = document.getElementById('scene');

function isNightTime() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  return (hour > 18 || (hour === 18 && minute >= 0)) || (hour < 6);
}

function createCelestial(isNight) {
  const celestial = document.createElement('div');
  celestial.className = isNight ? 'moon' : 'sun';
  return celestial;
}

function createClouds() {
  const clouds = [];
  const spacing = scene.offsetWidth / 9;

  for (let i = 0; i < 6; i++) {
    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    cloud.style.top = '150px';
    cloud.style.left = `${spacing * (i + 1) - 40}px`;
    clouds.push(cloud);
  }
  return clouds;
}

function createTrees() {
  const trees = [];
  const spacing = scene.offsetWidth / 9;

  for (let i = 0; i < 6; i++) {
    const tree = document.createElement('div');
    tree.className = 'tree';
    tree.style.left = `${spacing * (i + 1) - 10}px`;
    tree.style.bottom = '0px';
    trees.push(tree);
  }
  return trees;
}

function drawScene() {
  scene.innerHTML = '';

  const night = isNightTime();
  document.body.classList.toggle('night', night);

  scene.appendChild(createCelestial(night));

  createClouds().forEach(cloud => scene.appendChild(cloud));
  createTrees().forEach(tree => scene.appendChild(tree));
}

drawBtn.addEventListener('click', drawScene);
