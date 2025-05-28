// Dados dos planetas
const planetData = {
    sun: {
        name: "Sol",
        diameter: "1.392.700 km",
        mass: "1,989 × 10³⁰ kg",
        distance: "0 km",
        temperature: "5.500°C (superfície)",
        orbitalPeriod: "25-35 dias (rotação diferencial)",
        description: "O Sol é uma estrela anã amarela que contém 99,86% da massa do sistema solar. É a principal fonte de energia para a vida na Terra.",
        image: "./img/sun.png"
    },
    mercury: {
        name: "Mercúrio",
        diameter: "4.879 km",
        mass: "3,301 × 10²³ kg",
        distance: "57.910.000 km",
        temperature: "-173°C a 427°C",
        orbitalPeriod: "88 dias terrestres",
        description: "O menor planeta do sistema solar e o mais próximo do Sol. Tem uma superfície craterizada semelhante à da Lua.",
        image: "./img/mercury.png"
    },
    venus: {
        name: "Vênus",
        diameter: "12.104 km",
        mass: "4,867 × 10²⁴ kg",
        distance: "108.200.000 km",
        temperature: "462°C (média)",
        orbitalPeriod: "225 dias terrestres",
        description: "O planeta mais quente do sistema solar, com uma atmosfera densa de dióxido de carbono que cria um intenso efeito estufa.",
        image: "./img/venus.png"
    },
    earth: {
        name: "Terra",
        diameter: "12.742 km",
        mass: "5,972 × 10²⁴ kg",
        distance: "149.600.000 km",
        temperature: "-89°C a 58°C",
        orbitalPeriod: "365,25 dias",
        description: "Nosso lar, o único planeta conhecido por abrigar vida. Tem uma superfície 70% coberta por água líquida.",
        image: "./img/earth.png"
    },
    mars: {
        name: "Marte",
        diameter: "6.779 km",
        mass: "6,39 × 10²³ kg",
        distance: "227.900.000 km",
        temperature: "-125°C a 20°C",
        orbitalPeriod: "687 dias terrestres",
        description: "Conhecido como 'Planeta Vermelho' devido ao óxido de ferro em sua superfície. Possui a maior montanha do sistema solar, o Monte Olimpo.",
        image: "./img/mars.png"
    },
    jupiter: {
        name: "Júpiter",
        diameter: "139.820 km",
        mass: "1,898 × 10²⁷ kg",
        distance: "778.500.000 km",
        temperature: "-108°C (superfície)",
        orbitalPeriod: "11,86 anos terrestres",
        description: "O maior planeta do sistema solar, um gigante gasoso com 79 luas conhecidas. Sua Grande Mancha Vermelha é uma tempestade que dura séculos.",
        image: "./img/jupiter.png"
    },
    saturn: {
        name: "Saturno",
        diameter: "116.460 km",
        mass: "5,683 × 10²⁶ kg",
        distance: "1.434.000.000 km",
        temperature: "-139°C (superfície)",
        orbitalPeriod: "29,45 anos terrestres",
        description: "Famoso por seus impressionantes anéis compostos principalmente de gelo e poeira. Possui 82 luas confirmadas.",
        image: "./img/saturn.png"
    },
    uranus: {
        name: "Urano",
        diameter: "50.724 km",
        mass: "8,681 × 10²⁵ kg",
        distance: "2.871.000.000 km",
        temperature: "-197°C (superfície)",
        orbitalPeriod: "84 anos terrestres",
        description: "Um gigante de gelo que gira de lado, com um eixo de rotação inclinado em 98 graus. Sua cor azul-esverdeada vem do metano em sua atmosfera.",
        image: "./img/uranus.png"
    },
    neptune: {
        name: "Netuno",
        diameter: "49.244 km",
        mass: "1,024 × 10²⁶ kg",
        distance: "4.495.000.000 km",
        temperature: "-201°C (superfície)",
        orbitalPeriod: "164,8 anos terrestres",
        description: "O planeta mais ventoso do sistema solar, com ventos que podem atingir 2.100 km/h. Foi o primeiro planeta encontrado por cálculo matemático.",
        image: "./img/neptune.png"
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const planetItems = document.querySelectorAll('.planet-item');
    const planets = document.querySelectorAll('.planet');
    const solarSystem = document.querySelector('.solar-system');
    const infoPanel = document.querySelector('.info-panel');
    const closeBtn = document.querySelector('.close-btn');
    const resetViewBtn = document.querySelector('#reset-view');
    const speedControl = document.querySelector('#speed');
    const speedValue = document.querySelector('#speed-value');
    
    // Variáveis de estado
    let currentZoomedPlanet = null;
    let animationSpeed = 1;
    
    // Configuração inicial
    updateOrbitSpeeds();
    
    // Event Listeners
    planetItems.forEach(item => {
        item.addEventListener('click', function() {
            const planetId = this.dataset.planet;
            zoomToPlanet(planetId);
        });
    });
    
    planets.forEach(planet => {
        planet.addEventListener('click', function() {
            const planetId = this.dataset.planet;
            zoomToPlanet(planetId);
        });
    });
    
    closeBtn.addEventListener('click', resetView);
    resetViewBtn.addEventListener('click', resetView);
    
    speedControl.addEventListener('input', function() {
        animationSpeed = parseFloat(this.value);
        speedValue.textContent = `${animationSpeed}x`;
        updateOrbitSpeeds();
    });
    
    // Funções
    function zoomToPlanet(planetId) {
        // Se já está zoomado no mesmo planeta, não faz nada
        if (currentZoomedPlanet === planetId) return;
        
        // Reseta o zoom atual
        resetZoom();
        
        // Atualiza o planeta atual
        currentZoomedPlanet = planetId;
        
        // Aplica o zoom ao planeta selecionado
        const planet = document.querySelector(`.planet[data-planet="${planetId}"]`);
        planet.classList.add('zoomed');
        
        // Aplica zoom no sistema solar
        solarSystem.classList.add('zoomed');
        
        // Mostra informações do planeta
        showPlanetInfo(planetId);
    }
    
    function resetZoom() {
        planets.forEach(planet => {
            planet.classList.remove('zoomed');
        });
        solarSystem.classList.remove('zoomed');
        currentZoomedPlanet = null;
    }
    
    function resetView() {
        resetZoom();
        hidePlanetInfo();
    }
    
    function showPlanetInfo(planetId) {
        const planet = planetData[planetId];
        
        // Atualiza o painel de informações
        document.querySelector('.planet-name').textContent = planet.name;
        document.querySelector('.diameter').textContent = planet.diameter;
        document.querySelector('.mass').textContent = planet.mass;
        document.querySelector('.distance').textContent = planet.distance;
        document.querySelector('.temperature').textContent = planet.temperature;
        document.querySelector('.orbital-period').textContent = planet.orbitalPeriod;
        document.querySelector('.description').textContent = planet.description;
        
        // Atualiza a imagem do planeta
        const planetImage = document.querySelector('.planet-image');
        planetImage.style.backgroundImage = `url('${planet.image}')`;
        
        // Mostra o painel
        infoPanel.classList.add('visible');
    }
    
    function hidePlanetInfo() {
        infoPanel.classList.remove('visible');
    }
    
    function updateOrbitSpeeds() {
        const orbits = document.querySelectorAll('.orbit');
        orbits.forEach(orbit => {
            const currentAnimation = getComputedStyle(orbit).animation;
            const newAnimation = currentAnimation.replace(/[\d.]+s/, match => {
                return (parseFloat(match) / animationSpeed) + 's';
            });
            orbit.style.animation = newAnimation;
        });
    }
    
    // Inicialização
    showPlanetInfo('sun');
    setTimeout(() => {
        infoPanel.classList.remove('visible');
    }, 3000);
});